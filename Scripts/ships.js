var allShips = [];
var atPortShips = [];
var underMaintenanceShips = [];
var activeShips = [];
var accessToken = localStorage.getItem("accessToken");

// Ships api call
async function shipApiCall() {
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ships", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
    });
    var data = await response.json();

    
    if (response.ok) {
      displayShips(data);
      allShips = data;
    }

    // Categories the ships based on status
    allShips.forEach((ship) => {
      if (ship.status == "Active") {
        activeShips.push(ship);
      } else if (ship.status == "At port") {
        atPortShips.push(ship);
      } else {
        underMaintenanceShips.push(ship);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
shipApiCall();

// Displaying the ships
function displayShips(ships) {
  var str = ``;
  ships.forEach((ship) => {
    str += `
        <div class="py-1">
          <tr>
            <td >${ship.id}</td>
            <td >${ship.name}</td>
            <td >${ship.imo_number}</td>
            <td >${ship.flag}</td>
            <td >${foramatedDate(ship.updated_at)}</td>
            <td >${foramatedDate(ship.created_at)}</td>
            <td><p class="${ship.status} d-inline">${ship.status}</p></td>
            <td class="text-end">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
                <i class="bi bi-trash3-fill delete p-2"></i>
              </button>
              <!-- Modal -->
              <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content p-4">
                    <div class="modal-body p-0 mb-4">
                      <h5 class="mb-0 text-start">ARE YOU SURE?</h5>
                    </div>
                    <div class="modal-footer border-top-0 p-0 justify-content-start">
                      <button type="button" class="btn btn-secondary ms-0" data-bs-dismiss="modal">No</button>
                      <button type="button" class="btn btn-danger" onclick="deleteShip(${ship.id})">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <i class="bi bi-three-dots-vertical p-2 more" onclick="shipDetails(${ship.id})"></i>
            </td>
          </tr>
        </div>
        `;
    document.getElementById("table-body").innerHTML=""
    document.getElementById("table-body").innerHTML = str;
  });

}
function foramatedDate(input){
  var date = new Date(input)

  var year = date.getFullYear().toString().length == 1 ? '0'+date.getFullYear() : date.getFullYear()
  var month = date.getMonth().toString().length == 1 ? '0'+date.getMonth() : date.getMonth()
  var day = date.getDay().toString().length == 1 ? '0'+date.getDay() : date.getDay()

  return `${year}/${month}/${day}`
}

// All the ships List 
document.getElementById("all-ships").addEventListener("click", () => {
  document.getElementById("all-ships").classList.add("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(allShips);
});

// At port Statused ship list
document.getElementById("at-port").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.add("search-btn-styles");

  displayShips(atPortShips);
});

// Undermaintenance Statused ship list
document.getElementById("under-maintenance").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.add("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(underMaintenanceShips);
});

// Active Statused ship list
document.getElementById("active").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.add("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(activeShips);
});

// post request for add new ship
document.getElementById("postNewShip").addEventListener("click", async () => {
  try {
    // ship details for post request
    var shipInfo = {
      name: document.getElementById("ship-name").value,
      imo_number: document.getElementById("imo-number").value,
      flag: document.getElementById("flag").value,
      status: document.getElementById("status").value,
      user: localStorage.getItem("userId"),
    };

    // post api call
    var response = await fetch("http://127.0.0.1:8000/api/ships/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify(shipInfo),
    });
    var data = await response.json();

    if (response.ok) {
      alert("Ship Details Added Successfully");
      window.location.href="../view/ships.html"
    } else {
      alert(JSON.stringify(response.error));
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete ship functionality
async function deleteShip(id){
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ships/delete/"+id,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+accessToken
      }
    })
    var data = await response.json()
    console.log(data);
    
    if(data){
      window.location.href="../view/ships.html"
    }
    else{
      alert(`ship Delete requet failed`)
    }
  } catch (error) {
    console.log(error);
    
  }
}

// Direct to Ship details page
function shipDetails(id) {
  window.location.href = "../view/ship-details.html?id=" + id;
}
