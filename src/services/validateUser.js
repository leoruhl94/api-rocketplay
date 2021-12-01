const validateUser = (name, password, mail, userType )=>{
    if(name && name === "") return "El nombre de usuario es requerido.";
    if(password && password.length<8) return "Ingrese una contraseña mas segura.";
    if(mail && !mail.includes("@gmail.com")) return "Ingrese un email valido(example@gmail.com).";
    if(userType && userType === "") return "El tipo de usuario es requerido.";
    return "success";
}
module.exports = validateUser;