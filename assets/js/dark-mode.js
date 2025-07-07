document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Função para aplicar o tema
    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    // Verificar preferência do usuário no localStorage ou sistema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    // Alternar tema ao clicar no botão
    darkModeToggle.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    });
});


