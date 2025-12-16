const token = localStorage.getItem("access");

if (!token || localStorage.getItem("role") !== "admin") {
    alert("Acceso denegado");
    window.location.href = "/";
}

function mostrarFormulario() {
    document.getElementById("form-producto").classList.toggle("d-none");
}

function cargarProductos() {
    fetch("/api/producto/")
        .then(res => res.json())
        .then(data => {
            const cont = document.getElementById("lista-productos");
            cont.innerHTML = "";

            data.forEach(p => {
                cont.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card p-3">
                            <h5>${p.nombre}</h5>
                            <p>$${p.precio} | Stock: ${p.stock}</p>
                            <button class="btn btn-danger btn-sm"
                                onclick="eliminarProducto(${p.id})">
                                Eliminar
                            </button>
                        </div>
                    </div>
                `;
            });
        });
}

function crearProducto() {
    const token = localStorage.getItem("access");

    const formData = new FormData();
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("precio", document.getElementById("precio").value);
    formData.append("stock", document.getElementById("stock").value);
    formData.append("descripcion", document.getElementById("descripcion").value);

    const imagenInput = document.getElementById("imagen");
    if (imagenInput.files.length > 0) {
        formData.append("imagen", imagenInput.files[0]);
    }
    fetch("/api/producto/crear/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
      // IMPORTANTE: NO poner Content-Type aquí, el navegador lo pone solo con boundary
    },
    body: formData
})
.then(async res => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        alert("ERROR: " + (data.detail || JSON.stringify(data)));
        return;
    }
    alert("Producto creado con imagen");
    cargarProductos();
    document.getElementById("form-producto").classList.add("d-none");
})
.catch(err => console.error(err));
}


function eliminarProducto(id) {
    fetch(`/api/producto/eliminar/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(() => cargarProductos());
}

document.addEventListener("DOMContentLoaded", cargarProductos);
