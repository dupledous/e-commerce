document.addEventListener("DOMContentLoaded", cargarCarrito);

function getToken() {
    return localStorage.getItem("access");
}

function mostrarMensaje(texto, tipo = "warning") {
    const msg = document.getElementById("mensaje");
    msg.className = `alert alert-${tipo}`;
    msg.textContent = texto;
    msg.classList.remove("d-none");
}

function ocultarMensaje() {
    const msg = document.getElementById("mensaje");
    msg.classList.add("d-none");
}

function cargarCarrito() {
    const token = getToken();

    if (!token) {
        mostrarMensaje("Debes iniciar sesión para ver tu carrito.");
        return;
    }

    fetch("/api/carrito/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        if (res.status === 401) {
            mostrarMensaje("Tu sesión expiró. Inicia sesión nuevamente.");
            localStorage.clear();
            return [];
        }
        return res.json();
    })
    .then(items => {
        ocultarMensaje();

        let cont = document.getElementById("carrito");
        let total = 0;

        cont.innerHTML = "";

        if (!items || items.length === 0) {
            cont.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">Tu carrito está vacío.</p>
                </div>`;
            document.getElementById("total").innerText = "$0";
            return;
        }

        items.forEach(item => {
            const p = item.producto;
            const precio = parseFloat(p.precio);
            const cantidad = parseInt(item.cantidad);
            const subtotal = precio * cantidad;
            total += subtotal;

            cont.innerHTML += `
                <div class="col-md-10">
                    <div class="card shadow-sm p-3 mb-3">
                        <div class="row align-items-center">

                            <!-- Imagen -->
                            <div class="col-md-2 text-center">
                                <img src="${p.imagen}" class="img-fluid rounded"
                                style="height:100px; object-fit:cover;">
                            </div>

                            <!-- Info -->
                            <div class="col-md-4">
                                <h5 class="fw-bold">${p.nombre}</h5>
                                <p class="text-muted">$${precio}</p>
                            </div>

                            <!-- Cantidad -->
                            <div class="col-md-3">
                                <input 
                                    type="number"
                                    min="1"
                                    value="${cantidad}"
                                    class="form-control"
                                    onchange="actualizarCantidad(${item.id}, this.value)">
                            </div>

                            <!-- Subtotal + botón -->
                            <div class="col-md-3 text-end">
                                <button class="btn btn-danger btn-sm mb-2"
                                        onclick="eliminarItem(${item.id})">
                                    Eliminar
                                </button>
                                <h5 class="fw-bold mt-2">
                                    Subtotal: $${subtotal.toFixed(0)}
                                </h5>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById("total").innerText = "$" + total.toFixed(0);
    })
    .catch(err => console.error("Error al cargar carrito:", err));
}


function actualizarCantidad(id, cantidad) {
    const token = getToken();

    fetch(`/api/carrito/actualizar/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ cantidad })
    })
    .then(() => cargarCarrito());
}

function eliminarItem(id) {
    const token = getToken();

    fetch(`/api/carrito/eliminar/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    })
    .then(() => cargarCarrito());
}

function crearPedido() {
    const token = localStorage.getItem("access");

    if (!token) {
        mostrarMensaje("Debes iniciar sesión para crear un pedido.", "danger");
        return;
    }

    fetch("/api/pedido/crear/", {
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
            // 🔥 REDIRIGE A PAGAR
            window.location.href = "/pagar/" + data.pedido_id + "/";
        }
    })
    .catch(err => console.error("Error al crear pedido:", err));
}
