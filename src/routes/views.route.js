import express from 'express'
import { passportCall } from '../middleware/auth.js'

const router = express.Router()

// Ruta Inicial de Indexación de la Página de inicio
router.get("/dashboard", passportCall('jwt'), (req,res)=>{
    res.render('dashboard', { title: 'Dashboard' })
})
router.get("/login", (req,res)=>{
    res.render('login', { title: 'SIGESS Access' })
})

// Exportando ruta
export default router