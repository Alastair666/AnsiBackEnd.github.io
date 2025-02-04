import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Helper de Handlebars
export function ifEquals(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
}
// Incrementa 1 valor
export function inc(value) {
    return parseInt(value) + 1;
}
// Valida objetos
export function deepEqual(obj1, obj2) {
    // Mismos objetos
    if (obj1 === obj2)
        return true 
    // No objetos o null
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false 
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    // Diferentes números de claves
    if (keys1.length !== keys2.length) return false 
    for (let key of keys1) {
        // Claves faltantes o valores no coincidentes
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
    }
    return true;
}

// Exportando DIR para manejo de directorios y accesos
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname