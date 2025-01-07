import express from 'express'

const router = express.Router()

// Ruta Inicial de Indexación de la Página de inicio
router.get("/", (req,res)=>{
    res.render('index')
})
router.get("/login", (req,res)=>{
    res.render('login')
})

// Exportando ruta
export default router