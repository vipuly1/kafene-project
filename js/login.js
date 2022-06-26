if(localStorage.getItem("loginStatus") === "true"){
  window.location.assign("../html/orders.html")

}
var form = document.getElementById("form-input-container")
var submit = document.getElementById("submit-btn")

function validateform(e){

    var username = form.username.value
    var password = form.password.value

    if (username==null || username=="" ){  
        alert("Username cannot be blank");  
        return false;  
      }
      else if(password == null || password == ""){
        alert("Password cannot be blank");  
        return false;
      }
      else if(password.length<6){  
        alert("Username and Password must be at least 6 characters long.");  
        return false;  
        }
        
        else if(username === password){
            alert("Login Successful")
            
            window.location.assign("./html/orders.html")
            localStorage.setItem("loginStatus", true)

        }
        else{
            alert("enter correct details")
        }
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    validateform(e)
})
