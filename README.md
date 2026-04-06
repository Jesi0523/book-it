# BookIT!

## Integrantes
- Luz Paola García Rodríguez
- Sofia Alejandra Alanís Ayala
- Aylin Celeste Rodríguez Cavazos
- Itzel Anahí Pérez Morales

## Descripción de la aplicación
Book IT! es una plataforma digital diseñada para optimizar la gestión de citas. Permite a los clientes agendar servicios en tiempo real, mientras ofrece a los dueños de negocios herramientas para administrar su personal, horarios y obtener reportes estratégicos para la toma de decisiones.

## Descripción de las carpetas contenidas

### Backend

- **src**: Código fuente
  
    - **config**: Conexion a la BD y logger
 
    - **controllers**: Controladores de la api
 
    - **helpers**: Funciones auxiliares
 
    - **middleware**: Middleware para logs y validación de datos
 
    - **models**: Modelo de cada collection
 
    - **routes**: Routers de cada api
 
    - **seeder**: Llena la BD con datos prueba
 
    - **validators**: Validadores de datos

### Frontend

- **src**: Código fuente
  
    - **assets**: Contenido multimedia

    - **api**: Conectar el frontend con la carpeta de backend
 
    - **components**: Componentes reutilizables

    - **context**: Guarda el estado del usuario, es decir, si esta logueado o no
 
    - **layouts**: Plantillas que se pueden usar en varias páginas
 
    - **pages**: Páginas principales de la aplicación
 
    - **routes**: Ruta de navegación de cada página
 
    - **styles**: Estilos globales
 
    - **theme**: Configuración de estilos y tema para MUI
  
## Backend & Base de Datos

### Configuración del Entorno

1.  **Entra a la carpeta del backend**

    ```bash
    cd backend
    ```

2.  **Instala las dependencias**

    ```bash
    npm install express mongoose dotenv cors express-validator jsonwebtoken bcryptjs winston cookie-parser

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
    npm install react-router-dom react-hot-toast @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-hook-form zod @hookform/resolvers jwt-decode swiper @mui/x-date-pickers dayjs recharts
    ```

3.  **Configura las Variables de Entorno**

    Crea un archivo `.env` dentro de la carpeta **frontend** y usa las variables que se encuentran en `.envEjemplo`.

### Ejecución Local
   
1. Entra en la carpeta de **frontend** y ejecuta:
   
   ```bash
    npm run dev
   ```
   - Dale Ctrl + Click al que dice **http://localhost:5173/**
   - Si quieres terminar la ejecución dale Ctrl + C
