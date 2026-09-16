# 🛒 Supermercado POS - Proyecto Web (UTN FRT)

¡Bienvenido al repositorio oficial de nuestro proyecto de **Supermercado Online**! Este sitio fue desarrollado de forma colaborativa para la materia **Programación IV** de la *Tecnicatura Universitaria en Programación* (Universidad Tecnológica Nacional - Facultad Regional Tucumán).

---

## 👥 Integrantes del Grupo
**GRUPO 9*
| Nombre y Apellido | Rol en el Proyecto |
| :--- | :--- |
| *Gloria Rocha Medina* | Coordinación, maquetación HTML/Bootstrap y refactorización |
| *Karina Condori* | Desarrollo de hoja de estilos base (CSS) y responsividad |
| *Lucia Rodriguez* | Programación de lógica interactiva y validaciones (JavaScript) |

---

## 📌 Evolución de los Trabajos Prácticos (TP1 a TP4)

El sitio fue evolucionando paulatinamente a lo largo de los trabajos prácticos planteados en la cátedra:

* **TP1 - Estructura Base HTML:** Creación de las secciones principales del sitio, maquetación de tarjetas de productos, listas de ofertas, formulario de datos de cliente y pie de página.
* **TP2 - Maquetación y Semántica:** Incorporación de etiquetas HTML5 semánticas (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`), mejoras de accesibilidad (atributos `aria-*`) y diseño responsive inicial con **CSS Flexbox y Grid**.
* **TP3 - Refactorización con Bootstrap 5:** Migración del layout general hacia la librería **Bootstrap 5**. Implementación del menú de navegación flotante (`navbar-expand-lg`), sistema de rejillas responsive (`row-cols-*`) y componentes visuales (`cards`, `badges`, `alerts`).
* **TP4 - Programación Interactiva con JS:** Agregado del archivo `script.js` con manipulación del DOM para crear:
  1. Contador dinámico de carrito con persistencia local (`localStorage`).
  2. Resaltador automático de la oferta del día según la fecha del sistema (`Date()`).
  3. Validación interactiva de campos del formulario con alertas de error y éxito.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructuración semántica y accesible.
* **CSS3:** Variables globales de diseño (`:root`) y reglas personalizadas.
* **Bootstrap 5.3:** Framework de diseño y componentes UI responsive.
* **JavaScript (ES6):** Manipulación dinámica del DOM y lógica del cliente.
* **Git & GitHub:** Control de versiones, trabajo por ramas (`feature`, `refactor`) y Pull Requests.
* **Netlify:** Alojamiento y despliegue continuo de la aplicación web.

---

## 📁 Estructura del Proyecto

```text
Prog_IV_2026/
├── img/             # Carpeta reservada para imágenes del catálogo y logo
├── index.html       # Estructura principal y maquetación de la app
├── style.css        # Hoja de estilos con variables de marca y Bootstrap overrides
├── script.js        # Lógica de interacción JS (Carrito, Ofertas y Formulario)
└── README.md        # Documentación técnica y académica del proyecto