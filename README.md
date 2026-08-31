# Nombre del Proyecto: Interfaz Web Responsive

## Integrantes
- Integrante 1 ROCHA MEDINA GLORIA
- Integrante 2 RODRIGUEZ LUCIA
- Integrante 3 CARINA

## Descripción Breve
Transformación de una estructura HTML base en una interfaz web moderna, responsive y funcional mediante el uso de variables CSS, Flexbox, CSS Grid y buenas prácticas de maquetación semántica.

## Tecnologías Utilizadas
- HTML5 Semántico
- CSS3 (Variables, Flexbox, Grid, Media Queries)
- Git & GitHub (Git Flow con ramas `main`, `dev` y *feature branches*)

## Preguntas Frecuentes de la Entrega

### ¿Dónde utilizaron Flexbox?
Se utilizó Flexbox en:
1. **`header` y `nav`:** Para alinear horizontalmente el logo y los enlaces de navegación, distribuyéndolos con `justify-content: space-between` y espaciándolos con `gap`.
2. **Sección de Servicios (`.flex-container`):** Para organizar las tarjetas de contenido dinámicamente utilizando `flex-wrap` y la propiedad abreviada `flex: 1 1 250px`.

### ¿Dónde utilizaron Grid?
Se utilizó CSS Grid en la **Sección Galería (`.grid-container`)** empleando `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` para adaptar automáticamente el número de columnas según el ancho de la pantalla.

### ¿Qué variables CSS crearon?
En el selector `:root` se crearon variables para:
- **Colores:** `--color-primary`, `--color-secondary`, `--color-bg`, `--color-text`, `--color-white`.
- **Tipografía:** `--font-main`.
- **Espaciados (Box Model):** `--spacing-sm`, `--spacing-md`, `--spacing-lg`.
- **Estilos visuales:** `--border-radius`, `--box-shadow`.

### ¿Cómo implementaron el Responsive Design?
Se implementó mediante:
1. Layouts adaptativos nativos con `auto-fit` y `minmax()` en Grid, y `flex-wrap` en Flexbox.
2. Unidades relativas como `%`, `rem`, `vh`, `vw` y `fr`.
3. **Media Queries  (`@media (max-width: 768px)`)** para reordenar la barra de navegación y ajustar espaciados en pantallas de dispositivos móviles y tablets.

 ### Estrategias SEO
Se incorporaron etiquetas META para mejorar la información que los motores de búsqueda pueden obtener del sitio.
Las estrategias utilizadas fueron:

- **Meta description:** describe brevemente el contenido de la página.
- **Meta keywords:** contiene palabras relacionadas con el supermercado, sus productos y ofertas.
- **Meta author:** identifica al autor o grupo responsable del sitio.
- **Meta robots:** indica a los motores de búsqueda que pueden indexar la página y seguir sus enlaces.
- **Meta viewport:** permite que el sitio se adapte correctamente a diferentes tamaños de pantalla.

Estas etiquetas se incorporaron dentro de la sección `<head>` del archivo `index.html`.