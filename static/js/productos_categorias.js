document.addEventListener("DOMContentLoaded", () => {

    // obtener ID de URL → /categoria/3/
    const categoriaId = window.location.pathname.split("/")[2];

    fetch(`/api/categorias/${categoriaId}/`)
        .then(res => res.json())
        .then(cat => {
            document.getElementById("tituloCategoria").innerText =
                "Productos en: " + cat.nombre;
        });

    fetch(`/api/categorias/${categoriaId}/productos/`)
        .then(res => res.json())
        .then(productos => {

            let cont = document.getElementById("productos");
            cont.innerHTML = "";

            productos.forEach(p => {
                cont.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card shadow">
                            <img src="${p.imagen}" class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">${p.nombre}</h5>
                                <p class="card-text">$${p.precio}</p>
                                <a href="/producto/${p.id}/" class="btn btn-primary">Ver</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
});
