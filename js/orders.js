
$(document).ready(function(){

    if(localStorage.getItem("loginStatus") == null || localStorage.getItem == undefined || localStorage.getItem == "false"){
        alert("Please login")
        window.location.assign("../html/index.html")
    }


var submitBtn = document.getElementById("logout-btn")
var orderList = []

function renderOrderList(data) {
    let ordersList = ""
    for (i = 0; i < data.length; i++) {
        ordersList += `
        <tr>
        <td class="table-data"width="300px">${data[i].id}</td>
        <td class="table-data" width="300px">${data[i].customerName}</td>
        <td class="table-data"width="300px">${data[i].orderDate}</td>
        <td class="table-data"width="300px">$${data[i].amount}</td>
        <td class="table-data"width="300px">${data[i].orderStatus}</td>
        </tr>   `
    }
    $("#tbody").html(ordersList)

}

$(".filters").click(function () {
    let filteredArr = $(".filters:checked").map(function () {
        return this.value
    }).get()
    getfilteredArr(filteredArr)
})

function getfilteredArr(filteredArray) {
    let newOrderList = []
    if (orderList.length > 0) {
        for (let i = 0; i < filteredArray.length; i++) {
            orderList.filter(item => {
                if (item.orderStatus == filteredArray[i]) {
                    newOrderList.push(item)
                }
            })

        }
    }
    $(".count").html(newOrderList.length)
    console.log(newOrderList)
    renderOrderList(newOrderList)

}



$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders", function (response) {
    console.log(response)
    renderOrderList(response)
    orderList = response
})

submitBtn.addEventListener("click",function(){
localStorage.setItem("loginStatus", false)
window.location.assign("../html/index.html")
})

})