$(document).ready(function(){

    if(localStorage.getItem("loginStatus") == null || localStorage.getItem("loginStatus") == undefined || localStorage.getItem("loginStatus") == "false"){
        alert("Please login")
        window.location.assign("../html/index.html")
    }

searchInput = document.getElementById("my-input")
console.log(searchInput)
let userList = []
console.log("this", userList)



function renderUsersList(data) {
    let usersList = ""
    for (i = 0; i < data.length; i++) {
        usersList += `
        <tr>
        <td class="table-data"width="100px">${data[i].id}</td>
        <td class="table-data" width="300px"><img src=${data[i].profilePic}></td>
        <td id="fullName"class="table-data"width="300px">${data[i].fullName}</td>
        <td class="table-data"width="300px">${data[i].dob}</td>
        <td class="table-data"width="200px">${data[i].gender}</td>
        <td class="table-data"width="300px">${data[i].currentCity}, ${data[i].currentCountry}</td>
        </tr>   `
    }
    $("#tbody").html(usersList)
}

function search(e){
    newUserList = []
    var searchText = e.target.value.toUpperCase()
    if(searchText.length < 2){
        alert("Enter atleast 2 characters")
        return;
    }
    else{
        userList.filter(item =>{
            let name = item.fullName.toUpperCase()
            console.log(name,searchText)
                if(name.indexOf(searchText) !== -1){
                    newUserList.push(item)
                }            
            })
        }
        renderUsersList(newUserList) 
        if(newUserList.length == 0) noResultsFound() 
}

var noResultsFound = () =>{
    var noresult = `<p>"No Results found!!!"</p>`
    $("#tbody").html(noresult)
}

$("#reset").on("click",function(){
    renderUsersList(userList)
})

$("#my-input").on("change",function(e){
    search(e)
})


$("#logout-btn").click(function(){
    localStorage.setItem("loginStatus", false)
    window.location.assign("../html/index.html")
})




$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", function (response) {
    userList = response.slice(0,28)
    console.log(userList)
    renderUsersList(userList)

})
})