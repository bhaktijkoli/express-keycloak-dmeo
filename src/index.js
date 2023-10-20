require('dotenv').config()
const Keycloak = require('keycloak-connect');
const express = require('express')
const session = require('express-session');
const app = express()
const port = process.env.PORT || 3000

const memoryStore = new session.MemoryStore();

var sessionStore = {
  secret: 'demo',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
  cookie: {
    secure: false,
  }
}

const keycloak = new Keycloak({
  store: memoryStore
});

app.use(session(sessionStore))

app.use(keycloak.middleware());


app.get('/', (req, res) => {
  res.send('Open Endpoint')
})

app.all('/callback', (req, res) => {
  res.send('Callback Endpoint')
})

app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('Protected Endpoint')
})

app.listen(port, () => {
  console.log(`Demo app listening on port ${port}`)
})