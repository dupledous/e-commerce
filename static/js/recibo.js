document.addEventListener("DOMContentLoaded", () => {
    const id = window.location.pathname.split("/")[2];
    const token = localStorage.getItem("access");

    fetch(`/api/pedido/${id}/`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(p => {
        let html = `<p><strong>Dirección:</strong> ${p.direccion}</p>
        <table class="table">
        <thead><tr><th>Producto</th><th>Precio</th><th>Cant.</th></tr></thead><tbody>`;

        p.items.forEach(i => {
            html += `<tr>
                <td>${i.producto_nombre}</td>
                <td>$${i.precio}</td>
                <td>${i.cantidad}</td>
            </tr>`;
        });

        html += `</tbody></table>
        <p>Subtotal: $${p.subtotal}</p>
        <p>IVA (19%): $${p.iva}</p>
        <h4>Total: $${p.total}</h4>`;

        document.getElementById("recibo").innerHTML = html;
    });
});
