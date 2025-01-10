//  Método que muestra la notificación
async function notificaMsj(texto, tipo, segundos){
    let estilo = ""
    switch (tipo){
        case "Correcto":
            estilo = "#008959"
            break;
        case "Alerta":
            estilo = "#FFBE00"
            break;
        case "Error":
            estilo = "#F41B35"
            break;
        default:
        case "Info":
            estilo = "#0070FC"
            break;
    }
    //console.warn(`El tipo es: '${tipo}' por lo tanto el estilo es '${estilo}'`)
    //Mostrando notificación
    Toastify({
        text: texto,
        duration: (parseInt(segundos) || 0) * 1000,
        close: true,
        style: { background: estilo }
    }).showToast()
}
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) 
            return decodeURIComponent(cookieValue);
    }
    return null;
}