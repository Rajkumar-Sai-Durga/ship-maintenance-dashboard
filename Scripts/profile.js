
async function users() {
    try {
        var response = await fetch("http://127.0.0.1:8000/api/users",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("accessToken")
            }
        })
        var users = await response.json();

        if(response.ok){

            var userInfo =users.data.filter((item)=>item.id == localStorage.getItem("userId"))
            
            displayProfileInfo(userInfo)
        }
        else{
            alert(response.error)
        }

    } catch (error) {
        console.log(error);
    }
}

users()

function displayProfileInfo(userInfo){
    var user = userInfo[0]

    document.getElementById("profile-name").innerHTML=`${user.first_name} ${user.last_name}`
    document.getElementById("profile-email").innerHTML=user.email
    document.getElementById("profile-role").innerHTML=user.role

    document.getElementById("first-name").innerHTML=user.first_name
    document.getElementById("last-name").innerHTML=user.last_name
    document.getElementById("email").innerHTML=user.email
    document.getElementById("username").innerHTML=user.username
    document.getElementById("role").innerHTML=user.role
}