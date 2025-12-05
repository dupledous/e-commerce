document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        email:    document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch("/api/usuario/registrar/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resp => {
        if (resp.id) {
            alert("Registrado correctamente");
            window.location.href = "/login/";
        } else {
            document.getElementById("msg").innerText = "Error al registrar";
        }
    });
});
