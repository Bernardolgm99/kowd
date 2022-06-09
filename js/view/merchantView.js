import * as User from "../models/userModel.js"
import * as Item from "../models/itemsModel.js"
JSON.parse(localStorage.getItem('users'))
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
//if(!(localStorage.getItem('Current User'))) window.location.href="../../html/login.html"
//get items Item.itemArray

//create list
renderShop()
function renderShop(){
    let shop = document.querySelector('#shop')
    //na renderShop se ja tiver algum na mochila mostra comprado
    //bag por id ou nome
    //apanhar bag e comparar
    for(let itens of Item.itemArray){
        console.log(itens)//shopItems
        if((currentUser.bag).length >= 0){
            for (let item of currentUser.bag){
            console.log(item)//bagItems
            if(itens.id != item){
                shop.innerHTML += `
                <div class="row mb-3">
                    <p id="txt-large">${itens.name}</p> 
                    <p id="txt-small">${itens.description}</p>
                    <button class="item" id="${itens.id}">${itens.value} | Buy</button>     
                </div>` 
                break
            } else {
                shop.innerHTML += `
                <div class="row mb-3">
                    <p id="txt-large">${itens.name}</p> 
                    <p id="txt-small">${itens.description}</p>
                    <button class="item sold" id="${itens.id}">SOLD!</button>     
                </div>`
            }
            }
        } else {
            shop.innerHTML += `
                <div class="row mb-3">
                    <p id="txt-large">${itens.name}</p> 
                    <p id="txt-small">${itens.description}</p>
                    <button class="item" id="${itens.id}">${itens.value} | Buy</button>     
                </div>`    
        }
        
    } 
    //renderBtn()
}

/*function renderBtn(){
    let btns = document.querySelectorAll('.item')
    btns.forEach(btn =>{
        btn.addEventListener('click', (event) =>{
            //let value = Item.itemArray[event.target.id - 1].value
            //ler valor de pontos do utiliador
            //alterar esses valores
        }) 
    })
    renderShop()
}*/


//verificar o que o user tem na mochila
//render
