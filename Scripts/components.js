var accessToken = localStorage.getItem("accessToken");
var shipsArray = [];

// ships api call
async function usersApiCall() {
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ships", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    var data = await response.json();
    console.log(data);
    shipsArray = data;
    if (response.ok) {
      var str = `<option value="" disabled selected>Select Ship Id</option>`;
      shipsArray.forEach((element) => {
        str += `
                <option value="${element.id}">${element.name} :  ${element.id}</option>
            `;
      });
      document.getElementById("ship-id-dropdown").innerHTML = "";
      document.getElementById("ship-id-dropdown").innerHTML = str;
      document.getElementById("ship-ids").innerHTML = "";
      document.getElementById("ship-ids").innerHTML = str;
    } else {
      document.getElementById("ship-id-dropdown").innerHTML = "";
      alert(JSON.stringify(response.error));
    }
  } catch (error) {
    console.log(error);
  }
}
usersApiCall();

// Ship input value
document
  .getElementById("ship-id-dropdown")
  .addEventListener("change", function () {
    var inputValue = this.value;

    componentsApiCall(inputValue);
  });

// Components api call
async function componentsApiCall(inputValue) {
  try {
    var response = await fetch(
      "http://127.0.0.1:8000/api/ship-components/filter/" + inputValue,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    var data = await response.json();

    if (response.ok) {
      displayComponents(data);
    } else {
      alert(JSON.stringify(response.error));
    }
  } catch (error) {
    console.log(error);
  }
}

// Displaying the ship components
function displayComponents(components) {
  var str = ``;
  components.forEach((component) => {
    str += `
        <div class="py-1">
          <tr>
            <td >${component.id}</td>
            <td >${component.name}</td>
            <td >${component.serial_number}</td>
            <td >${foramatedDate(component.installation_date)}</td>
            <td >${foramatedDate(component.last_maintenance_date)}</td>
            <td class="d-flex align-items-center justify-content-end">
              <!-- update component -->
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#update-component-${component.id}">
                <i class="bi bi-pencil-square p-2"></i>
              </button>

              <!--update componet Modal -->
              <div class="modal fade" id="update-component-${component.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                      <h1 class="modal-title fs-5 " id="exampleModalLabel">Update Component</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column gap-3">
                        <div>
                            <label for="component-name-${component.id}" class="form-label">COMPONENT NAME</label>
                            <input type="text" id="component-name-${component.id}" class="form-control" placeholder="Example: Radar System">
                        </div>
                        <div>
                            <label for="serial-number-${component.id}" class="form-label">SERIAL NUMBER</label>
                            <input type="text" id="serial-number-${component.id}" class="form-control" placeholder="Example: RAD-2025-004">
                        </div>
                        <div>
                            <label for="installed-date-${component.id}" class="form-label">INSTALLED DATE</label>
                            <input type="date" id="installed-date-${component.id}" class="form-control" >
                        </div>
                        <div>
                            <label for="last-maintenance-date-${component.id}" class="form-label">LAST MAINTENANCE DATE</label>
                            <input type="date" id="last-maintenance-date-${component.id}" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary" onclick="updateComponent(${component.id},${component.ship})">Update</button>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
                <i class="bi bi-trash3-fill delete"></i>
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
                      <button type="button" class="btn btn-danger" onclick="deleteComponent(${
                        component.id
                      })">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              
            </td>
          </tr>
        </div>
        `;
    document.getElementById("table-body").innerHTML = "";
    document.getElementById("table-body").innerHTML = str;
  });
}
function foramatedDate(input) {
  var date = new Date(input);

  var year =
    date.getFullYear().toString().length == 1
      ? "0" + date.getFullYear()
      : date.getFullYear();
  var month =
    date.getMonth().toString().length == 1
      ? "0" + date.getMonth()
      : date.getMonth();
  var day =
    date.getDay().toString().length == 1 ? "0" + date.getDay() : date.getDay();

  return `${year}-${month}-${day}`;
}

// post request for add new ship componet
document.getElementById("postNewShip").addEventListener("click", async () => {
  try {
    // ship details for post request
    var componentInfo = {
      name: document.getElementById("component-name").value,
      serial_number: document.getElementById("serial-number").value,
      installation_date: document.getElementById("installed-date").value,
      last_maintenance_date: document.getElementById("last-maintenance-date").value,
      ship: parseInt(document.getElementById("ship-ids").value)
    };
    console.log(componentInfo);
    
    // post api call
    var response = await fetch(
      "http://127.0.0.1:8000/api/ship-components/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(componentInfo),
      }
    );
    var data = await response.json();

    if (response.ok) {
      alert("Component Added Successfully");
    } else {
      alert(JSON.stringify(response.error));
    }
  } catch (error) {
    console.log(error);
  }
});

// Update component
function updateComponent(comId, shipId){
  var updatedComponentInfo = {
    name: document.getElementById(`component-name-${comId}`).value,
    serial_number: document.getElementById(`serial-number-${comId}`).value,
    installation_date: document.getElementById(`installed-date-${comId}`).value,
    last_maintenance_date: document.getElementById(`last-maintenance-date-${comId}`).value,
    ship: shipId
  }
  console.log(updatedComponentInfo);
  
  updateComponentApiCall(updatedComponentInfo, comId)
}

async function updateComponentApiCall(updatedComponentInfo, comId){
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ship-components/update/" + comId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(updatedComponentInfo)
    });
    var data = await response.json();
    console.log(data);

    if (response.ok) {
      alert(`Updated Successfully`)
      document.getElementById("ship-id-dropdown").value=comId
    } else {
      alert(`ship Delete requet failed`);
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete Component
async function deleteComponent(id) {
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ship-components/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    var data = await response.json();
    console.log(data);

    if (response.ok) {
      alert(`Deleted Successfully`)
      const deleteModalEl = document.getElementById("deleteModal");
      const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
      modalInstance.hide();
    } else {
      alert(`ship Delete requet failed`);
    }
  } catch (error) {
    console.log(error);
  }
}