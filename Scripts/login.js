document.getElementById("loginBtn").addEventListener("click",()=>{
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    var userCredentials ={
        username :username,
        password :password
    }
    console.log(userCredentials);
    
    // Api function
    loginApiCall(userCredentials)
})

async function loginApiCall(userCredentials){
    try {
        var response = await fetch("http://127.0.0.1:8000/api/users/login",{
            method : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userCredentials)
        })
        var data = await response.json()
    
        if(data.access){
            alert("Login Successful")
            localStorage.setItem("accessToken",data.access)
        }
    } catch (error) {
        alert("Login Failed")
    }
}

document.getElementById("passUnlock").addEventListener("click",()=>{
    var unLock = document.getElementById("passUnlock");
    var lock = document.getElementById("passLock");
    unLock.classList.add("d-none")
    lock.classList.remove("d-none")

    var pass = document.getElementById("password");
    pass.type="text";

})

document.getElementById("passLock").addEventListener("click",()=>{
    var unLock = document.getElementById("passUnlock");
    var lock = document.getElementById("passLock");
    unLock.classList.remove("d-none")
    lock.classList.add("d-none")

    var pass = document.getElementById("password");
    pass.type="password";
})
