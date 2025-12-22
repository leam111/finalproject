
const bcrypt = require('bcryptjs'); 
const password = 'admin123';
const hashed = bcrypt.hashSync(password, 10);  

console.log('Hashed password:', hashed);
