/* ============================================================
   SUPERMERCADO MICUMAN - script.js
   TP4 - Programación IV (UTN-FRT)
   Funcionalidades: Búsqueda, Catálogo por categorías dinámico,
   Carrito de compras (CRUD) y Ofertas/Promociones.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     1. BASE DE DATOS DE PRODUCTOS POR CATEGORÍA
     ------------------------------------------------------------
     Objeto con productos "hipotéticos" para cada categoría.
     La imagen es un placeholder: la compañera encargada del
     diseño puede reemplazar la ruta por la imagen real sin tocar
     el resto del código, ya que solo se usa la propiedad "imagen".
     ============================================================ */
  const catalogoPorCategoria = {
    almacen: [
      { id: "alm-01", nombre: "Arroz Largo Fino 1 kg", precio: 1500, imagen: "img/placeholder-producto.jpg" },
      { id: "alm-02", nombre: "Fideos Tallarín 500 g", precio: 900, imagen: "img/placeholder-producto.jpg" },
      { id: "alm-03", nombre: "Aceite de Girasol 1.5 L", precio: 2200, imagen: "img/placeholder-producto.jpg" },
      { id: "alm-04", nombre: "Puré de Tomate 520 g", precio: 750, imagen: "img/placeholder-producto.jpg" },
      { id: "alm-05", nombre: "Azúcar 1 kg", precio: 850, imagen: "img/placeholder-producto.jpg" },
      { id: "alm-06", nombre: "Yerba Mate 1 kg", precio: 3200, imagen: "img/placeholder-producto.jpg" },
    ],
    lacteos: [
      { id: "lac-01", nombre: "Leche Entera 1 L", precio: 1190, imagen: "img/placeholder-producto.jpg" },
      { id: "lac-02", nombre: "Yogur Bebible 1 L", precio: 1350, imagen: "img/placeholder-producto.jpg" },
      { id: "lac-03", nombre: "Queso Cremoso 300 g", precio: 2800, imagen: "img/placeholder-producto.jpg" },
      { id: "lac-04", nombre: "Manteca 200 g", precio: 1600, imagen: "img/placeholder-producto.jpg" },
      { id: "lac-05", nombre: "Dulce de Leche 400 g", precio: 1450, imagen: "img/placeholder-producto.jpg" },
      { id: "lac-06", nombre: "Huevos x 12", precio: 2600, imagen: "img/placeholder-producto.jpg" },
    ],
    frutas: [
      { id: "fru-01", nombre: "Manzana Roja 1 kg", precio: 1800, imagen: "img/placeholder-producto.jpg" },
      { id: "fru-02", nombre: "Banana 1 kg", precio: 1200, imagen: "img/placeholder-producto.jpg" },
      { id: "fru-03", nombre: "Tomate 1 kg", precio: 1600, imagen: "img/placeholder-producto.jpg" },
      { id: "fru-04", nombre: "Lechuga Unidad", precio: 700, imagen: "img/placeholder-producto.jpg" },
      { id: "fru-05", nombre: "Papa 1 kg", precio: 900, imagen: "img/placeholder-producto.jpg" },
      { id: "fru-06", nombre: "Naranja 1 kg", precio: 1100, imagen: "img/placeholder-producto.jpg" },
    ],
    bebidas: [
      { id: "beb-01", nombre: "Gaseosa Cola 2.25 L", precio: 2000, imagen: "img/placeholder-producto.jpg" },
      { id: "beb-02", nombre: "Agua Mineral 2 L", precio: 800, imagen: "img/placeholder-producto.jpg" },
      { id: "beb-03", nombre: "Jugo de Naranja 1 L", precio: 1300, imagen: "img/placeholder-producto.jpg" },
      { id: "beb-04", nombre: "Cerveza Rubia 1 L", precio: 1700, imagen: "img/placeholder-producto.jpg" },
      { id: "beb-05", nombre: "Agua Saborizada 1.5 L", precio: 1100, imagen: "img/placeholder-producto.jpg" },
      { id: "beb-06", nombre: "Soda 2 L", precio: 950, imagen: "img/placeholder-producto.jpg" },
    ],
  };

  // Traduce el texto visible de la categoría (h3 de cada tarjeta) a la clave del objeto anterior
  const mapaNombreCategoria = {
    "Almacén": "almacen",
    "Lácteos": "lacteos",
    "Frutas y Verduras": "frutas",
    "Bebidas": "bebidas",
  };

  /* ============================================================
     2. ESTADO DEL CARRITO
     ------------------------------------------------------------
     Se guarda en localStorage para que no se pierda si el usuario
     recarga la página (persistencia simple del lado del cliente).
     Cada item: { id, nombre, precio, cantidad, promo }
     "promo" puede ser null o "2x1".
     ============================================================ */
  const CLAVE_STORAGE = "carritoMicuman";
  let carrito = cargarCarritoDesdeStorage();

  function cargarCarritoDesdeStorage() {
    try {
      const datos = localStorage.getItem(CLAVE_STORAGE);
      return datos ? JSON.parse(datos) : [];
    } catch (error) {
      console.error("No se pudo leer el carrito guardado:", error);
      return [];
    }
  }

  function guardarCarritoEnStorage() {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
    } catch (error) {
      console.error("No se pudo guardar el carrito:", error);
    }
  }

  /* ============================================================
     3. UTILIDADES
     ============================================================ */

  // Da formato de moneda argentina a un número: 1500 -> "$1.500"
  function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-AR");
  }

  // Convierte un texto de precio del HTML ("$1.500") a número (1500)
  function textoAPrecio(texto) {
    return parseInt(texto.replace(/[^\d]/g, ""), 10) || 0;
  }

  // Quita tildes y pasa a minúsculas, para comparar texto sin importar acentos/mayúsculas
  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* ============================================================
     3.5 PLACEHOLDERS ELEGANTES DE IMAGEN
     ------------------------------------------------------------
     Mientras la compañera de diseño no cargue las fotos reales,
     cualquier <img> que no pueda cargarse se reemplaza por un
     contenedor prolijo con un ícono vectorial (ver .img-placeholder
     en style.css), en vez de mostrarse "roto" o vacío. El día que
     se agreguen imágenes reales con las mismas rutas, se muestran
     automáticamente sin tocar el código.
     ============================================================ */
  const ICONO_PRODUCTO_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7h18l-1.4 12.1a2 2 0 0 1-2 1.9H6.4a2 2 0 0 1-2-1.9L3 7Z"></path>
      <path d="M8 7V5.5a4 4 0 0 1 8 0V7"></path>
    </svg>`;

  // Reemplaza una <img> por el contenedor de placeholder, conservando sus clases
  // (así las reglas de tamaño de style.css, como .categoria-img o .producto-img, se mantienen)
  function convertirEnPlaceholder(img) {
    const placeholder = document.createElement("div");
    placeholder.className = img.className + " img-placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", img.alt || "Producto sin imagen disponible");
    placeholder.innerHTML = ICONO_PRODUCTO_SVG;
    img.replaceWith(placeholder);
  }

  // Escucha el error de carga de una imagen puntual y la reemplaza por el placeholder
  function activarPlaceholderSiFalla(img) {
    // Si la imagen ya intentó cargar y falló antes de llegar acá, se reemplaza al instante
    if (img.complete && img.naturalWidth === 0) {
      convertirEnPlaceholder(img);
      return;
    }
    img.addEventListener("error", () => convertirEnPlaceholder(img), { once: true });
  }

  // Aplica el placeholder a todas las imágenes de categorías y de productos destacados
  function inicializarPlaceholdersDeImagen() {
    document.querySelectorAll(".categoria-img, #productos .producto-img").forEach(activarPlaceholderSiFalla);
  }

  /* ============================================================
     4. CARRITO - OFFCANVAS (interfaz visual)
     ------------------------------------------------------------
     Se inyecta una sola vez en el DOM al cargar la página.
     Se usa el componente Offcanvas de Bootstrap 5 (ya incluido
     en el proyecto) para mostrar el listado del carrito.

     Se configura con { backdrop: false, scroll: true } para que
     NO aparezca el fondo oscuro que bloquea la pantalla: así la
     usuaria puede seguir haciendo clic y scrolleando el catálogo
     mientras el panel del carrito permanece abierto y se va
     actualizando en tiempo real.
     ============================================================ */
  let instanciaOffcanvasCarrito = null; // referencia única a la instancia de Bootstrap

  function crearOffcanvasCarrito() {
    const html = `
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCarrito" aria-labelledby="offcanvasCarritoLabel">
        <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title" id="offcanvasCarritoLabel">🛒 Tu carrito</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <div id="carrito-lista" class="flex-grow-1"></div>
          <div id="carrito-vacio" class="text-center text-muted py-4 d-none">
            Tu carrito está vacío.
          </div>
          <div class="border-top pt-3 mt-3">
            <div class="d-flex justify-content-between">
              <span>Subtotal</span>
              <span id="carrito-subtotal">$0</span>
            </div>
            <p id="carrito-envio-msg" class="small text-success mb-2"></p>
            <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span id="carrito-total">$0</span>
            </div>
            <button id="btn-vaciar-carrito" class="btn btn-outline-danger w-100">Vaciar carrito</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);

    // Se crea la instancia UNA sola vez, ya con backdrop desactivado y scroll permitido.
    // Si se creara de nuevo en cada apertura (getOrCreateInstance sin config), Bootstrap
    // ignoraría estas opciones porque ya existiría una instancia previa.
    instanciaOffcanvasCarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"), {
      backdrop: false,
      scroll: true,
    });

    // Delegación de eventos: sumar / restar / eliminar un ítem del carrito
    document.getElementById("carrito-lista").addEventListener("click", (evento) => {
      const boton = evento.target.closest("button[data-accion]");
      if (!boton) return;

      const id = boton.dataset.id;
      const accion = boton.dataset.accion;

      if (accion === "sumar") actualizarCantidad(id, 1);
      if (accion === "restar") actualizarCantidad(id, -1);
      if (accion === "eliminar") eliminarDelCarrito(id);
    });

    // Vaciar carrito
    document.getElementById("btn-vaciar-carrito").addEventListener("click", () => {
      carrito = [];
      actualizarCarrito();
    });
  }

  function abrirCarrito() {
    if (instanciaOffcanvasCarrito) instanciaOffcanvasCarrito.show();
  }

  /* ============================================================
     5. CARRITO - LÓGICA (CRUD)
     ============================================================ */

  // CREATE: agrega un producto o, si ya existe, incrementa su cantidad
  function agregarAlCarrito(producto, cantidad = 1, promo = null) {
    const existente = carrito.find((item) => item.id === producto.id && item.promo === promo);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        promo: promo,
      });
    }

    actualizarCarrito();
  }

  // UPDATE: modifica la cantidad de un producto ya agregado (+1 / -1)
  function actualizarCantidad(id, delta) {
    const item = carrito.find((item) => item.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
      carrito = carrito.filter((i) => i.id !== id);
    }

    actualizarCarrito();
  }

  // DELETE: elimina un producto específico del carrito
  function eliminarDelCarrito(id) {
    carrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito();
  }

  // Calcula el subtotal de un ítem, respetando la promo 2x1 si corresponde
  function calcularSubtotalItem(item) {
    if (item.promo === "2x1") {
      const unidadesAPagar = Math.ceil(item.cantidad / 2);
      return unidadesAPagar * item.precio;
    }
    return item.cantidad * item.precio;
  }

  function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + calcularSubtotalItem(item), 0);
  }

  function calcularCantidadTotalItems() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  // READ: actualiza toda la interfaz relacionada al carrito (badge, lista, totales)
  function actualizarCarrito() {
    guardarCarritoEnStorage();
    renderizarBadgeCarrito();
    renderizarListaCarrito();
  }

  function renderizarBadgeCarrito() {
    const badge = document.querySelector(".btn-carrito .badge");
    if (badge) badge.textContent = calcularCantidadTotalItems();
  }

  function renderizarListaCarrito() {
    const contenedor = document.getElementById("carrito-lista");
    const mensajeVacio = document.getElementById("carrito-vacio");
    if (!contenedor) return; // el offcanvas todavía no fue creado

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      mensajeVacio.classList.remove("d-none");
    } else {
      mensajeVacio.classList.add("d-none");

      carrito.forEach((item) => {
        const subtotalItem = calcularSubtotalItem(item);
        const etiquetaPromo = item.promo === "2x1" ? '<span class="badge bg-warning text-dark ms-2">2x1</span>' : "";

        const fila = document.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center border-bottom py-2";
        fila.innerHTML = `
          <div>
            <p class="mb-0 fw-semibold">${item.nombre}${etiquetaPromo}</p>
            <small class="text-muted">${formatearPrecio(item.precio)} c/u</small>
            <div class="d-flex align-items-center gap-2 mt-1">
              <button class="btn btn-sm btn-outline-secondary" data-accion="restar" data-id="${item.id}">−</button>
              <span>${item.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary" data-accion="sumar" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="text-end">
            <p class="fw-bold mb-1">${formatearPrecio(subtotalItem)}</p>
            <button class="btn btn-sm btn-outline-danger" data-accion="eliminar" data-id="${item.id}">🗑️</button>
          </div>
        `;
        contenedor.appendChild(fila);
      });
    }

    // Totales y mensaje de envío gratis
    const subtotal = calcularTotalCarrito();
    document.getElementById("carrito-subtotal").textContent = formatearPrecio(subtotal);
    document.getElementById("carrito-total").textContent = formatearPrecio(subtotal);

    const mensajeEnvio = document.getElementById("carrito-envio-msg");
    const UMBRAL_ENVIO_GRATIS = 15000;
    if (subtotal > 0 && subtotal >= UMBRAL_ENVIO_GRATIS) {
      mensajeEnvio.textContent = "🚚 ¡Tu compra tiene envío gratis!";
    } else if (subtotal > 0) {
      const faltante = UMBRAL_ENVIO_GRATIS - subtotal;
      mensajeEnvio.textContent = `Te faltan ${formatearPrecio(faltante)} para envío gratis.`;
    } else {
      mensajeEnvio.textContent = "";
    }
  }

  /* ============================================================
     6. CATÁLOGO POR CATEGORÍAS ("Ver productos")
     ------------------------------------------------------------
     Al hacer clic en el botón de una categoría, se genera
     dinámicamente una sección con al menos 5 productos de esa
     categoría y se agrega debajo de "Categorías".
     ============================================================ */

  // Crea (una sola vez) el contenedor donde se muestran los productos de la categoría elegida
  function obtenerContenedorCategoria() {
    let contenedor = document.getElementById("resultados-categoria");

    if (!contenedor) {
      contenedor = document.createElement("section");
      contenedor.id = "resultados-categoria";
      contenedor.className = "container py-5";
      document.getElementById("categorias").insertAdjacentElement("afterend", contenedor);
    }

    return contenedor;
  }

  function mostrarProductosDeCategoria(nombreCategoriaVisible) {
    const clave = mapaNombreCategoria[nombreCategoriaVisible];
    const productos = catalogoPorCategoria[clave];
    if (!productos) return;

    const contenedor = obtenerContenedorCategoria();

    contenedor.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold mb-0">Productos: ${nombreCategoriaVisible}</h2>
        <button class="btn btn-sm btn-outline-secondary" id="btn-cerrar-categoria">✖ Cerrar</button>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4" id="grid-productos-categoria"></div>
    `;

    const grid = document.getElementById("grid-productos-categoria");

    productos.forEach((producto) => {
      const columna = document.createElement("div");
      columna.className = "col";
      columna.innerHTML = `
        <article class="card product-card h-100 shadow-sm">
          <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <p class="text-muted small mb-1">${nombreCategoriaVisible}</p>
            <h3 class="h5 producto-titulo">${producto.nombre}</h3>
            <p class="fs-4 fw-bold mb-3">${formatearPrecio(producto.precio)}</p>
            <button class="btn btn-success mt-auto btn-agregar-carrito">🛒 Agregar al carrito</button>
          </div>
        </article>
      `;
      columna.querySelector(".btn-agregar-carrito").addEventListener("click", () => {
        agregarAlCarrito(producto);
        abrirCarrito();
      });
      activarPlaceholderSiFalla(columna.querySelector(".producto-img"));
      grid.appendChild(columna);
    });

    document.getElementById("btn-cerrar-categoria").addEventListener("click", () => {
      contenedor.remove();
    });

    contenedor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function inicializarBotonesCategorias() {
    document.querySelectorAll(".categoria-card").forEach((tarjeta) => {
      const boton = tarjeta.querySelector("button");
      const nombreCategoria = tarjeta.querySelector("h3").textContent.trim();

      boton.addEventListener("click", () => mostrarProductosDeCategoria(nombreCategoria));
    });
  }

  /* ============================================================
     7. PRODUCTOS ESTÁTICOS (Productos destacados)
     ------------------------------------------------------------
     Lee cada tarjeta ya presente en el HTML y le asigna al botón
     "Agregar al carrito" el producto correspondiente, extrayendo
     nombre y precio directamente del DOM.
     ============================================================ */
  function inicializarProductosDestacados() {
    document.querySelectorAll("#productos .product-card").forEach((tarjeta, indice) => {
      const nombre = tarjeta.querySelector(".producto-titulo").textContent.trim();
      const precioTexto = tarjeta.querySelector(".fs-4.fw-bold").textContent.trim();
      const precio = textoAPrecio(precioTexto);
      const boton = tarjeta.querySelector("button");

      const producto = {
        id: "destacado-" + indice,
        nombre: nombre,
        precio: precio,
      };

      boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
        abrirCarrito();
      });
    });
  }

  /* ============================================================
     8. BÚSQUEDA DE PRODUCTOS
     ------------------------------------------------------------
     Filtra las tarjetas de "Productos destacados" (y las de una
     categoría desplegada, si hay alguna abierta) según el texto
     ingresado, y hace scroll hasta el catálogo.
     ============================================================ */
  function buscarProductos(texto) {
    const termino = normalizarTexto(texto.trim());

    // Tarjetas a filtrar: destacados + categoría desplegada (si existe)
    const tarjetas = document.querySelectorAll("#productos .product-card, #resultados-categoria .product-card");

    let algunaVisible = false;

    tarjetas.forEach((tarjeta) => {
      const nombre = normalizarTexto(tarjeta.querySelector(".producto-titulo").textContent);
      const columna = tarjeta.closest(".col");
      const coincide = termino === "" || nombre.includes(termino);

      columna.classList.toggle("d-none", !coincide);
      if (coincide) algunaVisible = true;
    });

    document.getElementById("productos").scrollIntoView({ behavior: "smooth", block: "start" });

    if (!algunaVisible && termino !== "") {
      alert(`No se encontraron productos que coincidan con "${texto}".`);
    }
  }

  function inicializarBuscador() {
    const input = document.querySelector('input[type="search"]');
    const boton = input.closest(".input-group").querySelector("button");

    boton.addEventListener("click", () => buscarProductos(input.value));

    input.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        buscarProductos(input.value);
      }
    });
  }

  /* ============================================================
     9. OFERTAS Y PROMOCIONES
     ============================================================ */
  function inicializarOfertas() {
    const seccionOfertas = document.getElementById("ofertas");

    // 🔥 Oferta especial: agrega un combo de productos con descuento
    const botonOfertaEspecial = seccionOfertas.querySelector(".alert-danger button");
    botonOfertaEspecial.addEventListener("click", () => {
      const productosOferta = [
        { id: "oferta-esp-01", nombre: "Aceite de Girasol 1.5 L (Oferta)", precio: 1800 },
        { id: "oferta-esp-02", nombre: "Yerba Mate 1 kg (Oferta)", precio: 2700 },
      ];
      productosOferta.forEach((producto) => agregarAlCarrito(producto));
      abrirCarrito();
      alert("🔥 ¡Se agregaron los productos en oferta especial a tu carrito!");
    });

    // 🛒 2x1: agrega el producto de la promo con cantidad 2 y flag "2x1"
    const botonDosPorUno = seccionOfertas.querySelector(".alert-warning button");
    botonDosPorUno.addEventListener("click", () => {
      const productoDosPorUno = { id: "promo-2x1-gaseosa", nombre: "Gaseosa 2.25 L (2x1)", precio: 2000 };
      agregarAlCarrito(productoDosPorUno, 2, "2x1");
      abrirCarrito();
      alert("🛒 ¡Promoción 2x1 aplicada! Pagás solo una unidad.");
    });

    // 🚚 Envío gratis: lleva al catálogo y recuerda el monto mínimo
    const botonEnvioGratis = seccionOfertas.querySelector(".alert-success button");
    botonEnvioGratis.addEventListener("click", () => {
      document.getElementById("productos").scrollIntoView({ behavior: "smooth", block: "start" });
      alert("🚚 Comprá $15.000 o más y el envío es gratis. ¡Seguí agregando productos!");
    });
  }

  /* ============================================================
     10. NAVBAR - Botón "Carrito"
     ============================================================ */
  function inicializarBotonCarritoNavbar() {
    document.querySelector(".btn-carrito").addEventListener("click", abrirCarrito);
  }

  /* ============================================================
     11. FORMULARIO DE CONTACTO Y CONSULTAS
     ------------------------------------------------------------
     Basado en la lógica original de Lucía (validación de campos
     obligatorios), ahora adaptada para un envío REAL: el formulario
     ya no es de "registro" sino de contacto, y sus datos se envían
     mediante fetch al endpoint de Formspree definido en el atributo
     "action" del <form> en index.html, que reenvía cada consulta a
     rochagloria24@gmail.com.

     Nota para la entrega: Formspree exige confirmar el primer envío
     desde la bandeja de entrada del email de destino (un único mail
     de verificación) antes de que los siguientes formularios lleguen
     de forma automática.
     ============================================================ */
  function inicializarFormularioContacto() {
    const formularioContacto = document.getElementById("form-registro");

    formularioContacto.addEventListener("submit", async (evento) => {
      evento.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación de campos obligatorios (se mantiene la lógica original de Lucía)
      if (nombre === "" || email === "" || telefono === "" || mensaje === "") {
        alert("Por favor, completá todos los campos.");
        return;
      }

      const botonEnviar = formularioContacto.querySelector('button[type="submit"]');
      const textoOriginalBoton = botonEnviar.textContent;
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";

      try {
        const respuesta = await fetch(formularioContacto.action, {
          method: "POST",
          body: new FormData(formularioContacto),
          headers: { Accept: "application/json" },
        });

        if (respuesta.ok) {
          alert("¡Gracias! Tu consulta fue enviada correctamente. Te responderemos a la brevedad.");
          formularioContacto.reset();
        } else {
          alert("No pudimos enviar tu consulta. Probá nuevamente o escribinos por WhatsApp.");
        }
      } catch (error) {
        console.error("Error al enviar el formulario de contacto:", error);
        alert("No pudimos conectarnos para enviar tu consulta. Verificá tu conexión e intentá nuevamente.");
      } finally {
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginalBoton;
      }
    });
  }

  /* ============================================================
     12. MODAL "ENVÍOS A DOMICILIO" - SIMULADOR DE CÓDIGO POSTAL
     ------------------------------------------------------------
     El modal se abre solo (data-bs-toggle en index.html); acá solo
     se resuelve la consulta del código postal ingresado.
     ============================================================ */
  function inicializarSimuladorCodigoPostal() {
    const boton = document.getElementById("btn-consultar-cp");
    const input = document.getElementById("input-cp");
    const resultado = document.getElementById("resultado-cp");
    if (!boton) return; // el modal todavía no existe en esta página

    // Códigos postales con cobertura confirmada (se puede ampliar fácilmente)
    const ZONAS_CON_COBERTURA = {
      4123: "Envío disponible en Famaillá / Tucumán - Entrega en 24hs.",
    };

    function consultarCodigoPostal() {
      const cp = input.value.trim();
      resultado.classList.remove("d-none", "alert-success", "alert-warning");

      if (cp === "") {
        resultado.classList.add("alert-warning");
        resultado.textContent = "Ingresá un código postal para consultar.";
      } else if (ZONAS_CON_COBERTURA[cp]) {
        resultado.classList.add("alert-success");
        resultado.textContent = "✅ " + ZONAS_CON_COBERTURA[cp];
      } else {
        resultado.classList.add("alert-warning");
        resultado.textContent = "Por ahora no tenemos cobertura confirmada para esa zona. Escribinos por WhatsApp y lo verificamos al instante.";
      }
    }

    boton.addEventListener("click", consultarCodigoPostal);
    input.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        consultarCodigoPostal();
      }
    });
  }

  /* ============================================================
     12.5 ACCESIBILIDAD - Tarjetas de "Nuestros servicios"
     ------------------------------------------------------------
     Las tarjetas usan role="button" y data-bs-toggle="modal" para
     abrir su modal con el mouse. Bootstrap sólo escucha el evento
     "click", así que acá sumamos Enter/Espacio para que también
     se puedan abrir navegando con teclado.
     ============================================================ */
  function inicializarAccesibilidadServicios() {
    document.querySelectorAll(".servicio-card").forEach((tarjeta) => {
      tarjeta.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          tarjeta.click();
        }
      });
    });
  }

  /* ============================================================
     13. FOOTER - "Atención al cliente"
     ------------------------------------------------------------
     "Medios de pago" y "Envíos" abren sus modales solos vía
     data-bs-toggle en el HTML; el teléfono, WhatsApp y email ya
     son enlaces reales (tel:, wa.me, mailto:). Solo hace falta
     resolver el link de "Atención al cliente", que lleva a la
     sección de contacto.
     ============================================================ */
  function inicializarAtencionAlCliente() {
    const link = document.getElementById("atencion-cliente");
    if (!link) return;

    link.addEventListener("click", (evento) => {
      evento.preventDefault();
      document.getElementById("contacto").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ============================================================
     14. INICIALIZACIÓN GENERAL
     ============================================================ */
  crearOffcanvasCarrito();
  inicializarBotonCarritoNavbar();
  inicializarBotonesCategorias();
  inicializarProductosDestacados();
  inicializarPlaceholdersDeImagen();
  inicializarBuscador();
  inicializarOfertas();
  inicializarFormularioContacto();
  inicializarSimuladorCodigoPostal();
  inicializarAtencionAlCliente();
  inicializarAccesibilidadServicios();

  // Pinta el carrito con lo que haya quedado guardado de una sesión anterior
  actualizarCarrito();
});