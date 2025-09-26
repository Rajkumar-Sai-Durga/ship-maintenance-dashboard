var queryString = window.location.search;
var para = new URLSearchParams(queryString)
var id = para.get("id")
var accessToken =localStorage.getItem("accessToken")


var ship={}
// Getting ship Details
async function getShipDetails(){
  try{
    var response = await fetch("http://127.0.0.1:8000/api/ships/"+id,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken
      }
    })
  
    var shipInfo = await response.json()

    if(response.ok){
      document.getElementById("ship-name").innerHTML=shipInfo.name
      document.getElementById("flag").innerHTML=shipInfo.flag
      document.getElementById("created").innerHTML=shipInfo.created_at
      document.getElementsByClassName("imo-number")[0].innerHTML=shipInfo.imo_number
      document.getElementsByClassName("imo-number")[1].innerHTML=shipInfo.imo_number
      var sta = document.getElementById("ship-status")
      sta.innerHTML=shipInfo.status
      var classname = shipInfo.status
      sta.setAttribute("class",classname)
      ship=shipInfo;
    }
    else{
      alert(JSON.stringify(response.error))
    }
  }
  catch(error){
    console.log(error);
    
  }
}
getShipDetails()

document.getElementById("putDetails").addEventListener("click",()=>{
  document.getElementById("form-ship-name").value=ship.name,
  document.getElementById("form-imo-number").value=ship.imo_number,
  document.getElementById("form-flag").value=ship.flag,
  document.getElementById("form-status").value=ship.status
})


// Update ship functionality
document.getElementById("updateShip").addEventListener("click",()=>{
  var shipInfo={
    name: document.getElementById("form-ship-name").value,
    imo_number: document.getElementById("form-imo-number").value,
    flag: document.getElementById("form-flag").value,
    status: document.getElementById("form-status").value
  }
  updateShipDetails(shipInfo)
})
async function updateShipDetails(shipInfo){
  console.log(shipInfo);
  
  try{
    var response = await fetch("http://127.0.0.1:8000/api/ships/update/"+id,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken
      },
      body:JSON.stringify(shipInfo)
    })
  
    var shipInfo = await response.json()

    if(response.ok){
      alert("Ship Details Updated Successfully")
      window.location.href="../views/ship-details.html"
    }
    else{
      alert(JSON.stringify(response.error))
    }
  }
  catch(error){
    console.log(error);
    
  }
}

