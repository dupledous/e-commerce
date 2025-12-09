document.addEventListener("DOMContentLoaded", cargarProductosPorCategoria);

function cargarProductosPorCategoria() {
    const id = window.location.pathname.split("/")[2];

    fetch(`/api/categorias/${id}/`)
        .then(res => res.json())
        .then(cat => {
            document.getElementById("titulo-categoria").innerText =
                `Categoría: ${cat.nombre}`;
        });

    fetch(`/api/producto/categoria/${id}/`)
        .then(res => res.json())
        .then(productos => {
            const cont = document.getElementById("productos-container");
            cont.innerHTML = "";

            if (!productos.length) {
                cont.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="text-muted">No hay productos en esta categoría.</p>
                    </div>
                `;
                return;
            }

            productos.forEach(p => {
                cont.innerHTML += `
                    <div class="col-md-4 col-lg-3">
                        <div class="card h-100 shadow-sm border-0 product-card"
                             onclick="verProducto(${p.id})"
                             style="cursor:pointer; transition:0.3s;">

                            <img src="${p.imagen || '/static/img/no-image.png'}"
                                 class="card-img-top"
                                 style="height:220px; object-fit:cover;">

                            <div class="card-body">
                                <h5 class="fw-bold">${p.nombre}</h5>
                                <p class="small text-muted">${p.descripcion.substring(0, 60)}...</p>
                                <p class="fw-bold text-primary">$${p.precio}</p>
                            </div>

                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error:", err));
}

function verProducto(id) {
    window.location.href = `/producto/${id}/`;
}
