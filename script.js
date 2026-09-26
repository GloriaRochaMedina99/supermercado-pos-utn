/* ============================================================
   SUPERMERCADO MICUMAN - script.js
   TP4 - Programación IV (UTN-FRT)
   

   REFACTOR (Tailwind):
   - El HTML ya no usa Bootstrap, por lo que los componentes que
     antes daba Bootstrap JS (carrito lateral, modales, menú móvil
     y carrusel) ahora se resuelven acá con JavaScript propio.
   - Los selectores ya no dependen de clases de estilo: se usan
     atributos data-* (data-producto, data-agregar, data-filtro...)
     y ids, así cambiar el diseño no rompe la lógica.
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

  /* ============================================================
     1.5 CLASES DE TAILWIND PARA LO QUE GENERA JAVASCRIPT
     ------------------------------------------------------------
     Las tarjetas del flyer están escritas a mano en index.html.
     Las tarjetas de "Ver productos" por categoría se generan acá,
     y deben verse igual: por eso comparten estas clases.
     Si se cambia el estilo de una tarjeta en el HTML, hay que
     actualizar también este objeto.
     ============================================================ */
  const CLASES = {
    tarjeta: "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)]",
    imagenProducto: "h-44 w-full bg-[#f1f8f2] object-contain p-3 min-[1400px]:h-[260px]",
    categoriaProducto: "text-xs font-semibold uppercase tracking-wide text-[#5b6572]",
    tituloProducto: "mt-1 min-h-[3.5rem] text-lg font-bold leading-snug text-[#2e7d32]",
    precioProducto: "mb-4 text-3xl font-extrabold text-[#d32f2f]",
    botonAgregar: "mt-auto rounded-xl bg-[#2e7d32] px-4 py-2.5 font-bold text-white transition hover:bg-[#1b5e20] active:scale-95",
    botonCantidad: "h-8 w-8 rounded-md border border-[#cfd6dd] text-lg leading-none hover:bg-gray-100",
    botonEliminar: "rounded-md border border-[#ef9a9a] px-2 py-1 text-sm hover:bg-[#ffebee]",
    etiquetaPromo: "ml-2 rounded-full bg-[#fbc02d] px-2 py-0.5 text-xs font-bold text-[#1b5e20]",
    alertaExito: "mb-3 rounded-lg border border-[#a5d6a7] bg-[#e8f5e9] px-4 py-3 text-sm text-[#1b5e20]",
    alertaAviso: "mb-3 rounded-lg border border-[#ffe082] bg-[#fff8e1] px-4 py-3 text-sm text-[#5f4300]",
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
     cualquier <img data-fallback> que no pueda cargarse se
     reemplaza por un contenedor prolijo con un ícono vectorial,
     en vez de mostrarse "roto" o vacío. El día que se agreguen
     imágenes reales con las mismas rutas, se muestran
     automáticamente sin tocar el código.
     ============================================================ */
  const ICONO_PRODUCTO_SVG = `
    <svg class="h-auto w-[42%] max-w-[64px] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7h18l-1.4 12.1a2 2 0 0 1-2 1.9H6.4a2 2 0 0 1-2-1.9L3 7Z"></path>
      <path d="M8 7V5.5a4 4 0 0 1 8 0V7"></path>
    </svg>`;

  // Reemplaza una <img> por el contenedor de placeholder, conservando sus clases de tamaño
  function convertirEnPlaceholder(img) {
    const placeholder = document.createElement("div");
    placeholder.className =
      img.className + " flex items-center justify-center bg-[linear-gradient(135deg,#e6f2ec,#eef1ef)] text-[#0d5c38]";
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

  // Aplica el placeholder a todas las imágenes marcadas con data-fallback
  function inicializarPlaceholdersDeImagen() {
    document.querySelectorAll("img[data-fallback]").forEach(activarPlaceholderSiFalla);
  }

  /* ============================================================
     4. CARRITO - PANEL LATERAL (interfaz visual)
     ------------------------------------------------------------
     El panel (#panel-carrito) ya está escrito en index.html.
     Se muestra/oculta deslizándolo con las clases "translate-x-full"
     e "invisible". NO hay fondo oscuro que bloquee la pantalla:
     la usuaria puede seguir haciendo clic y scrolleando el
     catálogo mientras el panel permanece abierto y se va
     actualizando en tiempo real.
     ============================================================ */
  const panelCarrito = document.getElementById("panel-carrito");

  function abrirCarrito() {
    panelCarrito.classList.remove("translate-x-full", "invisible");
  }

  function cerrarCarrito() {
    panelCarrito.classList.add("translate-x-full", "invisible");
  }

  function inicializarPanelCarrito() {
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

    // Cerrar con la X o con la tecla Escape
    document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarCarrito);
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") cerrarCarrito();
    });
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
    const badge = document.getElementById("carrito-contador");
    if (badge) badge.textContent = calcularCantidadTotalItems();
  }

  function renderizarListaCarrito() {
    const contenedor = document.getElementById("carrito-lista");
    const mensajeVacio = document.getElementById("carrito-vacio");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      mensajeVacio.classList.remove("hidden");
    } else {
      mensajeVacio.classList.add("hidden");

      carrito.forEach((item) => {
        const subtotalItem = calcularSubtotalItem(item);
        const etiquetaPromo = item.promo === "2x1" ? `<span class="${CLASES.etiquetaPromo}">2x1</span>` : "";

        const fila = document.createElement("div");
        fila.className = "flex items-center justify-between gap-3 border-b border-[#e4e7eb] py-3";
        fila.innerHTML = `
          <div class="min-w-0">
            <p class="font-semibold leading-snug">${item.nombre}${etiquetaPromo}</p>
            <small class="text-[#5b6572]">${formatearPrecio(item.precio)} c/u</small>
            <div class="mt-1 flex items-center gap-2">
              <button type="button" class="${CLASES.botonCantidad}" data-accion="restar" data-id="${item.id}" aria-label="Quitar una unidad">−</button>
              <span class="min-w-[1.5rem] text-center">${item.cantidad}</span>
              <button type="button" class="${CLASES.botonCantidad}" data-accion="sumar" data-id="${item.id}" aria-label="Agregar una unidad">+</button>
            </div>
          </div>
          <div class="text-right">
            <p class="mb-1 font-bold">${formatearPrecio(subtotalItem)}</p>
            <button type="button" class="${CLASES.botonEliminar}" data-accion="eliminar" data-id="${item.id}" aria-label="Eliminar ${item.nombre} del carrito">🗑️</button>
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
     5.5 BOTÓN "AGREGAR AL CARRITO" (uno por producto)
     ------------------------------------------------------------
     Un único listener delegado atiende TODAS las tarjetas: las
     del flyer (escritas en el HTML) y las generadas por categoría.
     Cada tarjeta es un [data-producto] que trae sus datos en
     atributos data-*, y su botón lleva el atributo data-agregar.
     Agregar un producto es SIEMPRE una acción explícita de la
     persona: ningún otro botón del sitio toca el carrito.
     ============================================================ */
  function inicializarBotonesAgregar() {
    document.addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-agregar]");
      if (!boton) return;

      const tarjeta = boton.closest("[data-producto]");
      if (!tarjeta) return;

      const producto = {
        id: tarjeta.dataset.id,
        nombre: tarjeta.dataset.nombreCarrito || tarjeta.dataset.nombre,
        precio: Number(tarjeta.dataset.precio),
      };

      // Los productos con data-promo="2x1" suman de a 1 unidad; el carrito aplica el 2x1 por pares
      agregarAlCarrito(producto, 1, tarjeta.dataset.promo || null);
      abrirCarrito();
    });
  }

  /* ============================================================
     6. CATÁLOGO POR CATEGORÍAS ("Ver productos")
     ------------------------------------------------------------
     Al hacer clic en el botón de una categoría, se genera
     dinámicamente una sección con los productos de esa categoría
     y se agrega debajo de "Categorías". Solo muestra productos y
     hace scroll: no agrega nada al carrito.
     ============================================================ */

  // Crea (una sola vez) el contenedor donde se muestran los productos de la categoría elegida
  function obtenerContenedorCategoria() {
    let contenedor = document.getElementById("resultados-categoria");

    if (!contenedor) {
      contenedor = document.createElement("section");
      contenedor.id = "resultados-categoria";
      contenedor.className = "scroll-mt-4 px-4 py-10";
      document.getElementById("categorias").insertAdjacentElement("afterend", contenedor);
    }

    return contenedor;
  }

  // Arma una tarjeta de producto con la misma estética que las del flyer
  function crearTarjetaProducto(producto, nombreCategoria) {
    const columna = document.createElement("div");
    columna.setAttribute("data-producto", "");
    columna.dataset.id = producto.id;
    columna.dataset.nombre = producto.nombre;
    columna.dataset.precio = producto.precio;

    columna.innerHTML = `
      <article class="${CLASES.tarjeta}">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="${CLASES.imagenProducto}">
        <div class="flex flex-1 flex-col p-4">
          <p class="${CLASES.categoriaProducto}">${nombreCategoria}</p>
          <h3 class="${CLASES.tituloProducto}">${producto.nombre}</h3>
          <p class="${CLASES.precioProducto}">${formatearPrecio(producto.precio)}</p>
          <button type="button" data-agregar class="${CLASES.botonAgregar}">🛒 Agregar al carrito</button>
        </div>
      </article>
    `;

    activarPlaceholderSiFalla(columna.querySelector("img"));
    return columna;
  }

  function mostrarProductosDeCategoria(clave, nombreCategoriaVisible) {
    const productos = catalogoPorCategoria[clave];
    if (!productos) return;

    const contenedor = obtenerContenedorCategoria();

    contenedor.innerHTML = `
      <div class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#2e7d32_0%,#2e7d32_40%,#81c784_100%)] p-6 shadow-[0_20px_45px_rgba(46,125,50,0.35)] sm:p-8">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-2xl font-extrabold text-white sm:text-3xl">Productos: ${nombreCategoriaVisible}</h2>
          <button type="button" id="btn-cerrar-categoria" class="rounded-lg border-2 border-white/70 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white/20">✖ Cerrar</button>
        </div>
        <div id="grid-productos-categoria" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      </div>
    `;

    const grid = document.getElementById("grid-productos-categoria");
    productos.forEach((producto) => grid.appendChild(crearTarjetaProducto(producto, nombreCategoriaVisible)));

    document.getElementById("btn-cerrar-categoria").addEventListener("click", () => {
      contenedor.remove();
    });

    contenedor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function inicializarBotonesCategorias() {
    document.querySelectorAll("[data-ver-categoria]").forEach((boton) => {
      boton.addEventListener("click", () =>
        mostrarProductosDeCategoria(boton.dataset.verCategoria, boton.dataset.nombreCategoria)
      );
    });
  }

  /* ============================================================
     7. FILTROS Y BÚSQUEDA DEL CATÁLOGO
     ------------------------------------------------------------
     Un solo estado ({ termino, etiqueta }) decide qué tarjetas se
     ven. Las tarjetas del flyer respetan ambos criterios (texto y
     etiqueta: todos / oferta / 2x1 / fresco); las de una categoría
     desplegada solo filtran por texto.
     ============================================================ */
  const estadoFiltros = { termino: "", etiqueta: "todos" };

  function aplicarFiltros() {
    const termino = normalizarTexto(estadoFiltros.termino.trim());
    let visiblesDestacados = 0;
    let visiblesCategoria = 0;

    document.querySelectorAll("[data-producto]").forEach((tarjeta) => {
      const esDestacado = tarjeta.closest("#productos") !== null;
      const tags = (tarjeta.dataset.tags || "").split(" ");

      const coincideTexto = termino === "" || normalizarTexto(tarjeta.dataset.nombre).includes(termino);
      const coincideEtiqueta = !esDestacado || estadoFiltros.etiqueta === "todos" || tags.includes(estadoFiltros.etiqueta);
      const visible = coincideTexto && coincideEtiqueta;

      tarjeta.classList.toggle("hidden", !visible);
      if (visible) {
        if (esDestacado) visiblesDestacados++;
        else visiblesCategoria++;
      }
    });

    // Botón de filtro activo (aria-pressed, que Tailwind usa para pintarlo de amarillo)
    document.querySelectorAll("[data-filtro]").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.filtro === estadoFiltros.etiqueta));
    });

    // Mensaje cuando el flyer queda sin productos
    document.getElementById("sin-resultados").classList.toggle("hidden", visiblesDestacados > 0);

    return { visiblesDestacados, visiblesCategoria };
  }

  // Muestra el catálogo con un filtro aplicado y hace scroll suave hasta él.
  // No agrega nada al carrito ni muestra alertas.
  function mostrarCatalogo(etiqueta) {
    estadoFiltros.etiqueta = etiqueta;
    estadoFiltros.termino = "";
    document.getElementById("input-busqueda").value = "";
    aplicarFiltros();
    document.getElementById("productos").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buscarProductos(texto) {
    estadoFiltros.termino = texto;
    estadoFiltros.etiqueta = "todos"; // una búsqueda siempre parte de "todos"
    const { visiblesDestacados, visiblesCategoria } = aplicarFiltros();

    // Si no hay coincidencias en el flyer pero sí en la categoría abierta, se lleva a la persona hasta ahí
    const destino =
      visiblesDestacados === 0 && visiblesCategoria > 0
        ? document.getElementById("resultados-categoria")
        : document.getElementById("productos");
    destino.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function inicializarBuscador() {
    const input = document.getElementById("input-busqueda");
    const boton = document.getElementById("btn-buscar");

    boton.addEventListener("click", () => buscarProductos(input.value));

    input.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        buscarProductos(input.value);
      }
    });
  }

  function inicializarFiltros() {
    document.querySelectorAll("[data-filtro]").forEach((chip) => {
      chip.addEventListener("click", () => {
        estadoFiltros.etiqueta = chip.dataset.filtro;
        estadoFiltros.termino = "";
        document.getElementById("input-busqueda").value = "";
        aplicarFiltros();
      });
    });
  }

  /* ============================================================
     8. OFERTAS Y PROMOCIONES
     ------------------------------------------------------------
     Los botones de "Ofertas de la semana" ("Ver oferta",
     "Ver productos" y "Comprar ahora") ya NO agregan productos al
     carrito ni muestran alertas: llevan con scroll suave hasta el
     catálogo y aplican el filtro que indica su atributo
     data-ir-catalogo. Cada persona elige qué agregar con el botón
     individual de cada tarjeta.
     ============================================================ */
  function inicializarOfertas() {
    document.querySelectorAll("[data-ir-catalogo]").forEach((boton) => {
      boton.addEventListener("click", () => mostrarCatalogo(boton.dataset.irCatalogo));
    });
  }

  /* ============================================================
     9. NAVBAR - Menú móvil y botón "Carrito"
     ============================================================ */
  function inicializarNavbar() {
    const botonMenu = document.getElementById("btn-menu");
    const menu = document.getElementById("menuPrincipal");

    // En celulares el menú se despliega/oculta. En pantallas grandes se ve siempre (clase lg:flex del HTML).
    function alternarMenu(abrir) {
      menu.classList.toggle("flex", abrir);
      menu.classList.toggle("hidden", !abrir);
      botonMenu.setAttribute("aria-expanded", String(abrir));
    }

    botonMenu.addEventListener("click", () => alternarMenu(botonMenu.getAttribute("aria-expanded") !== "true"));
    menu.querySelectorAll("a").forEach((enlace) => enlace.addEventListener("click", () => alternarMenu(false)));

    document.getElementById("btn-carrito").addEventListener("click", abrirCarrito);
  }

  /* ============================================================
     10. CARRUSEL DE OFERTAS
     ------------------------------------------------------------
     Reemplaza al carrusel de Bootstrap: cambia de imagen con un
     fundido (opacity), con flechas, indicadores y avance
     automático que se pausa al pasar el mouse o enfocar.
     ============================================================ */
  function inicializarCarrusel() {
    const carrusel = document.getElementById("carrusel");
    if (!carrusel) return;

    const slides = [...carrusel.querySelectorAll("[data-slide]")];
    const puntos = [...carrusel.querySelectorAll("[data-punto]")];
    let actual = 0;
    let temporizador = null;

    function mostrar(indice) {
      actual = (indice + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === actual);
        slide.classList.toggle("opacity-0", i !== actual);
        slide.setAttribute("aria-hidden", String(i !== actual));
      });
      puntos.forEach((punto, i) => punto.setAttribute("aria-current", String(i === actual)));
    }

    function iniciarAutoavance() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // respeta la preferencia del sistema
      detenerAutoavance();
      temporizador = setInterval(() => mostrar(actual + 1), 5000);
    }

    function detenerAutoavance() {
      clearInterval(temporizador);
    }

    carrusel.querySelector("[data-carrusel-prev]").addEventListener("click", () => mostrar(actual - 1));
    carrusel.querySelector("[data-carrusel-next]").addEventListener("click", () => mostrar(actual + 1));
    puntos.forEach((punto, i) => punto.addEventListener("click", () => mostrar(i)));

    carrusel.addEventListener("mouseenter", detenerAutoavance);
    carrusel.addEventListener("mouseleave", iniciarAutoavance);
    carrusel.addEventListener("focusin", detenerAutoavance);
    carrusel.addEventListener("focusout", iniciarAutoavance);

    mostrar(0);
    iniciarAutoavance();
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
     12. MODALES (<dialog> nativo)
     ------------------------------------------------------------
     Reemplazan a los modales de Bootstrap. Cualquier elemento con
     data-abrir-modal="idDelModal" abre su <dialog> con showModal()
     (que ya trae fondo oscuro, foco atrapado y cierre con Escape).
     Se cierran con la X (data-cerrar-modal) o haciendo clic afuera.
     Como son <button> reales, también se abren con Enter/Espacio
     sin código extra.
     ============================================================ */
  function inicializarModales() {
    document.querySelectorAll("[data-abrir-modal]").forEach((disparador) => {
      disparador.addEventListener("click", (evento) => {
        evento.preventDefault();
        const modal = document.getElementById(disparador.dataset.abrirModal);
        if (!modal) return;
        modal.showModal();
        document.body.classList.add("overflow-hidden"); // evita que la página de atrás se desplace
      });
    });

    document.querySelectorAll("dialog").forEach((modal) => {
      // Clic en el fondo oscuro (el evento llega al <dialog> mismo, no a su contenido)
      modal.addEventListener("click", (evento) => {
        if (evento.target === modal) modal.close();
      });
      modal.addEventListener("close", () => document.body.classList.remove("overflow-hidden"));
    });

    document.querySelectorAll("[data-cerrar-modal]").forEach((boton) => {
      boton.addEventListener("click", () => boton.closest("dialog").close());
    });
  }

  /* ============================================================
     12.5 MODAL "ENVÍOS A DOMICILIO" - SIMULADOR DE CÓDIGO POSTAL
     ------------------------------------------------------------
     El modal se abre solo (data-abrir-modal); acá solo se resuelve
     la consulta del código postal ingresado.
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

    function mostrarResultado(mensaje, clases) {
      resultado.className = clases;
      resultado.textContent = mensaje;
    }

    function consultarCodigoPostal() {
      const cp = input.value.trim();

      if (cp === "") {
        mostrarResultado("Ingresá un código postal para consultar.", CLASES.alertaAviso);
      } else if (ZONAS_CON_COBERTURA[cp]) {
        mostrarResultado("✅ " + ZONAS_CON_COBERTURA[cp], CLASES.alertaExito);
      } else {
        mostrarResultado(
          "Por ahora no tenemos cobertura confirmada para esa zona. Escribinos por WhatsApp y lo verificamos al instante.",
          CLASES.alertaAviso
        );
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
     13. FOOTER - "Atención al cliente"
     ------------------------------------------------------------
     "Medios de pago" y "Envíos" abren sus modales solos vía
     data-abrir-modal en el HTML; el teléfono, WhatsApp y email ya
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
  inicializarPanelCarrito();
  inicializarNavbar();
  inicializarCarrusel();
  inicializarBotonesCategorias();
  inicializarBotonesAgregar();
  inicializarPlaceholdersDeImagen();
  inicializarBuscador();
  inicializarFiltros();
  inicializarOfertas();
  inicializarFormularioContacto();
  inicializarModales();
  inicializarSimuladorCodigoPostal();
  inicializarAtencionAlCliente();

  // Pinta el carrito con lo que haya quedado guardado de una sesión anterior
  actualizarCarrito();
});