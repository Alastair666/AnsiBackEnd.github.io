async function authUser(loginArray) {
    const login = { email: loginArray[0], clave_acceso: loginArray[1] }
    try {
        //console.log(login)
        const response = await fetch(`/api/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        //Validando Respuesta
        const jsonRes = await response.json()
        //console.log(jsonRes)
        if (response.ok){
            if (jsonRes.status === "success"){
                const token = getCookie('jwt')
                if (token) {
                    document.cookie = `jwt=${token}; secure; sameSite=Strict`
                    window.location.href = '/dashboard'
                }
                else
                    notificaMsj(`Can't get token access`, 'Error', 4)
            }
            else
                notificaMsj(`Sign In Errors: ${jsonRes.error}`, 'Error', 4)
        }
        else
            notificaMsj(`The user ${login.email} was not found`, 'Error', 4)
    }
    catch (error) {
        notificaMsj(`The user ${login.email} wasn't registered, see the console for more details`, 'Error', 4)
        console.error(`There are problems with the registration method: `, error)
    }
}

// Creando evento de Inicio de Sesión
document.getElementById("btnSignIn").addEventListener("click", async (event)=>{
    const txtEm = document.getElementById("txtEmail").value
    const txtPs = document.getElementById("txtPsswrd").value
    // Validando Datos
    if (!txtEm || !txtPs)
        notificaMsj(`Complete the login fields`, 'Error', 4)
    else
        await authUser([txtEm, txtPs])
})