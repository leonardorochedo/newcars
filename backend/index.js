const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON Response
app.use(express.json())

// Solve CORS
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

// Public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const CarRoutes = require('./routes/CarRoutes')
app.use('/users', UserRoutes)
app.use('/cars', CarRoutes)

app.listen(5000)