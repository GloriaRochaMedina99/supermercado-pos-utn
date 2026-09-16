let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar clics en botones para agregar al carrito
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-agregar')) {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));

            agregarProducto(id, nombre, precio);
        }
    });

    // Delegación de eventos dentro del modal (incrementar, decrementar, eliminar)
    const listaCarrito = document.getElementById('lista-carrito');
    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            if (e.target.classList.contains('btn-incrementar')) {
                modificarCantidad(id, 1);
            } else if (e.target.classList.contains('btn-decrementar')) {
                modificarCantidad(id, -1);
            } else if (e.target.classList.contains('btn-eliminar')) {
                eliminarProducto(id);
            }
        });
    }
});

function agregarProducto(id, nombre, precio) {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarCarritoUI();
}

function modificarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
            return;
        }
    }
    actualizarCarritoUI();
}

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const listaHtml = document.getElementById('lista-carrito');
    const totalHtml = document.getElementById('total-carrito');
    const contadorHtml = document.getElementById('carrito-cantidad');

    if (!listaHtml || !totalHtml || !contadorHtml) return;

    listaHtml.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        listaHtml.innerHTML = '<li class="list-group-item text-center text-muted py-4">El carrito está vacío. ¡Aprovechá las ofertas!</li>';
    } else {
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            totalItems += item.cantidad;

            listaHtml.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                        <h6 class="my-0 fw-bold">${item.nombre}</h6>
                        <small class="text-muted">$${item.precio.toLocaleString()} c/u</small>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary btn-decrementar" data-id="${item.id}">-</button>
                        <span class="fw-bold px-2">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary btn-incrementar" data-id="${item.id}">+</button>
                        <span class="fw-bold ms-3 text-end" style="min-width: 80px;">$${subtotal.toLocaleString()}</span>
                        <button class="btn btn-sm btn-outline-danger ms-2 btn-eliminar" data-id="${item.id}">🗑️</button>
                    </div>
                </li>
            `;
        });
    }

    totalHtml.textContent = `$${total.toLocaleString()}`;
    contadorHtml.textContent = totalItems;
}