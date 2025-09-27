var count=0;
// Email Validatioin
document.getElementById("email").addEventListener("input", () => {
  var email = document.getElementById("email").value;
  var regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regEx.test(email)) {
    document.getElementById(
      "eamil-warning"
    ).innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> Invalid Eamil id`;
  } else {
    document.getElementById("eamil-warning").innerHTML = "";
    count++;
    console.log(email);
  }
});

// Username Validation
document.getElementById("username").addEventListener("input", () => {
  var userName = document.getElementById("username").value;
  if (userName.length > 2) {
    document.getElementById("username-warning").innerHTML = "";
    count++;
    console.log("valid username", userName);
  } else {
    document.getElementById(
      "username-warning"
    ).innerHTML = `Username must be atleast 3 characters`;
  }
});

//Password Validation
document.getElementById("password").addEventListener("input", () => {
  var pass = document.getElementById("password").value;
  var element = document.getElementsByClassName("warn");
  var check = 0;

  var regEx1 = /^(?=.*[a-z]).*$/;
  if (!regEx1.test(pass)) {
    element[0].innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> At least one LOWERCASE letter.`;
    element[0].classList.remove("text-success");
    element[0].classList.add("text-danger");
  } else {
    element[0].innerHTML = `<i class="bi bi-check-square-fill text-success"></i> At least one LOWERCASE letter.`;
    element[0].classList.remove("text-danger");
    element[0].classList.add("text-success");
    check++;
  }

  var regEx2 = /^(?=.*[A-Z]).*$/;
  if (!regEx2.test(pass)) {
    element[1].innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> At least one UPPERCASE letter.`;
    element[1].classList.remove("text-success");
    element[1].classList.add("text-danger");
  } else {
    element[1].innerHTML = `<i class="bi bi-check-square-fill text-success"></i> At least one UPPERCASE letter.`;
    element[1].classList.remove("text-danger");
    element[1].classList.add("text-success");
    check++;
  }

  var regEx3 = /^(?=.*\d).*$/;
  if (!regEx3.test(pass)) {
    element[2].innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> At least one NUMERIC.`;
    element[2].classList.remove("text-success");
    element[2].classList.add("text-danger");
  } else {
    element[2].innerHTML = `<i class="bi bi-check-square-fill text-success"></i> At least one NUMERIC.`;
    element[2].classList.remove("text-danger");
    element[2].classList.add("text-success");
    check++;
  }

  var regEx4 = /^(?=.*[@$!%*?&]).*$/;
  if (!regEx4.test(pass)) {
    element[3].innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> At least one SPECICAL letter [@$!%*?&].`;
    element[3].classList.remove("text-success");
    element[3].classList.add("text-danger");
  } else {
    element[3].innerHTML = `<i class="bi bi-check-square-fill text-success"></i> At least one SPECICAL letter [@$!%*?&].`;
    element[3].classList.remove("text-danger");
    element[3].classList.add("text-success");
    check++;
  }

  var regEx5 = /^.{8,}$/;
  if (!regEx5.test(pass)) {
    element[4].innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> Minimum 8 characters required.`;
    element[4].classList.remove("text-success");
    element[4].classList.add("text-danger");
  } else {
    element[4].innerHTML = `<i class="bi bi-check-square-fill text-success"></i> Minimum 8 characters required.`;
    element[4].classList.remove("text-danger");
    element[4].classList.add("text-success");
    check++;
  }

  if (check == 5) {
    count++;
    console.log(pass);
  }
});

// Password Confirmation
document.getElementById("confirm-password").addEventListener("input", () => {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;
  if (confirmPassword == password) {
    document.getElementById("confirm-password-warning").innerHTML = "";
    count++;
    console.log("password confirmed", confirmPassword);
  } else {
    document.getElementById(
      "confirm-password-warning"
    ).innerHTML = `<i class="bi bi-x-square-fill text-danger"></i> Password is Mismatched`;
  }
});

// submit button for create user
document.getElementById("create-btn").addEventListener("click", () => {
  var email = document.getElementById("email").value;
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var role = document.getElementById("role").value;

  var userDetails = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    username: userName,
    password: password,
    role: role,
  };

  if (count >= 4) {
    console.log(userDetails);
    registorApi(userDetails);
  }
});

// Regsitor Api call
async function registorApi(userDetails) {
  try {
    var response = await fetch("http://127.0.0.1:8000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    var data = await response.json();

    if(response.ok){
      alert("Registration Successfull, Login now");
      window.location.href="../index.html"
    }
    else{
      alert(JSON.stringify(response.error))
    }
  } catch (error) {
    alert("Registration Failed due to Server");
  }
}

// Clear the form with rest button
document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("role").value = "";

  document.getElementById("eamil-warning").innerHTML = "";
  document.getElementById("confirm-password-warning").innerHTML = "";
  document.getElementById("username-warning").innerHTML = "";
  var element = document.getElementsByClassName("warn");
  element[0].innerHTML = "";
  element[1].innerHTML = "";
  element[2].innerHTML = "";
  element[3].innerHTML = "";
  element[4].innerHTML = "";
});
