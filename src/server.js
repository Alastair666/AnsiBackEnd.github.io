import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import connectDB from './config/database.config.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
// Vistas de la aplicación
import viewsRouter from './routes/views.route.js'
// Endpoints de la API
import userRouter from './routes/users.route.js'
import profileRouter from './routes/profile.route.js'
import catalogRouter from './routes/catalog.route.js'
import districtRouter from './routes/district.route.js'
import cpRouter from './routes/cp.route.js'
import addressRouter from './routes/address.route.js'
//Configuración Inicial
import __dirname, { ifEquals, inc } from './utils.js'
import { serve, setup } from '../src/tools/swagger.js'


// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' });
connectDB()
// Configurando Server
const app = express();
const PORT = process.env.PORT || 8080

// Configurar Handlebars para lectura de contenido de los endpoints
const hbs = create({
    runtimeOptions: {
        allowedProtoProperties: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        ifEquals,
        inc
    }
});
app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configurando Middlewares para endpoints
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Utilizar recursos estaticos
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
// Utilizar recursos de autenticación
initializePassport()
app.use(passport.initialize())

// Enlazando rutas para endpoints
app.use('/', viewsRouter)
app.use('/api-docs', serve(), setup())
app.use('/api/profiles', profileRouter)
app.use('/api/users', userRouter)
app.use('/api/catalog', catalogRouter)
app.use('/api/district', districtRouter)
app.use('/api/cp', cpRouter)
app.use('/api/address', addressRouter)

// Ejecutando Servidor
app.listen(PORT, ()=>{
    console.clear()
    console.log(`Server running on port ${PORT}`)
})