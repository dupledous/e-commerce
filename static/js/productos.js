document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("productos-container");

    fetch("/api/producto/")
        .then(res => res.json())
        .then(productos => {

            contenedor.innerHTML = "";  // limpiar

            productos.forEach(p => {
                contenedor.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">

                            <img src="${p.imagen ? p.imagen : '/static/img/no-image.png'}"
                                 class="card-img-top" alt="${p.nombre}">

                            <div class="card-body">
                                <h5>${p.nombre}</h5>
                                <p>${p.descripcion.substring(0, 80)}...</p>
                                <p class="fw-bold text-primary">$${p.precio}</p>
                            </div>

                            <div class="card-footer text-center">
                                <a href="/producto/${p.id}/" class="btn btn-primary">
                                    Ver Detalles
                                </a>
                            </div>

                        </div>
                    </div>
                `;
            });
        })
        .catch(err => {
            contenedor.innerHTML = `<p class="text-danger">Error cargando productos</p>`;
        });
});
