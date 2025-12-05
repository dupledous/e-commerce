function agregarAlCarrito(idProducto, cantidad = 1) {

    fetch("/api/carrito/agregar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({
            producto_id: idProducto,
            cantidad: cantidad
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Producto agregado al carrito");
    });
}
