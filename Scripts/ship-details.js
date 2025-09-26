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
      document.getElementById("created").innerHTML=foramatedDate(shipInfo.created_at)
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

function foramatedDate(input){
  var date = new Date(input)

  var year = date.getFullYear().toString().length == 1 ? '0'+date.getFullYear() : date.getFullYear()
  var month = date.getMonth().toString().length == 1 ? '0'+date.getMonth() : date.getMonth()
  var day = date.getDay().toString().length == 1 ? '0'+date.getDay() : date.getDay()

  return `${year}-${month}-${day}`
}

// put the ship details in update details form
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
    status: document.getElementById("form-status").value,
    user: localStorage.getItem("userId")
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
      getShipDetails()
    }
    else{
      alert(JSON.stringify(response.error))
    }
  }
  catch(error){
    console.log(error);
    
  }
}

//components list
async function shipComponents(){
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ship-components/filter/"+id,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken
      }
    })
  
    var components = await response.json()

    if(response.ok){
      displayComponents(components)
    }
    else{
      console.log(response.error);
    }

  } catch (error) {
    console.log(error);
    
  }
}
shipComponents()
function displayComponents(components){
  var row = ``
  components.forEach(element => {
    row+=`
      <tr>
        <td>${element.serial_number}</td>
        <td>${element.name}</td>
        <td>${foramatedDate(element.installation_date)}</td>
        <td>${foramatedDate(element.last_maintenance_date)}</td>
      </tr>
    `
  })
  document.getElementById("com-table-body").innerHTML=row
}

//Maintenance history
async function shipMaintenanceHistory(){
  try {
    var response = await fetch("http://127.0.0.1:8000/api/maintenance-jobs/filter?ship="+id,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken
      }
    })
  
    var history = await response.json()

    if(response.ok){
      displayHistory(history)
    }
    else{
      console.log(response.error);
    }

  } catch (error) {
    console.log(error);
    
  }
}
shipMaintenanceHistory()
function displayHistory(history){
  var row = ``
  history.forEach(element => {
    row+=`
      <tr>
        <td>${element.type}</td>
        <td>${element.priority}</td>
        <td>${element.status}</td>
        <td>${element.assigned_engineer}</td>
      </tr>
    `
  })
  document.getElementById("main-table-body").innerHTML=row
}