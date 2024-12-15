
const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para procesar cuerpos JSON
app.use(express.json());

// Simulando usuarios para el ejemplo
const usuarios = [
  { id: 1, email: 'test@example.com', password: '123456' },
  { id: 2, email: 'user@example.com', password: 'password' }
];

// Ruta para recuperar contraseña
app.post('/recuperar-contraseña', (req, res) => {
  const { email } = req.body;
  const usuario = usuarios.find(user => user.email === email);
  if (usuario) {
    // Aquí iría la lógica para enviar un enlace de recuperación
    res.json({ message: 'Se ha enviado un enlace de recuperación de contraseña a tu correo.' });
  } else {
    res.status(404).json({ message: 'Correo no encontrado.' });
  }
});

// Ruta principal para prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo...');
});

// Configura el puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
