document.addEventListener("DOMContentLoaded", function () {
    const id = window.location.pathname.split("/")[2];

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

                        <button class="btn btn-success mt-3"
                                onclick="agregarAlCarrito(${p.id})">
                            Agregar al Carrito
                        </button>
                    </div>

                </div>
            `;
        })
        .catch(err => {
            document.getElementById("producto-detalle").innerHTML =
                "<p class='text-danger'>Error al cargar producto.</p>";
        });
});


// 🚀 FUNCION CORRECTA PARA AGREGAR AL CARRITO
function agregarAlCarrito(idProducto) {

    const token = localStorage.getItem("access");

    if (!token) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "/login/";
        return;
    }

    fetch("/api/carrito/agregar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            producto_id: idProducto,
            cantidad: 1
        })
    })
    .then(async res => {
        let data = await res.json();

        if (!res.ok) {
            alert("ERROR: " + (data.detail || data.error || "No autorizado"));
            return;
        }

        alert("Producto agregado al carrito");
    })
    .catch(err => console.error("Error:", err));
}
