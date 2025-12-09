document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("access");
    const pedidoId = window.location.pathname.split("/")[2];

    fetch(`/api/pedido/detalle/${pedidoId}/`, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("detalle-pago").innerHTML = `
            <p><strong>Total a pagar:</strong> $${data.total}</p>
            <p><strong>Fecha:</strong> ${data.fecha}</p>
        `;
    })
    .catch(err => console.error(err));

    // 👉 BOTON Pagar
    document.getElementById("btnPagar").addEventListener("click", function () {
        alert("Pago realizado correctamente");
        window.location.href = "/mis_pedidos/";
    });
});
