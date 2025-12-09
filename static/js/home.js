document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("destacados-home");
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="col-12 text-center my-4">
            <div class="spinner-border text-primary"></div>
            <p>Cargando productos...</p>
        </div>
    `;

    fetch("/api/producto/")
        .then(r => r.json())
        .then(productos => {
            contenedor.innerHTML = "";

            // Tomamos solo 4 productos para la portada
            productos.slice(0, 4).forEach(p => {
                contenedor.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 product-card shadow-sm position-relative">
                            <span class="badge bg-danger badge-discount">-10%</span>

                            <img src="${p.imagen || '/static/img/no-image.png'}"
                                 class="card-img-top" alt="${p.nombre}">

                            <div class="card-body">
                                <p class="text-muted small mb-1">
                                    ${p.categoria_nombre || 'Producto'}
                                </p>
                                <h5 class="fw-bold">${p.nombre}</h5>
                                <p class="text-primary fw-bold mb-0">$${p.precio}</p>
                            </div>

                            <div class="card-footer bg-white border-0 text-center">
                                <a href="/producto/${p.id}/"
                                   class="btn btn-outline-primary w-100">
                                   Ver detalle
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error(err);
            contenedor.innerHTML = `
                <div class="col-12 text-center text-danger">
                    Error al cargar productos destacados.
                </div>
            `;
        });
});
