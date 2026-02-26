# BookIT!

## Backend & Base de Datos

### Configuración del Entorno

1. **Entra a la carpeta del backend**
    ```bash
    cd backend
    ```

2. **Instala las dependencias**
    ```bash
    npm install express mongoose dotenv cors
    ```

3. **Instalar el seeder (si se quiere usar)**
    ```bash
    npm install @faker-js/faker --save-dev
    ```

4. **Configura las Variables de Entorno**

   Crea un archivo `.env` dentro de la carpeta **backend** (pueden usar `.envEjemplo` como base).

### Ejecución Local
   
   1. Si instalaste el seeder y lo quieres usar, abre otra terminal, entra en la carpeta de **backend** y ejecuta:
   ```bash
    node seeder/seeder.js
   ```



## Frontend