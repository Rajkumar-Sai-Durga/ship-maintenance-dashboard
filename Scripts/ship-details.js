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

function activeBtn(para){
  document.getElementById("components-details-btn").classList.remove("btn-style")
  document.getElementById("components-details").classList.remove("btn-style")
  document.getElementById("job-details-btn").classList.remove("details")
  document.getElementById("job-details").classList.remove("details")

  switch(para){
    case "com":
      document.getElementById("components-details-btn").classList.add("btn-style")
      document.getElementById("job-details-btn").classList.remove("btn-style")
      document.getElementById("job-details").classList.add("details")
      document.getElementById("components-details").classList.remove("details")
      break

    case "job":
      document.getElementById("job-details-btn").classList.add("btn-style")
      document.getElementById("components-details-btn").classList.remove("btn-style")
      document.getElementById("components-details").classList.add("details")
      document.getElementById("job-details").classList.remove("details")
      break
  }
}
var accessToken = localStorage.getItem("accessToken");

componentsApiCall(id);
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
    document.getElementById("com-table-body").innerHTML = "";
    document.getElementById("com-table-body").innerHTML = str;
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
      ship: parseInt(id)
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



// Ship input value

 function searchValues() {
    var priority =document.getElementById("priority-dropdown").value
    var status =document.getElementById("status-dropdown").value

    historyApiCall(priority,status);
  };

  searchValues()

// Search history api call
async function historyApiCall(priority,status) {
    var url = `http://127.0.0.1:8000/api/maintenance-jobs/filter?ship_id=${id}&priority=${priority}&status=${status}`
    
  try {
    var response = await fetch(
      url,
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
      displayHistory(data);
    } else {
      alert(JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
}

// Displaying the Maintenance history
function displayHistory(history) {
  var str = ``;
  history.forEach((record) => {
    str += `
        <div class="py-1">
          <tr>
            <td >${record.id}</td>
            <td >${record.type}</td>
            <td >${foramatedDate(record.created_at)}</td>
            <td >${record.priority}</td>
            <td ><p class="${record.status} fw-bolder d-inline">${record.status}</p></td>
            <td class="d-flex align-items-center justify-content-end">
              <!-- update job -->
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#update-component-${record.id}">
                <i class="bi bi-pencil-square p-2"></i>
              </button>

              <!--update job Modal -->
              <div class="modal fade" id="update-component-${record.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                      <h1 class="modal-title fs-5 " id="exampleModalLabel">Update Component</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column gap-3">
                        <div>
                            <label for="job-type-${record.id}" class="form-label">JOB TYPE</label>
                            <input type="text" id="job-type-${record.id}" class="form-control" placeholder="Example: Electricla Inspection">
                        </div>
                        <div>
                            <label for="priority-${record.id}" class="form-label">PRIORITY</label>
                            <select id="priority-${record.id}" class="form-control">
                              <option value="" disabled>Priorities</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label for="status-${record.id}" class="form-label">STATUS</label>
                            <select id="status-${record.id}" class="form-control">
                              <option value="" disabled>Status</option>
                              <option value="Completed">Completed</option>
                              <option value="Pending">Pending</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary" onclick="updateJob(${record.id},${record.ship})">Update</button>
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

// post request for add new job
document.getElementById("postNewJob").addEventListener("click", async () => {
  try {
    // ship details for post request
    var componentInfo = {
      type: document.getElementById("history-type").value,
      priority: document.getElementById("form-priority-dropdown").value,
      status: document.getElementById("form-status-dropdown").value,
      assigned_engineer: parseInt(localStorage.getItem("userId")),
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
      alert(JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
});

// Update component
function updateJob(jobId, shipId){
  var updatedHistoryInfo = {
    type: document.getElementById(`job-type-${jobId}`).value,
    priority: document.getElementById(`priority-${jobId}`).value,
    status: document.getElementById(`status-${jobId}`).value,
    assigned_engineer: parseInt(localStorage.getItem("userId")),
    ship: shipId
  }
  console.log(updatedHistoryInfo);
  
  updateHistoryApiCall(updatedHistoryInfo, jobId)
}

async function updateHistoryApiCall(updatedHistoryInfo, historyId){
  try {
    var response = await fetch("http://127.0.0.1:8000/api/maintenance-jobs/update/" + historyId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(updatedHistoryInfo)
    });
    var data = await response.json();
    console.log(data);

    if (response.ok) {
      alert(`Updated Successfully`)
    } else {
      alert(`Update is failed`);
    }
  } catch (error) {
    console.log(error);
  }
}

