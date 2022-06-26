$(document).ready(function(){
    console.log(localStorage.getItem("loginStatus"))
    if(localStorage.getItem("loginStatus") == null || localStorage.getItem("loginStatus") == undefined || localStorage.getItem("loginStatus") == "false"){
        alert("Please login")
        window.location.assign("../index.html")
    }


let productList = []
let expiredList = []
let lowStockList = []


$(".filters").on("change", function () {
    filterData()
})


function renderProductList(data) {
    let ProductsList = ""
    for (i = 0; i < data.length; i++) {
        ProductsList += `
        <tr>
        <td class="table-data"width="300px">${data[i].id}</td>
        <td class="table-data" width="300px">${data[i].medicineName}</td>
        <td class="table-data"width="300px">${data[i].medicineBrand}</td>
        <td class="table-data"width="300px">${data[i].expiryDate}</td>
        <td class="table-data"width="300px">${data[i].unitPrice}</td>
        <td class="table-data"width="300px">${data[i].stock}</td>
        </tr>   `
    }
    $("#tbody").html(ProductsList)
}

function filterData() {
    let count = 0
    if($("#Expired").is(":checked") && $("#lowStock").is(":checked")){
        console.log(productList)
        renderProductList(productList)
        $(".count").html(productList.length)
    }
    else if($("#Expired").is(":checked") && !$("#lowStock").is(":checked")){
        renderProductList(expiredList)
        $(".count").html( count +expiredList.length)
    }
    else if(!$("#Expired").is(":checked") && $("#lowStock").is(":checked")){
        renderProductList(lowStockList)
        $(".count").html(count + lowStockList.length)
    }
    else if(!$("#Expired").is(":checked") && !$("#lowStock").is(":checked")){
        renderProductList(0)
        $(".count").html(0)
    }

}






$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products", function (response) {
    console.log(response)
    renderProductList(response)
    productList = response


    for (let i = 0; i < productList.length; i++) {
        presentDate = new Date()
        if (presentDate > new Date(productList[i].expiryDate)) {
            expiredList.push(productList[i])
        }
    }
        for (let j = 0; j < productList.length; j++){
            if (productList[j].stock < 100) {
            lowStockList.push(productList[j])
            
        }
    }
    console.log(lowStockList)
})
$("#logout-btn").click(function(){
    localStorage.setItem("loginStatus", false)
    window.location.assign("../index.html")
})

})