
const SUPABASE_URL = "https://vnbgybpomzvhdsaqvzkm.supabase.co";
const SUPABASE_KEY = "COLE_SUA_CHAVE_PUBLICA";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Elementos das telas
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const homeView = document.getElementById("homeView");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

// Mostrar uma tela por vez
function showView(view) {
    loginView.classList.add("hidden");
    registerView.classList.add("hidden");
    homeView.classList.add("hidden");

    view.classList.remove("hidden");
}

// Exibir mensagens
function setMessage(element, message, type = "error") {
    element.textContent = message;
    element.className = `message ${type}`;
}

// Alternar entre login e cadastro
document.getElementById("showRegister").addEventListener("click", (event) => {
    event.preventDefault();
    loginMessage.textContent = "";
    registerMessage.textContent = "";
    showView(registerView);
});

document.getElementById("showLogin").addEventListener("click", (event) => {
    event.preventDefault();
    loginMessage.textContent = "";
    registerMessage.textContent = "";
    showView(loginView);
});

// Carregar os dados do usuário e abrir a página inicial
async function openHome(user) {
    if (!user) {
        showView(loginView);
        return;
    }

    const { data: profile, error } = await supabaseClient
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Erro ao buscar perfil:", error.message);
        alert("Não foi possível carregar seu perfil. Tente novamente.");
        return;
    }

    const metadataName = user.user_metadata?.full_name;
    const name = profile?.full_name || metadataName || "Usuário";

    document.getElementById("userName").textContent = name;
    showView(homeView);
}

// CADASTRO
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!name) {
        setMessage(registerMessage, "Informe seu nome.");
        return;
    }

    const button = registerForm.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Criando conta...";

    setMessage(registerMessage, "");

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) throw error;

        if (data.session) {
            registerForm.reset();
            await openHome(data.user);
        } else {
            setMessage(
                registerMessage,
                "Cadastro realizado! Confira seu e-mail para confirmar a conta e depois faça login.",
                "success"
            );
        }
    } catch (error) {
        setMessage(registerMessage, error.message);
    } finally {
        button.disabled = false;
        button.textContent = "Criar minha conta";
    }
});

// LOGIN
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const button = loginForm.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Entrando...";

    setMessage(loginMessage, "");

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        loginForm.reset();
        await openHome(data.user);
    } catch (error) {
        setMessage(
            loginMessage,
            "Não foi possível entrar. Confira seu e-mail e sua senha."
        );
        console.error("Erro no login:", error.message);
    } finally {
        button.disabled = false;
        button.textContent = "Entrar na conta";
    }
});

// LOGOUT
document.getElementById("logoutButton").addEventListener("click", async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Não foi possível sair da conta. Tente novamente.");
        return;
    }

    loginForm.reset();
    registerForm.reset();
    loginMessage.textContent = "";
    registerMessage.textContent = "";

    showView(loginView);
});

// Verificar se já existe uma sessão ao abrir a página
async function initializeApp() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Erro ao verificar sessão:", error.message);
        showView(loginView);
        return;
    }

    if (data.session) {
        await openHome(data.session.user);
    } else {
        showView(loginView);
    }
}

initializeApp();

// Reagir a mudanças de autenticação
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
        showView(loginView);
    }
});