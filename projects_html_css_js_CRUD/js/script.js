let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let count = document.getElementById("count")
let category = document.getElementById("category")
let total = document.getElementById("total")
let create = document.getElementById("create")
let mood = "create"
let temp;
// console.log(title,price,taxes,ads,discount,count,category,total,create)







//get total
function getTotal(){
    // console.log("done")
    if(price.value!=""){
        let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background = "rgb(134, 171, 13)"
    }
    else{
        total.innerHTML = "";
        total.style.background = "#a00d02"
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//create product
let dataPro;
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
if( title.value == "" &&
        price.value == "" &&
        taxes.value == "" &&
        ads.value == "" &&
        discount.value == "" &&
        category.value == ""&&
        count.value == "" &&dataPro.length<100){
  create.onclick= function(){
    let newPro= {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // newPro.count = Number(newPro.count);
 if(mood==="create"){
       if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro)
        }
    }else{
            dataPro.push(newPro)

        }
 }else{
    dataPro[temp]=newPro
    mood= "create"
    create.innerHTML= "create"
    count.style.display="block"
    clearData()

 }
        // console.log(count.value);
// console.log(Number(count.value));
    
    //save data in local storage
    localStorage.setItem("product",JSON.stringify(dataPro))
    // console.log(dataPro)
    showData()

}  
}

// localStorage.removeItem("product");
// location.reload();

//clear inputs
function clearData(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""


}
//read 
function showData(){
    getTotal()
    let table = "";
    for(let i =0;i<dataPro.length;i++){
        table+=`   <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
        // console.log(table)
    }
    document.getElementById("tbody").innerHTML=table;
    let btnDelete = document.getElementById("deleteAll")
    if(dataPro.length>0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">delete all (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML=""
    }

}
showData()

//Delete
function deleteData(i){
// console.log(i)
dataPro.splice(i,1)
localStorage.product= JSON.stringify(dataPro)
showData()
}
// delete all
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
//update
function updateData(i){
    // console.log(i)
    title.value=dataPro[i].title
    taxes.value=dataPro[i].taxes
    price.value=dataPro[i].price
    ads.value=dataPro[i].ads
    discount.value=dataPro[i].discount
    category.value=dataPro[i].category
    getTotal()
    count.style.display="none"
    create.innerHTML = "update"
    mood="update"
    temp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search

let searchMood="title"
function getSearchMood(id){
    // console.log(id)
    let search=document.getElementById("search")
    if(id=="searchTitle"){
        searchMood="title"
    }else{
        searchMood="category"
       

    }
        search.placeholder="search by"+searchMood

    search.focus()
    search.value=""
    showData()
    // console.log(searchMood)

}
function searchData(value){
// console.log(value)
    let table=""
    for(let i=0;i<dataPro.length;i++){

if(searchMood=="title"){
        if(dataPro[i].title.includes(value.toLowerCase())){
              table+=`   <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`

        }
     

}else{
}
        if(dataPro[i].category.includes(value.toLowerCase())){
              table+=`   <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`

        }
    
}
    document.getElementById("tbody").innerHTML=table;

}
//clean data








































//count


