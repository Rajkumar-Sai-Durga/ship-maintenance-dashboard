var allShips = [];
var atPortShips = [];
var underMaintenanceShips = [];
var activeShips = [];
var accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

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


document.getElementById("all-ships").addEventListener("click", () => {
  document.getElementById("all-ships").classList.add("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(allShips);
});

document.getElementById("at-port").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.add("search-btn-styles");

  displayShips(atPortShips);
});

document.getElementById("under-maintenance").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.add("search-btn-styles");
  document.getElementById("active").classList.remove("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(underMaintenanceShips);
});

document.getElementById("active").addEventListener("click", () => {
  document.getElementById("all-ships").classList.remove("search-btn-styles");
  document
    .getElementById("under-maintenance")
    .classList.remove("search-btn-styles");
  document.getElementById("active").classList.add("search-btn-styles");
  document.getElementById("at-port").classList.remove("search-btn-styles");

  displayShips(activeShips);
});

// Displaying the ships
function displayShips(ships) {
  var str = ``;
  ships.forEach((ship) => {
    str += `
        <div class="py-1">
          <tr>
            <td class="${ship.status}">${ship.id}</td>
            <td class="${ship.status}">${ship.name}</td>
            <td class="${ship.status}">${ship.imo_number}</td>
            <td class="${ship.status}">${ship.flag}</td>
            <td class="${ship.status}">${ship.status}</td>
            <td class="${ship.status}">${ship.updated_at}</td>
            <td class="${ship.status}">${ship.created_at}</td>
            <td class="text-end ${ship.status}"><button class="btn btn-primary" onclick="shipDetails(${ship.id})">More</button></td>
          </tr>
        </div>
        `;
    document.getElementById("table-body").innerHTML=""
    document.getElementById("table-body").innerHTML = str;
  });
}

displayShips(allShips);

// new ships modal
async function userIds(){
  try {
    // api call for get the user ids
    var response = await fetch("http://127.0.0.1:8000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
    });
    var data = await response.json();
    var users = data.data
    console.log(users);
    
    var option = `<option value="">What is the ship status</option>`;
    users.forEach((userInfo) => {
      option += `
        <option value="${userInfo.id}">${userInfo.id} : ${userInfo.username}</option>
      `;
    });
    document.getElementById("users-ids").innerHTML = option;
  } catch (error) {
    console.log(error);
  }
};
userIds();

// post request for add new ship
document.getElementById("postNewShip").addEventListener("click", async () => {
  try {
    // ship details for post request
    var shipInfo = {
      name: document.getElementById("ship-name").value,
      imo_number: document.getElementById("imo-number").value,
      flag: document.getElementById("flag").value,
      status: document.getElementById("status").value,
      user: document.getElementById("users-ids").value,
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
    } else {
      alert(JSON.stringify(response.error));
    }
  } catch (error) {
    console.log(error);
  }
});

// Direct to Ship details page
function shipDetails(id) {
  window.location.href = "../view/ship-details.html?id=" + id;
}
