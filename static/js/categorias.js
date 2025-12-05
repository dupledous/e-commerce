document.addEventListener("DOMContentLoaded", () => {

    fetch("/api/categorias/")
        .then(res => res.json())
        .then(data => {

            let cont = document.getElementById("categorias");
            cont.innerHTML = "";

            data.forEach(cat => {
                cont.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${cat.nombre}</h5>
                                <p class="card-text">${cat.descripcion}</p>
                                <a href="/categoria/${cat.id}/" class="btn btn-primary">Ver productos</a>
                            </div>
                        </div>
                    </div>
                `;
            });

        });
});
