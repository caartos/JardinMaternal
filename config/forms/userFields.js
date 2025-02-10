const userFields = [
  { label: "Nombre", fieldName: "nombre",required: true, secureTextEntry:false},
  { label: "Apellido", fieldName: "apellido", required: true, secureTextEntry:false },
  { label: "Telefono 1", fieldName: "telefono1", required: true, secureTextEntry:false },
  { label: "Telefono 2", fieldName: "telefono2", secureTextEntry:false },
  { label: "DNI", fieldName: "dni", required: true, secureTextEntry:false },
  { label: "Correo electrónico", fieldName: "mail", required: true, secureTextEntry:false },
  { label: "Contraseña", fieldName: "contraseña", required: true,secureTextEntry:true },
];

export default userFields