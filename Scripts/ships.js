var AllShips = [
  {
    id: 1,
    name: "Titanic",
    imo_number: "IMO9234567",
    flag: "US",
    status: "Active",
    user: 4
  },
  {
    id: 2,
    name: "Poseidon",
    imo_number: "IMO9234568",
    flag: "UK",
    status: "At port",
    user: 5
  },
  {
    id: 3,
    name: "Olympic",
    imo_number: "IMO9234569",
    flag: "CA",
    status: "Under Maintenance",
    user: 6
  },
  {
    id: 4,
    name: "Britannic",
    imo_number: "IMO9234570",
    flag: "AU",
    status: "Active",
    user: 7
  },
  {
    id: 5,
    name: "Endeavour",
    imo_number: "IMO9234571",
    flag: "US",
    status: "At port",
    user: 8
  },
  {
    id: 6,
    name: "Discovery",
    imo_number: "IMO9234572",
    flag: "DE",
    status: "Under Maintenance",
    user: 9
  },
  {
    id: 7,
    name: "Odyssey",
    imo_number: "IMO9234573",
    flag: "FR",
    status: "Active",
    user: 10
  },
  {
    id: 8,
    name: "Nautilus",
    imo_number: "IMO9234574",
    flag: "IN",
    status: "At port",
    user: 11
  },
  {
    id: 9,
    name: "Liberty",
    imo_number: "IMO9234575",
    flag: "SG",
    status: "Under Maintenance",
    user: 12
  },
  {
    id: 10,
    name: "Victory",
    imo_number: "IMO9234576",
    flag: "JP",
    status: "Active",
    user: 13
  },
  {
    id: 11,
    name: "Majestic",
    imo_number: "IMO9234577",
    flag: "CN",
    status: "At port",
    user: 14
  },
  {
    id: 12,
    name: "Enterprise",
    imo_number: "IMO9234578",
    flag: "BR",
    status: "Under Maintenance",
    user: 15
  },
  {
    id: 13,
    name: "Constellation",
    imo_number: "IMO9234579",
    flag: "ZA",
    status: "Active",
    user: 16
  },
  {
    id: 14,
    name: "Aurora",
    imo_number: "IMO9234580",
    flag: "RU",
    status: "At port",
    user: 17
  },
  {
    id: 15,
    name: "Explorer",
    imo_number: "IMO9234581",
    flag: "KR",
    status: "Under Maintenance",
    user: 18
  },
  {
    id: 16,
    name: "Challenger",
    imo_number: "IMO9234582",
    flag: "ES",
    status: "Active",
    user: 19
  },
  {
    id: 17,
    name: "Columbia",
    imo_number: "IMO9234583",
    flag: "IT",
    status: "At port",
    user: 20
  },
  {
    id: 18,
    name: "Pacific",
    imo_number: "IMO9234584",
    flag: "NL",
    status: "Under Maintenance",
    user: 21
  },
  {
    id: 19,
    name: "Atlantic",
    imo_number: "IMO9234585",
    flag: "GR",
    status: "Active",
    user: 22
  },
  {
    id: 20,
    name: "Oceanic",
    imo_number: "IMO9234586",
    flag: "NO",
    status: "At port",
    user: 23
  }
]

// Categories the ships based on status
var atPortShips=[]
var underMaintenanceShips=[]
var activeShips=[]

AllShips.forEach((ship)=>{
    if(ship.status == "Active"){
        activeShips.push(ship)
    }
    else if(ship.status == "At port"){
        atPortShips.push(ship)
    }
    else{
        underMaintenanceShips.push(ship)
    }
})

