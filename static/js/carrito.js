document.addEventListener("DOMContentLoaded", cargarCarrito);

function getToken() {
    return localStorage.getItem("access");
}

function cargarCarrito() {

    fetch("/api/carrito/", {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(res => res.json())
    .then(items => {
        let cont = document.getElementById("carrito");
        let total = 0;
        cont.innerHTML = "";

        items.forEach(item => {

            let subtotal = item.producto.precio * item.cantidad;
            total += subtotal;

            cont.innerHTML += `
                <div class="col-md-12 mb-3">
                    <div class="card p-3 shadow-sm">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="${item.producto.imagen}" class="img-fluid rounded">
                            </div>

                            <div class="col-md-4">
                                <h5>${item.producto.nombre}</h5>
                                <p>$${item.producto.precio}</p>
                            </div>

                            <div class="col-md-3">
                                <input type="number" min="1" value="${item.cantidad}" 
                                       class="form-control" 
                                       onchange="actualizarCantidad(${item.id}, this.value)">
                            </div>

                            <div class="col-md-3 text-end">
                                <button class="btn btn-danger" onclick="eliminarItem(${item.id})">
                                    Eliminar
                                </button>
                                <h5 class="mt-3">Subtotal: $${subtotal}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById("total").innerText = total;
    });
}

function actualizarCantidad(id, cantidad) {

    fetch(`/api/carrito/actualizar/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ cantidad: cantidad })
    })
    .then(res => res.json())
    .then(() => cargarCarrito());
}

function eliminarItem(id) {
    fetch(`/api/carrito/eliminar/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
    .then(() => cargarCarrito());
}
