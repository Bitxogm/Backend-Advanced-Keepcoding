#!/bin/bash

# Script de inicialización de proyecto TypeScript con Express + MongoDB
# Uso: ./init-new-project.sh /ruta/al/nuevo-proyecto

set -e  # Detener en caso de error

PROJECT_PATH=$1

if [ -z "$PROJECT_PATH" ]; then
    echo "❌ Error: Debes especificar la ruta del nuevo proyecto"
    echo "Uso: ./init-new-project.sh /ruta/al/nuevo-proyecto"
    exit 1
fi

if [ -d "$PROJECT_PATH" ]; then
    echo "⚠️  El directorio ya existe: $PROJECT_PATH"
    read -p "¿Quieres continuar de todas formas? (s/N): " confirm
    if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
        echo "❌ Cancelado"
        exit 1
    fi
else
    echo "📁 Creando directorio: $PROJECT_PATH"
    mkdir -p "$PROJECT_PATH"
fi

echo ""
echo "🚀 Iniciando configuración del proyecto..."
echo ""

# Cambiar al directorio del proyecto
cd "$PROJECT_PATH"

# 1. Inicializar Git
echo "📦 Inicializando Git..."
git init

# 2. Copiar archivos de configuración
echo "📋 Copiando archivos de configuración..."
TEMPLATE_DIR="$(dirname "$(readlink -f "$0")")"

cp "$TEMPLATE_DIR/package.json" .
cp "$TEMPLATE_DIR/tsconfig.json" .
cp "$TEMPLATE_DIR/nodemon.json" .
cp "$TEMPLATE_DIR/eslint.config.js" .
cp "$TEMPLATE_DIR/.gitignore" .
cp "$TEMPLATE_DIR/docker-compose.yml" .
cp "$TEMPLATE_DIR/setup-hooks.sh" .

# 3. Copiar estructura de directorios
echo "📂 Creando estructura de directorios..."
mkdir -p src/{config,models,routes}

cp -r "$TEMPLATE_DIR/src/config" src/
cp -r "$TEMPLATE_DIR/src/models" src/ 2>/dev/null || true
cp -r "$TEMPLATE_DIR/src/routes" src/ 2>/dev/null || true
cp "$TEMPLATE_DIR/src/server.ts" src/ 2>/dev/null || true

# 4. Crear README básico
echo "📝 Creando README.md..."
cat > README.md << 'EOF'
# Proyecto TypeScript + Express + MongoDB

## Instalación

\`\`\`bash
npm install
\`\`\`

## Desarrollo

\`\`\`bash
# Iniciar base de datos con Docker
docker-compose up -d

# Iniciar servidor en modo desarrollo
npm run dev
\`\`\`

## Scripts

- \`npm run dev\` - Modo desarrollo con nodemon
- \`npm run build\` - Compilar TypeScript
- \`npm start\` - Ejecutar versión compilada
- \`npm run lint\` - Verificar código con ESLint
- \`npm run lint:fix\` - Corregir errores automáticamente

## Estructura

\`\`\`
src/
├── config/          # Configuración (DB, env, constantes)
├── models/          # Modelos de Mongoose
├── routes/          # Rutas de Express
└── server.ts        # Punto de entrada
\`\`\`
EOF

echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🔧 Configurando Git hooks..."
./setup-hooks.sh

echo ""
echo "✨ ¡Proyecto configurado exitosamente! ✨"
echo ""
echo "📍 Ubicación: $PROJECT_PATH"
echo ""
echo "🎯 Próximos pasos:"
echo "   1. cd $PROJECT_PATH"
echo "   2. docker-compose up -d    # Iniciar MongoDB"
echo "   3. npm run dev             # Iniciar servidor"
echo ""
