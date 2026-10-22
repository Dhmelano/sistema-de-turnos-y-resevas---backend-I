Sistema backend de turnos y reservas

API backend para gestionar servicios y reservas de turnos.

Tecnologías:

Node.js (v22.x LTS)
Express
MongoDB Atlas & Mongoose
Socket.io
Zod
ES Modules (ESM) con import / export

Variables de entorno : 

PORT
APP_NAME
ENV
MONGO_DB_URI

Metodos:

getServices(): Obtener la lista completa.
getServiceById(id): Busca un servicio por id
addService(data): Crear un nuevo servicio pasando los campos obligatorios.
updateService(id, updatedData): Actualiza propiedades sin alterar el id.
deleteService(id): Elimina un servicio existente.

Iniciar en modo desarrollo (recarga automática):

npm run dev
Ejecuta node --watch src/server.js para reiniciar el servidor automáticamente ante cambios.

Por defecto, el servidor se iniciará en http://localhost:8080/.

Iniciar en producción / modo estándar:

npm start
Ejecuta node src/server.js.