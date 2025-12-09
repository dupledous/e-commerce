document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("productos-container");
    const buscador = document.getElementById("buscador");
    const contCategorias = document.querySelector(".mb-3"); // donde están los pills

    let productosGlobal = [];

    // Spinner inicial
    contenedor.innerHTML = `
        <div class="col-12 text-center my-5">
            <div class="spinner-border text-primary"></div>
            <p>Cargando productos...</p>
        </div>
    `;

    fetch("/api/producto/")
        .then(r => r.json())
        .then(productos => {
            productosGlobal = productos;
            pintarProductos(productos);
            construirCategorias(productos);
        })
        .catch(err => {
            console.error("ERROR AL CARGAR PRODUCTOS:", err);
            contenedor.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-danger">Error al cargar productos.</p>
                </div>
            `;
        });

    function construirCategorias(productos) {
        // Deja siempre el botón "Todos" que ya existe
        const categorias = new Set();
        productos.forEach(p => {
            if (p.categoria_nombre) categorias.add(p.categoria_nombre);
        });

        categorias.forEach(nombre => {
            const btn = document.createElement("button");
            btn.className = "category-pill";
            btn.dataset.cat = nombre;
            btn.textContent = nombre;
            contCategorias.appendChild(btn);
        });

        // Eventos de filtro por categoría
        contCategorias.addEventListener("click", e => {
            if (!e.target.matches(".category-pill")) return;

            document
                .querySelectorAll(".category-pill")
                .forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            aplicarFiltros();
        });

        // Búsqueda en vivo
        buscador.addEventListener("input", aplicarFiltros);
    }

    function aplicarFiltros() {
        const texto = buscador.value.toLowerCase();
        const catActiva = document.querySelector(".category-pill.active").dataset.cat;

        const filtrados = productosGlobal.filter(p => {
            const coincideTexto =
                p.nombre.toLowerCase().includes(texto) ||
                (p.descripcion || "").toLowerCase().includes(texto);

            const coincideCat =
                catActiva === "todos" ||
                p.categoria_nombre === catActiva;

            return coincideTexto && coincideCat;
        });

        pintarProductos(filtrados);
    }

    function pintarProductos(lista) {
        contenedor.innerHTML = "";

        if (!lista.length) {
            contenedor.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No se encontraron productos.</p>
                </div>
            `;
            return;
        }

        lista.forEach(p => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 product-card shadow-sm position-relative">

                        <img src="${p.imagen || '/static/img/no-image.png'}"
                        class="card-img-top" alt="${p.nombre}">

                        <div class="card-body">
                            <p class="small text-muted mb-1">
                                ${p.categoria_nombre || 'Producto'}
                            </p>
                            <h5 class="fw-bold">${p.nombre}</h5>
                            <p class="mb-2">
                                ${(p.descripcion || '').substring(0, 80)}...
                            </p>
                            <p class="fw-bold text-primary mb-0">$${p.precio}</p>
                        </div>

                        <div class="card-footer bg-white border-0 text-center">
                            <a href="/producto/${p.id}/"
                            class="btn btn-primary w-100">
                                Ver Detalles
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
});
