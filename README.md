# W Wallet Backend

Backend de **W Wallet**, una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de finanzas personales.

La aplicación permite administrar usuarios, ingresos, gastos, categorías, metas de ahorro y autenticación mediante JWT, proporcionando una base sólida y segura para la aplicación web.

---

# Características

- Autenticación con JWT (Access Token + Refresh Token)
- Refresh Token mediante Cookies HTTP Only
- Gestión de usuarios
- Gestión de ingresos
- Gestión de gastos
- Gestión de categorías
- Gestión de metas de ahorro
- Registro de aportes a metas
- Dashboard con estadísticas financieras
- Subida de imágenes de perfil mediante Cloudinary
- Validaciones utilizando Zod
- Arquitectura basada en Servicios y Controladores

---

# Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- Multer
- Cloudinary
- Zod
- dotenv

---

# Arquitectura

El proyecto sigue una arquitectura por responsabilidades para mantener el código desacoplado y fácil de mantener.

```
src
│
├── auth
│   ├── auth.controller.js
│   ├── auth.routes.js
│   ├── auth.service.js
│   └── auth.validation.js
│
├── controllers
├── middlewares
├── models
├── routes
├── services
├── validations
├── utils
└── app.js
```

Cada capa tiene una única responsabilidad:

- **Controllers** → reciben las peticiones HTTP.
- **Services** → contienen toda la lógica de negocio.
- **Models** → definición de colecciones MongoDB.
- **Validations** → validaciones de entrada.
- **Middlewares** → autenticación, manejo de errores y respuestas.

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/wagnerwilliam/w_wallet_backend.git
```

Entrar al proyecto

```bash
cd w_wallet_backend
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env`

```env
PORT=3000

DATABASE_URL=

JWT_SECRET_KEY=

CLIENT_KEY=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

---

# Autenticación

La API utiliza un sistema de autenticación basado en dos tokens.

## Access Token

- Tiene una duración corta.
- Se envía en cada petición mediante:

```
Authorization: Bearer <access_token>
```

## Refresh Token

- Se almacena como una Cookie HTTP Only.
- Cuando el Access Token expira, el frontend solicita automáticamente uno nuevo utilizando el Refresh Token.
- Si el Refresh Token sigue siendo válido, se genera un nuevo Access Token sin que el usuario tenga que volver a iniciar sesión.

---

# Seguridad

La API incorpora diversas medidas de seguridad:

- JWT Authentication
- Refresh Tokens
- Cookies HTTP Only
- bcrypt para almacenamiento seguro de contraseñas
- Validación de Client Key
- Validación de datos mediante Zod
- Validación de permisos mediante Middlewares

---

# Funcionalidades

## Usuarios

- Registro
- Login
- Logout
- Renovación de sesión
- Edición de perfil
- Fotografía de perfil

## Categorías

- Crear categoría
- Editar categoría
- Eliminar categoría
- Listar categorías

## Ingresos

- Crear ingresos
- Editar ingresos
- Eliminar ingresos
- Consultar ingresos

## Gastos

- Crear gastos
- Editar gastos
- Eliminar gastos
- Consultar gastos

## Metas

- Crear metas
- Editar metas
- Registrar aportes
- Consultar progreso
- Resumen de metas

## Dashboard

Obtención de:

- Total de ingresos
- Total de gastos
- Balance disponible
- Estadísticas generales

---

# Servicios externos

## Cloudinary

Se utiliza para almacenar las fotografías de perfil de los usuarios.

## MongoDB

Base de datos principal del proyecto.

---

# Frontend

El frontend del proyecto se encuentra disponible en:

https://github.com/wagnerwilliam/w_wallet_web

Aplicación:

https://w-wallet-web.vercel.app/

---

# Autor

Desarrollado por **William Wagner**.