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
 function searchValues() {

    var shipId =document.getElementById("ship-id-dropdown").value
    var priority =document.getElementById("priority-dropdown").value
    var status =document.getElementById("status-dropdown").value

    componentsApiCall(shipId,priority,status);
  };

// Search history api call
async function componentsApiCall(shipId,priority,status) {
    var url = `http://127.0.0.1:8000/api/maintenance-jobs/filter?ship_id=${shipId}&priority=${priority}&status=${status}`
    
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
  if(history.length>0){
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
    });
  }else{
    var str=`
      <tr>
        <td class="text-center py-4 text-secondary fw-bolder opacity-50" colspan="6"> No history available</td>
      </tr>
    `
  }
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("table-body").innerHTML = str;
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
      "http://127.0.0.1:8000/api/maintenance-jobs/create",
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
  
  updateComponentApiCall(updatedHistoryInfo, jobId)
}

async function updateComponentApiCall(updatedHistoryInfo, historyId){
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

