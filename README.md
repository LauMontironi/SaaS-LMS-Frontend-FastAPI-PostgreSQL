# 🎓 SaaS LMS Frontend

> **Angular + PrimeNG** — Plataforma de cursos online con autenticación JWT, dashboard de alumno, panel admin y diseño custom desde **Figma**.

[![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-17+-DD6B20?style=for-the-badge&logo=primeng&logoColor=white)](https://primeng.org/)
[![Figma](https://img.shields.io/badge/Diseño_en-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://figma.com/)
[![Railway](https://img.shields.io/badge/Backend_en-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

---

## 🌐 Demo en producción

> Frontend conectado a un backend real desplegado en Railway:

```
https://saas-lms-backend-fastapi-postgresql-production.up.railway.app
```

📄 **Documentación de la API:**
👉 [https://saas-lms-backend-fastapi-postgresql-production.up.railway.app/docs](https://saas-lms-backend-fastapi-postgresql-production.up.railway.app/docs)

---

## 🧩 ¿Qué hace esta aplicación?

Plataforma web para explorar cursos, autenticarse y gestionar contenido. El usuario puede:

- 🏠 Ver una landing page moderna
- 📝 Registrarse e iniciar sesión
- 🎓 Acceder a su dashboard personalizado con datos reales
- 📚 Explorar y filtrar cursos
- ▶️ Ver el detalle de cada curso con preview embebido
- 🛠️ Gestionar cursos y lessons desde el panel admin

---

## 🛠️ Stack tecnológico

| Tecnología                    | Uso                                |
| ----------------------------- | ---------------------------------- |
| **Angular**                   | Framework principal                |
| **TypeScript**                | Tipado estático                    |
| **Signals**                   | Gestión de estado reactivo         |
| **Standalone Components**     | Arquitectura modular sin NgModules |
| **HttpClient + Interceptors** | Consumo de API + JWT automático    |
| **PrimeNG**                   | Componentes UI                     |
| **CSS custom**                | Estilos propios sobre Figma        |
| **Figma**                     | Diseño UI/UX antes de implementar  |

---

## ⚙️ Funcionalidades principales

### 🌍 Público

- Landing page moderna con hero promocional
- Cursos destacados y marcas de confianza
- Navegación hacia login / register

### 🎓 Usuario autenticado

- Login y registro con validación real
- Dashboard con datos del backend
- _Continue learning_, _Recommended_ y _Trending courses_
- Filtros visuales por categoría
- Course detail con preview embebido
- Avatar por `avatar_url` o fallback con iniciales

### 🛠️ Admin

- Redirección automática según `role` tras el login
- Dashboard admin con estadísticas reales
- Gestión completa de cursos (CRUD)
- Gestión completa de lessons (CRUD)

---

## 📐 Diseño

El diseño de la interfaz fue desarrollado previamente en **Figma** antes de implementarlo en Angular, siguiendo un flujo real de producto:

```
Wireframe → Diseño en Figma → Implementación Angular + PrimeNG + CSS custom
```

---

## 📁 Estructura del proyecto

```bash
src/app/
├── components/       # Componentes reutilizables (cards, banners, nav...)
├── interfaces/       # Tipado TypeScript de modelos
├── interceptors/     # JWT interceptor
├── pages/            # Vistas principales (landing, dashboard, admin...)
├── services/         # Llamadas HTTP al backend
├── app.routes.ts     # Configuración de rutas
└── app.config.ts     # Configuración global de la app
```

---

## 💻 Instalación local

```bash
# Instalar dependencias
npm install

# Ejecutar en local
ng serve
```

La app estará disponible en:

```
http://localhost:4200
```

---

## 🔌 Conexión al backend

El frontend consume la API REST desplegada en Railway. La URL base se configura en los servicios Angular:

```typescript
private baseUrl =
  'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';
```

---

## 🔐 Autenticación

Flujo JWT completo:

1. El usuario hace login → el backend devuelve un token JWT
2. El token se almacena en `localStorage`
3. Un **HTTP Interceptor** adjunta automáticamente el header en cada petición:

```
Authorization: Bearer <token>
```

### 🔀 Flujo de roles

Tras el login, la app redirige según el rol del usuario:

| Rol       | Redirección  |
| --------- | ------------ |
| `student` | `/dashboard` |
| `admin`   | `/admin`     |

---

## 🧱 Componentes destacados

- `landing-page` — Hero, featured courses, trusted brands
- `welcome-banner` — Saludo personalizado con nombre y avatar
- `continue-learning` — Cursos en progreso del alumno
- `course-card` — Tarjeta de curso reutilizable
- `category-ticker` — Filtro visual por categorías
- `admin-stats-cards` — KPIs del sistema
- `admin-course-form` — Formulario de creación / edición de curso
- `admin-lessons-manager` — Gestión de lessons por curso

---

## 🧠 Aprendizajes técnicos

Durante el desarrollo trabajé especialmente en:

- 🌐 Conexión real con backend (Angular → FastAPI)
- ⚡ Manejo de estado reactivo con **Signals**
- 🧩 Arquitectura con **Standalone Components**
- 🔒 Uso de **interceptors** para JWT
- 🔀 Redirección y guards por roles
- 🎨 Diseño previo en **Figma** antes de maquetar
- 🧱 Vistas diferenciadas para alumno y admin

---

## 📊 Estado actual

> Proyecto funcional en evolución continua.

### ✅ Implementado

- [x] Landing page
- [x] Auth real (login + registro)
- [x] Dashboard alumno con datos reales
- [x] Course detail con progreso
- [x] Admin dashboard con stats
- [x] Admin courses management (CRUD)
- [x] Admin lessons management (CRUD)

---

## 👩‍💻 Autora

**Laura Montironi**
Desarrolladora Full Stack en transición profesional — con background en finanzas y mentalidad de analista aplicada al software.

[![GitHub](https://img.shields.io/badge/GitHub-LauMontironi-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LauMontironi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-laura--montironi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/laura-montironi)
[![Blog](https://img.shields.io/badge/Blog-mi--camino--dev-FF5722?style=for-the-badge&logo=devdotto&logoColor=white)](https://mi-camino-dev-blog.vercel.app/)
[![Email](https://img.shields.io/badge/Email-lau.montironi%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lau.montironi@gmail.com)

---

<p align="center">
  Diseñado en ✏️ Figma · Construido con ⚡ Angular · Hecho con ❤️ y mucho ☕
</p>
