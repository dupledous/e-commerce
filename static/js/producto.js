document.addEventListener("DOMContentLoaded", function() {

    // Obtener ID desde la URL
    let id = window.location.pathname.split("/")[2];

    fetch(`/api/producto/${id}/`)
        .then(res => res.json())
        .then(p => {

            document.getElementById("producto-detalle").innerHTML = `
                <div class="row">

                    <div class="col-md-6">
                        <img src="${p.imagen}" class="img-fluid rounded shadow">
                    </div>

                    <div class="col-md-6">
                        <h2>${p.nombre}</h2>
                        <p>${p.descripcion}</p>

                        <h4 class="text-primary">$${p.precio}</h4>
                        <p><strong>Stock:</strong> ${p.stock}</p>

                        <button onclick="agregarCarrito(${p.id})"
                                class="btn btn-success mt-3">
                            Agregar al Carrito
                        </button>
                    </div>

                </div>
            `;
        });
});

// Función para agregar al carrito
function agregarCarrito(id_producto) {
    fetch("/api/carrito/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            producto: id_producto,
            cantidad: 1
        })
    })
    .then(() => alert("Producto agregado al carrito"));
}

