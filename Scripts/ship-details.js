var queryString = window.location.search;
var para = new URLSearchParams(queryString)
var id = para.get("id")

console.log(id);


// Update ship functionality



// Delete ship functionality
document.getElementById("delete-ship").addEventListener("click",async ()=>{
  try {
    var response = await fetch("http://127.0.0.1:8000/api/ships/delete/"+id,{
      method:"DELETE",
      headers:{
        "Cotent-Type":"application/json",
        "Authorization": "Bearer"+localStorage.getItem(accessToken)
      }
    })
    var data = await response.json()
    if(data){
      alert(`${data.name} is Deleted Successfully`)
    }
  } catch (error) {
    console.log(error);
    
  }
})