# Sistema de Gestión para Supermercado

Proyecto desarrollado para la cátedra de Programación en la UTN. Consiste en una arquitectura modular que combina venta online y un sistema de Punto de Venta (POS) para atención presencial.

## Integrantes del Grupo
- Gloria Rocha Medina (Administradora / Reviewer de PRs)
- Lucia Rodriguez
- Carina ...

## Metodología y Flujo de Trabajo (Git / GitHub)
- **`main`**: Rama de producción estable.
- **`dev`**: Rama principal de integración y desarrollo.
- **`feature/*`**: Ramas independientes para cada funcionalidad.
- **Pull Requests (PR)**: Todo cambio realizado por las integrantes se integra mediante PRs revisadas y aprobadas por la administración antes del merge a `dev`.

## Arquitectura Modular del Proyecto
Diseñado mediante componentes HTML independientes y variables globales CSS para permitir la incorporación de nuevos módulos (lectores de barras, inventarios, nuevas promociones) sin alterar la estabilidad del código base.