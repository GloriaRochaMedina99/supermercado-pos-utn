# 🛒 Supermercado Micuman

> E-commerce de supermercado desarrollado como proyecto integrador de la materia **Programación IV** — UTN-FRT.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

---

## 👥 Información del Equipo

| Dato | Detalle |
|---|---|
| **Proyecto** | Supermercado Micuman |
| **Materia** | Programación IV — UTN-FRT |
| **Grupo** | Grupo 9 |

**Integrantes:**

| Integrante | Rol |
|---|---|
| Rocha Medina, Gloria | Líder de Proyecto |
| Rodríguez, Lucía | Integrante |
| Condori, Karina | Integrante |

---

## 📋 Descripción Breve

**Supermercado Micuman** es un sitio web de e-commerce desarrollado de forma **evolutiva a lo largo de la cursada**, aplicando en cada entrega los contenidos vistos en la materia:

- Maquetado semántico en **HTML5**.
- Definición de estilos propios en **CSS3** (variables, Flexbox y Grid).
- Refactorización visual y adaptación **responsive** con **Bootstrap 5**.
- Incorporación de **funcionalidades dinámicas** e interacción con el DOM mediante **JavaScript**, transformando el sitio estático en una experiencia de compra interactiva: catálogo dinámico, buscador, carrito de compras y formulario de contacto.

El resultado final es un e-commerce funcional, prolijo y adaptable a cualquier dispositivo, listo para su presentación como cierre de la materia.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| **HTML5 Semántico** | Estructura base del sitio (`header`, `nav`, `section`, `footer`, etc.) |
| **CSS3** | Variables (`:root`), Flexbox y CSS Grid para maquetado y estilos propios |
| **Bootstrap v5** | Sistema de grillas, componentes (navbar, cards, offcanvas, carrusel) y adaptación responsive |
| **JavaScript (ES6+ & DOM)** | Lógica de catálogo, buscador, carrito de compras y formularios |
| **Git & GitHub** | Control de versiones y trabajo colaborativo del equipo |
| **Netlify** | Deploy y publicación web del sitio |

---

## ⚙️ Funcionalidades e Interacciones Destacadas (TP4)

El TP4 incorpora la capa de **JavaScript y manipulación del DOM**, sumando las siguientes funcionalidades sobre la base HTML/CSS/Bootstrap ya construida:

### 🗂️ Catálogo Dinámico
Al presionar **"Ver productos"** en cualquiera de las cuatro categorías (**Almacén, Lácteos, Frutas y Verduras, Bebidas**), se genera dinámicamente un listado de productos correspondientes a esa categoría, cada uno con nombre, precio, imagen y botón de compra.

### 🔎 Búsqueda en Tiempo Real
La barra de búsqueda del encabezado permite filtrar los productos del catálogo por nombre, tanto al presionar la lupa como al presionar `Enter`, actualizando la vista de forma dinámica.

### 🛒 Carrito de Compras (CRUD)
Panel lateral tipo **Offcanvas** que permite gestionar el carrito sin interrumpir la navegación (se abre sin bloquear la pantalla, permitiendo seguir comprando):

- **Agregar** productos desde cualquier sección del sitio (destacados, categorías u ofertas).
- **Sumar / restar** la cantidad de cada producto.
- **Eliminar** un producto puntual del carrito.
- **Cálculo automático** de subtotal por ítem y total general, incluyendo promociones (ej. 2x1).
- **Contador en vivo** de unidades en el ícono del carrito del navbar.

### 📝 Formulario de Registro y Módulo de Contacto
- Validación de campos obligatorios (Nombre, Email, Teléfono, Mensaje).
- Verificación de aceptación de los **Términos y Condiciones**.
- Alertas informativas de confirmación y en la sección de contacto (Medios de pago, Envíos, Email).

---

## 🌿 Estructura de Ramas y Trabajo Colaborativo (Git)

El equipo trabajó bajo un flujo de **Git Flow simplificado**, pensado para permitir el desarrollo en paralelo sin afectar la versión estable del proyecto:

- **`main`** → Rama de producción. Contiene la versión estable y publicada del sitio (deploy en Netlify).
- **`dev`** → Rama principal de integración. Todas las funcionalidades desarrolladas se integran primero acá antes de pasar a `main`.
- **Ramas `feature/*` y `refactor/*`** → Cada integrante desarrolla su parte en una rama propia a partir de `dev` (por ejemplo, `feature/carrito-js`, `feature/formulario-registro`, `refactor/responsive-css`).

**Flujo de trabajo:**

1. Cada integrante crea su rama a partir de `dev`.
2. Desarrolla y commitea sus cambios de forma incremental.
3. Al finalizar, abre un **Pull Request** hacia `dev`.
4. El resto del equipo revisa los cambios antes de aprobar el merge.
5. Una vez validada la integración en `dev`, se mergea a `main` para su publicación.

Este esquema permitió que las tres integrantes trabajaran de forma simultánea en distintas funcionalidades (catálogo/carrito, formulario/contacto, estilos/responsive) minimizando conflictos de código.

---

## 🚀 Deploy

El sitio se encuentra publicado mediante **Netlify**, con integración continua desde la rama `main` del repositorio.

---

© 2026 Supermercado Micuman — Trabajo Práctico Integrador, Programación IV (UTN-FRT).