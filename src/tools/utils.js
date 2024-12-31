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

// Exportando DIR para manejo de directorios y accesos
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname