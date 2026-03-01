# BookIT!

## Backend & Base de Datos

### Configuración del Entorno

1.  **Entra a la carpeta del backend**

    ```bash
    cd backend
    ```

2.  **Instala las dependencias**

    ```bash
    npm install express mongoose dotenv cors express-validator jsonwebtoken bcryptjs body-parser

    npm install -D nodemon concurrently
    ```

3.  **Instalar el seeder (OPCIONAL)**

    ```bash
    npm install @faker-js/faker --save-dev
    ```

4.  **Configura las Variables de Entorno**

    Crea un archivo `.env` dentro de la carpeta **backend** (pueden usar `.envEjemplo` como base).

5.  **Para levantar el servidor en modo desarrollo**

    ```bash
    npm run server
    ```

    Deberás ver los siguientes mensajes:

    ```bash
    Intentando conectar a Atlas...
    Servidor corriendo en el puerto 5000
    -- MongoDB conectado --
    ```

### Ejecución Local

1. Si instalaste el seeder y lo quieres usar, abre otra terminal, entra en la carpeta de **backend** y ejecuta:

```bash
 node seeder/seeder.js
```

## Frontend

### Configuración del Entorno

1. **Entra a la carpeta del frontend**

    ```bash
    cd frontend
    ```

2. **Instala las dependencias**
    ```bash
    npm install react-router-dom react-hot-toast @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-hook-form zod @hookform/resolvers jwt-decode
    ```

### Ejecución Local

1. Entra en la carpeta de **frontend** y ejecuta:

```bash
 npm run dev
```

- Dale Ctrl + Click al que dice **http://localhost:5173/**
- Si quieres terminar la ejecución dale Ctrl + C
