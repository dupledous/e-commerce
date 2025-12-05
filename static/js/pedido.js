document.getElementById("btnCrearPedido").addEventListener("click", function() {
    
    const token = localStorage.getItem("token");

    if (!token) {
        document.getElementById("msg").innerText = "Primero debes iniciar sesión";
        return;
    }

    fetch("/api/pedido/crear/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.pedido_id) {
            alert("Pedido creado correctamente");
            window.location.href = "/mis-pedidos/";
        } else {
            document.getElementById("msg").innerText = data.error;
        }
    });
});
