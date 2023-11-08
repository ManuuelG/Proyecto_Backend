## Diseño api-hospital

### Descripcion del proyecto

La aplicación permitirá gestionar usuarios (paciente o medico) junto con sus citas y/o recetas.

- El usuario tendrá un ID unico, Nombre, Edad, email, contraseña y un rol con el que se identificará como paciente o medico.

- Las citas tendran un ID unico, la fecha de la cita, el estado de la cita y una FK de usuario.

- Las recetas tendran un ID unico, fecha con la que se emite, un medicamento prescrito, el tiempo que debe tomarse y una FK de usuario.

Los pacientes, a través de la api, podrán:

- Pedir una cita.
- Consultar una cita.
- Consultar una receta.

Los medicos, además de consultar, podrán:

- Actualizar el estado de una cita (cambiar la fecha o el estado)
- Eliminar la cita. (Cuando esa cita se ha completado, por ejemplo)
- Actualizar una receta. (Cambiarle al paciente un medicamento, por ejemplo)
- Eliminar una receta. (El paciente ya está completamente sano y no necesita de una receta)

### API DESIGN

Todos los endpoint protegidos para usuarios logueados van a tener disponible información del usuario que no hay que recibir por params, query o body.

//REGISTER-LOGIN

POST /api/user/register (Registro de nuevos usuarios)
POST /api/user/login (El inicio de sesion)

//CITAS
GET user/citas (me da todas las citas de ese usuario)
GET user/citas/:citaByDate (me da las citas filtradas por mes y dia)
GET user/citas/:citaByDate/:citaById ==users== (me da la cita concreta del mes y dia filtrado)
GET user/citas/:citaByDate/:DoctorId (me da la disponibilidad del doctor)

POST user/citas/:citaByDate/:DoctorId ==users== (El paciente pide una nueva cita el dia que elija con el doctor)
POST user/citas/:citaByDate/:PacienteId/ ==users== (El doctor asigna una nueva cita el dia que elija con el paciente)
PUT user/citas/:citaByDate/:citaById/ ==doctor== (Edita una cita concreta de un dia concreto)
DELETE user/citas/:citaByDate/:citaById/ ==doctor== (Elimina una cita concreta de un dia concreto)

//RECETAS

GET user/recetas (me da todas las recetas del usuario)
GET user/recetas/:RecetaId (me da la receta concreta del usuario)

POST user/recetas/:userId/ ==doctor== (Crea una receta para un usuario concreto)
PUT user/recetas/:RecetaId/ ==doctor== (Edita una receta para un usuario concreto)
DELETE user/recetas/:RecetaId/ ==doctor== (Actualiza una receta para un usuario concreto)

### Schemas

### Users

{
name: { type: String, required: true },
lastname: { type: String, required: true },
age: Number,
Email: { type: String, unique: true },
role: { type: String, required: true },
horario: {

    diasDeLaSemana: { [String], required:true}  // (["lunes", "miércoles"])
    horasDisponibles: { [String], required:true} // (["9:00 AM", "10:30 AM"])

},
}

### Citas Paciente-Medico

{
Estado: String,
Emision: {Date, required: true},
Comentario: String,
DoctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
PacienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}

### Recetas Paciente-Medico

{
DoctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
PacienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
emision: { Date, required: true },
medicamento: { String, required: true },
duracion: { Date, required: true }
}

### Disponibilidad

Verificar disponibilidad: Crear un modelo entidad llamada horarios en mongoose que tenga:

medicoID, dias de la semana, fecha inicio y finalizacion.

Una vez hecho esto, el medico cuando loguea puede hacer un POST/user/horario para establecer sus horarios de la semana.

El paciente en su POST /citas/:citaByDate/:DoctorID/create podrá revisar si está disponible y crear la cita con exito, si no está disponible dará error y asi verificamos que no haya 2 citas en el mismo dia y la misma hora.

O

Dentro del User.Schema implementar:

horario: {

    diasDeLaSemana: [String], // (["lunes", "miércoles"])
    horasDisponibles: [String],  (["9:00 AM", "10:30 AM"])

},
