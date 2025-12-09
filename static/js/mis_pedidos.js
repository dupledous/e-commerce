document.addEventListener("DOMContentLoaded", cargarMisPedidos);

// =======================
// FUNCION PARA REFRESCAR TOKEN
// =======================
async function refreshToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) return null;

    const res = await fetch("/api/usuario/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
    });

    const data = await res.json();

    if (data.access) {
        localStorage.setItem("access", data.access);
        return data.access;
    }

    return null;
}

// =======================
// CARGAR PEDIDOS
// =======================
async function cargarMisPedidos() {
    const cont = document.getElementById("lista-pedidos");
    if (!cont) {
        console.error("ERROR: No existe el div con id lista-pedidos");
        return;
    }

    let token = localStorage.getItem("access");

    if (!token) {
        cont.innerHTML = "<p class='text-danger'>Debes iniciar sesión.</p>";
        return;
    }

    let res = await fetch("/api/pedido/mis-pedidos/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    // --------------------------
    // TOKEN EXPIRADO → INTENTAR REFRESH
    // --------------------------
    if (res.status === 401) {
        console.warn("Token expirado o inválido, refrescando token...");

        const nuevoToken = await refreshToken();

        if (!nuevoToken) {
            alert("Tu sesión ha expirado. Inicia sesión.");
            localStorage.clear();
            window.location.href = "/login/";
            return;
        }

        // Reintento con el nuevo token
        res = await fetch("/api/pedido/mis-pedidos/", {
            headers: { "Authorization": "Bearer " + nuevoToken }
        });
    }

    const data = await res.json();
    console.log("PEDIDOS:", data);

    mostrarPedidos(data);
}

// =======================
// MOSTRAR PEDIDOS
// =======================
function mostrarPedidos(lista) {
    const cont = document.getElementById("lista-pedidos");

    cont.innerHTML = "";

    if (!lista || lista.length === 0) {
        cont.innerHTML = "<p class='text-muted'>No tienes pedidos aún.</p>";
        return;
    }

    lista.forEach(pedido => {
        cont.innerHTML += `
            <div class="card p-3 mb-3 shadow-sm">
                <h4 class="fw-bold">Pedido #${pedido.id}</h4>
                <p>Total: $${pedido.total}</p>
                <p>Fecha: ${pedido.fecha}</p>
            </div>
        `;
    });
}
