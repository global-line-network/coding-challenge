const express = require('express');
const UsersApi = require('./routes/users');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(new UsersApi());

const server = app.listen(PORT, () => {
    console.log(`gln-backend is running @ ${PORT}`);
});

module.exports = server;