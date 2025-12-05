document.addEventListener("DOMContentLoaded", function () {

    let pedidoId = window.location.pathname.split("/")[2];  
    const token = localStorage.getItem("token");

    // Obtener datos del pedido
    fetch(`/api/pedido/mis-pedidos/`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(pedidos => {
        let pedido = pedidos.find(p => p.id == pedidoId);
        if (!pedido) {
            document.getElementById("pedido-info").innerHTML = `
                <p class="text-danger">Pedido no encontrado.</p>
            `;
            return;
        }

        document.getElementById("pedido-info").innerHTML = `
            <strong>Pedido #${pedido.id}</strong><br>
            Total a pagar: <span class="fw-bold">$${pedido.total}</span><br>
            Fecha: ${pedido.fecha}
        `;
    });

    // Botón pagar
    document.getElementById("btnPagar").addEventListener("click", function() {

        const metodo = document.getElementById("metodo").value;

        fetch("/api/pago/procesar/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                pedido: pedidoId,
                metodo_pago: metodo
            })
        })
        .then(res => res.json())
        .then(data => {

            if (data.pago_id) {
                alert("Pago realizado con éxito");
                window.location.href = "/mis-pedidos/";
            } else {
                document.getElementById("msg").innerText = data.error;
            }

        });
    });
});
