function crearPedido() {
    const token = localStorage.getItem("access");

    if (!token) {
        mostrarMensaje("Debes iniciar sesión para crear un pedido.", "danger");
        return;
    }

    fetch("/api/pedido/crear/", {   //  ←  🔥 IMPORTANTE: slash final
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            mostrarMensaje(data.error, "danger");
        } else {
            alert("Pedido creado correctamente (ID: " + data.pedido_id + ")");
            window.location.href = "/procesar/";
        }
    })
    .catch(err => console.error("Error al crear pedido:", err));
}
