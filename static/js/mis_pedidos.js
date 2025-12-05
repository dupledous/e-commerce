document.addEventListener("DOMContentLoaded", function () {
    
    const token = localStorage.getItem("token");

    fetch("/api/pedido/mis-pedidos/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(pedidos => {
        let tabla = document.getElementById("tablaPedidos");
        tabla.innerHTML = "";

        pedidos.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>$${p.total}</td>
                    <td>${p.fecha}</td>
                </tr>
            `;
        });

        if (pedidos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="3" class="text-center">No tienes pedidos aún</td></tr>`;
        }

    });
});
