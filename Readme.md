# Turnos App Backend

Aplicación backend utilizando clean architecture, TypeScript, Express, Mongoose.

## Instalar dependencias

```bash
pnpm install
```

## Iniciar en Modo Dev

```bash
pnpm run dev
```

## Variables de entorno

Definir en archivo `.env` las siguientes variables de entorno:

- `PORT`
- `MONGODB_URI`

## Rutas de API

| Método | Ruta               | Función                              |
| ------ | ------------------ | ------------------------------------ |
| GET    | /                  | Healthcheck - Version                |
| GET    | /api/professionals | Obtener todos los profesionales      |
| POST   | /api/professionals | Crear Profesional                    |
| GET    | /api/appointments  | Obtener todas las entradas de turnos |
| POST   | /api/appointments  | Crear Entrada de turnos              |
