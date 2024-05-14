console.log("Admin")

const formRegister = document.querySelector(".formRegister");


document.getElementsByTagName("button")[0].addEventListener("click", () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/registro"
    console.log("funciona")
})

document.addEventListener("DOMContentLoaded", () => {    

    formRegister.addEventListener("submit", e => {
        e.preventDefault();        

        document.location.href = ("/index", replace= "/") 
        console.log("pagina principal")
    })})