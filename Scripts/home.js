
async function dashBoard() {
    try {
        var response = await fetch("http://127.0.0.1:8000/api/dashboard/get-info",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("accessToken")
            }
        })
        var dash = await response.json();

        if(response.ok){
            console.log(dash);
            
            displayDashboardInfo(dash)
        }
        else{
            console.log(dash.error)
        }

    } catch (error) {
        console.log(error);
    }
}

dashBoard()

function displayDashboardInfo(info){
    document.getElementById("total-ships").innerHTML=info.total_ships
    document.getElementById("components").innerHTML=info.expired_components
    document.getElementById("jobs-in").innerHTML=info.jobs.completed
    document.getElementById("jobs-com").innerHTML=info.jobs.inprogress
}