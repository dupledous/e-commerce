function navbar() {
    const token = localStorage.getItem("token");

    document.getElementById("navbar").innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

            <a class="navbar-brand" href="productos.html">Mi Tienda</a>

            <div>
                <a href="productos.html" class="btn btn-outline-light">Productos</a>
                <a href="carrito.html" class="btn btn-outline-light">Carrito</a>
                <a href="pedidos.html" class="btn btn-outline-light">Pedidos</a>
                ${
                    token
                    ? `<button onclick="logout()" class="btn btn-danger">Cerrar Sesión</button>`
                    : `<a href="login.html" class="btn btn-warning">Login</a>`
                }
            </div>
        </div>
    </nav>`;
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

navbar();
