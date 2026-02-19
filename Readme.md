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

| Método | Ruta                  | Función                                            |
| ------ | --------------------- | -------------------------------------------------- |
| `GET`  | `/`                   | Healthcheck - Version                              |
| `GET`  | `/api/patient`        | Obtener todos los pacientes                        |
| `POST` | `/api/patient`        | Crear paciente                                     |
| `PUT`  | `/api/patient`        | Actualizar paciente                                |
| `GET`  | `/api/professional`   | Obtener todos los profesionales                    |
| `POST` | `/api/professional`   | Crear Profesional                                  |
| `GET`  | `/api/assignment`     | Obtener todas las asignaciones de turnos           |
| `GET`  | `/api/assignment/:id` | Obtener una asignación de turnos por id            |
| `POST` | `/api/assignment`     | Crear asignación de turnos                         |
| `POST` | `/api/assignment/:id` | Crear una request en asignación de turno con el id |
