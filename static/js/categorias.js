document.addEventListener("DOMContentLoaded", cargarCategorias);

function cargarCategorias() {
    fetch("/api/categorias/")
        .then(res => res.json())
        .then(categorias => {

            const cont = document.getElementById("categorias-container");
            cont.innerHTML = "";

            if (!categorias.length) {
                cont.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="text-muted">No hay categorías disponibles.</p>
                    </div>
                `;
                return;
            }

            categorias.forEach(cat => {
                cont.innerHTML += `
                    <div class="col-md-4 col-lg-3">
                        <div class="card shadow-sm border-0 category-card"
                             onclick="verProductos(${cat.id})"
                             style="cursor:pointer; transition:0.3s;">

                            <div class="card-body text-center py-4">

                                <div class="rounded-circle bg-light shadow-sm mx-auto mb-3"
                                     style="width:85px; height:85px; display:flex; align-items:center; justify-content:center;">
                                    <img src="${cat.icono || '/static/img/no-category.png'}"
                                         style="width:45px;">
                                </div>

                                <h5 class="fw-bold">${cat.nombre}</h5>
                                <p class="text-muted small">${cat.descripcion || ''}</p>

                            </div>

                        </div>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Error cargando categorías:", err);
            cont.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-danger">Error al cargar categorías</p>
                </div>
            `;
        });
}

function verProductos(id) {
    window.location.href = `/productos_por_categoria/${id}/`;
}