document.getElementById("all-ships").addEventListener("click",()=>{
    document.getElementById("all-ships").classList.add("search-btn-styles")
    document.getElementById("under-maintenance").classList.remove("search-btn-styles")
    document.getElementById("active").classList.remove("search-btn-styles")
    document.getElementById("at-port").classList.remove("search-btn-styles")

    displayShips(AllShips);
    console.log(AllShips);
    
})
document.getElementById("at-port").addEventListener("click",()=>{
    document.getElementById("all-ships").classList.remove("search-btn-styles")
    document.getElementById("under-maintenance").classList.remove("search-btn-styles")
    document.getElementById("active").classList.remove("search-btn-styles")
    document.getElementById("at-port").classList.add("search-btn-styles")

    displayShips(atPortShips);
    console.log(atPortShips);
})
document.getElementById("under-maintenance").addEventListener("click",()=>{
    document.getElementById("all-ships").classList.remove("search-btn-styles")
    document.getElementById("under-maintenance").classList.add("search-btn-styles")
    document.getElementById("active").classList.remove("search-btn-styles")
    document.getElementById("at-port").classList.remove("search-btn-styles")

    displayShips(underMaintenanceShips);
    console.log(underMaintenanceShips);
    
})
document.getElementById("active").addEventListener("click",()=>{
    document.getElementById("all-ships").classList.remove("search-btn-styles")
    document.getElementById("under-maintenance").classList.remove("search-btn-styles")
    document.getElementById("active").classList.add("search-btn-styles")
    document.getElementById("at-port").classList.remove("search-btn-styles")

    displayShips(activeShips);
    console.log(activeShips);
    
})

// new ships modal
document.getElementById("users").addEventListener("click",async ()=>{
  try {
    // api call for get the user ids
    // var response = await fetch("",{
    //   method: "GET",
    //   headers:{
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer"+localStorage.getItem(accessToken)
    //   }
    // })
    // var users = await response.json()
    var users =[
      {
        id:1,
        name:"sai",
        role:"engineer"
      },
      {
        id:2,
        name:"Raju",
        role:"engineer"
      },
      {
        id:3,
        name:"Kumar",
        role:"Admin"
      },
      {
        id:4,
        name:"Durga",
        role:"engineer"
      }
    ]
    var option =`<option value="">What is the ship status</option>`
    users.forEach((userInfo)=>{
      option+=`
        <option value="${userInfo.id}">${userInfo.id} : ${userInfo.name}</option>
      `
    })
    document.getElementById("users").innerHTML=option
  } catch (error) {
    console.log(error);
  }
})

// post request for add new ship
document.getElementById("postNewShip").addEventListener("click",async ()=>{
  try {
    // ship details for post request
    var shipInfo={
      name: document.getElementById("ship-name").value,
      imo_number: document.getElementById("imo-number").value,
      flag: document.getElementById("flag").value,
      status: document.getElementById("status").value,
      user: document.getElementById("users").value
    }
  
    // post api call
    // var response = await fetch("",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json",
    //     "Authorization": "Bearer"+localStorage.getItem(accessToken)
    //   },
    //   body:JSON.stringify(shipInfo)
    // })
    // var data = await response.json()

    // if(data){
    //   alert("Ship Details Added Successfully")
    // }
  }
  catch (error) {
    console.log(error)
  }
})

// Displaying the ships
function displayShips(ships){
    var str=``
    ships.forEach((ship)=>{
        str+=`
        <div class="py-1">
            <tr class="record">
                <td class="${ship.status}" onclick="shipDetails(${ship.id})">${ship.name}</td>
                <td class="${ship.status}" onclick="shipDetails(${ship.id})">${ship.imo_number}</td>
                <td class="${ship.status}" onclick="shipDetails(${ship.id})">${ship.flag}</td>
                <td class="${ship.status}" onclick="shipDetails(${ship.id})">${ship.status}</td>
                <td class="d-flex gap-4 justify-content-end ${ship.status}"></td>
            </tr>
        </div>
        `
        document.getElementById("table-body").innerHTML=str
    })
}

displayShips(AllShips)

// Direct to Ship details page
function shipDetails(id){
    window.location.href="../view/ship-details.html?id="+id;
}

