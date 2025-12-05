document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/api/usuario/login/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", username);

            window.location.href = "/";
        } else {
            document.getElementById("msg").innerText = data.error;
        }
    });
});
