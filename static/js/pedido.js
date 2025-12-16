function crearPedido() {
    const token = localStorage.getItem("access");
    const direccion = document.getElementById("direccion").value;

    if (!direccion) {
        alert("Debes ingresar dirección");
        return;
    }

    fetch("/api/pedido/crear/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ direccion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById("msg").innerText = data.error;
        } else {
            window.location.href = `/recibo/${data.pedido_id}/`;
        }
    });
}
