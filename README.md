# Backend Avanzado - API REST con TypeScript

API REST desarrollada con TypeScript, Express y MongoDB, implementando buenas prácticas de desarrollo y arquitectura limpia.

## 🚀 Características

- ✅ TypeScript con configuración estricta
- ✅ Express.js para el servidor HTTP
- ✅ MongoDB con Mongoose para la base de datos
- ✅ ESLint + Prettier para calidad de código
- ✅ Pre-commit hooks (detección de secretos + lint)
- ✅ Docker Compose para MongoDB y Mongo Express
- ✅ Variables de entorno tipadas
- ✅ Arquitectura modular (config, models, routes)
- ✅ Hot reload con Nodemon

## 📋 Requisitos previos

- Node.js >= 18.x
- Docker y Docker Compose
- Git

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd Backend-Avanzado-Otaku
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar hooks de Git** (opcional pero recomendado)
```bash
./setup-hooks.sh
```

4. **Iniciar MongoDB con Docker**
```bash
docker-compose up -d
```

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

### Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

### Linting

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
```

## 📁 Estructura del proyecto

```
Backend-Avanzado-Otaku/
├── src/
│   ├── config/              # Configuración de la aplicación
│   │   ├── constants.ts     # Constantes globales
│   │   ├── database.ts      # Conexión a MongoDB
│   │   └── environment.ts   # Variables de entorno
│   ├── models/              # Modelos de Mongoose
│   │   └── product.ts       # Modelo de Producto
│   ├── routes/              # Rutas de Express
│   │   └── product.route.ts # Endpoints de productos
│   └── server.ts            # Punto de entrada de la aplicación
├── scripts/
│   └── check-secrets.sh     # Script de detección de secretos
├── docker-compose.yml       # Configuración de Docker
├── eslint.config.js         # Configuración de ESLint
├── nodemon.json             # Configuración de Nodemon
├── package.json             # Dependencias y scripts
├── setup-hooks.sh           # Script de configuración de hooks
└── tsconfig.json            # Configuración de TypeScript
```

## 🔌 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Obtener todos los productos |
| GET | `/products/:id` | Obtener un producto por ID |
| POST | `/products` | Crear un nuevo producto |
| PATCH | `/products/:id` | Actualizar un producto |
| DELETE | `/products/:id` | Eliminar un producto |

### Ejemplo de uso

**Crear un producto:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto de prueba",
    "description": "Descripción del producto"
  }'
```

**Obtener todos los productos:**
```bash
curl http://localhost:3000/products
```

## 🐳 Docker

### MongoDB
- Puerto: `27018` (mapeado desde 27017 del contenedor)
- Usuario: `admin`
- Contraseña: `admin123`

### Mongo Express (UI para MongoDB)
- URL: `http://localhost:8081`
- No requiere autenticación

### Comandos útiles

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

## ⚙️ Configuración


### Variables de entorno

Las variables de entorno se gestionan en `src/config/environment.ts` y NUNCA deben contener credenciales reales en archivos versionados.

- `NODE_ENV`: `development` | `production` | `test`
- `PORT`: `3000`
- `MONGODB_URI`: Cadena de conexión a MongoDB (usa variables de entorno para usuario y password)

**Importante:**
- Copia `.env.example` a `.env` y pon tus credenciales reales SOLO en `.env`.
- NUNCA subas `.env` ni credenciales reales al repositorio.
- `.env` está en `.gitignore` y no será versionado.

Ejemplo de `.env`:
```env
NODE_ENV=development
PORT=3000
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123
MONGODB_URI=mongodb://admin:admin123@localhost:27018/db?authSource=admin
```

En `.env.example` pon solo valores de ejemplo o marcadores (`<tu_usuario>`, `<tu_password>`).

## 🧪 Git Hooks

El proyecto incluye pre-commit hooks que ejecutan:

1. **Detección de secretos**: Escanea archivos en busca de API keys, tokens, passwords, etc.
2. **ESLint**: Valida el código TypeScript modificado

Para saltarlos (no recomendado):
```bash
git commit --no-verify -m "mensaje"
```

## 🛠️ Tecnologías utilizadas

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework web**: Express.js
- **Base de datos**: MongoDB
- **ODM**: Mongoose
- **Linting**: ESLint
- **Formateo**: Prettier
- **Dev tools**: Nodemon, ts-node
- **Containerización**: Docker, Docker Compose

## 📝 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot reload |
| `npm run build` | Compila TypeScript a JavaScript en `dist/` |
| `npm start` | Ejecuta la versión compilada |
| `npm run lint` | Verifica el código con ESLint |
| `npm run lint:fix` | Corrige automáticamente errores de ESLint |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convención de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Formateo, punto y coma, etc.
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Actualizar dependencias, configuración, etc.

## 📄 Licencia

ISC

## 👤 Autor

Tu nombre

---

⭐️ Si te ha sido útil este proyecto, considera darle una estrella en GitHub
