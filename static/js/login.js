document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/usuario/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("LOGIN:", data);

        if (!response.ok) {
            document.getElementById("msg").innerText = data.error || "Credenciales incorrectas";
            return;
        }

        // 🟢 VERIFICAR QUE EXISTA ACCESS
        if (!data.access) {
            document.getElementById("msg").innerText = "El servidor no envió token de acceso";
            return;
        }

        // 🟢 GUARDAR TOKENS CORRECTAMENTE
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);

        console.log("TOKEN GUARDADO:", localStorage.getItem("access"));

        alert("Inicio de sesión exitoso");
        window.location.href = "/";

    } catch (error) {
        console.error("ERROR LOGIN:", error);
        document.getElementById("msg").innerText = "Error conectando al servidor";
    }
});
