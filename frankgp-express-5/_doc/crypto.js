const crypto = require('crypto');

// Clave secreta y vector de inicialización (deben mantenerse seguros)
const SECRET_KEY = crypto.randomBytes(32); // 256 bits para AES-256
const IV = crypto.randomBytes(16); // 128 bits

// Función para encriptar
function encryptToken(token) {
  const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, IV);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: IV.toString('hex'),
    content: encrypted,
  };
}

// Función para desencriptar
function decryptToken(encryptedToken) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    SECRET_KEY,
    Buffer.from(encryptedToken.iv, 'hex')
  );
  let decrypted = decipher.update(encryptedToken.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// ✅ Ejemplo de uso
const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; // JWT de ejemplo
const encrypted = encryptToken(myToken);
console.info('Encriptado:', encrypted);

const decrypted = decryptToken(encrypted);
console.info('Desencriptado:', decrypted);
