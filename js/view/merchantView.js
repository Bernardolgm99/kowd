import * as Item from "../models/itemsModel.js"
//JSON.parse(localStorage.getItem('users'))
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
if (!(localStorage.getItem('currentUser'))) window.location.href = "../../html/login.html"
console.log(currentUser)
//render points
function renderPoints() {
    let pointPlace = document.querySelector('#points')
    pointPlace.innerHTML = `<p>${currentUser.point} points</p>`
}

//merchantLines
function merchantLines(value){
    let merchantLinePlace = document.querySelector('#merchantLines')
    switch(value) {
        case 0:
            let linesArray = [`Hello ${currentUser.first_name}, you can take anything as long as you have enough coins.`,`I see that you are interesed in my wares`,`Welcome back ${currentUser.first_name}, I'm glad to see you well once more, please take anything you want.`]
            merchantLinePlace.innerHTML = `<p>${linesArray[Math.floor(Math.random() * linesArray.length)]}</p>`

    }
}

//create list
renderShop()
function renderShop() {
    let shop = document.querySelector('#shop')
    shop.innerHTML = ``
    //na renderShop se ja tiver algum na mochila mostra comprado
    //bag por id ou nome
    //apanhar bag e comparar
    console.log(currentUser)
    if ((currentUser.bag).length > 0) {
        for (let itens of Item.itemArray) {
            find: {
                for(let item of currentUser.bag){
                    if (item == itens.id) {
                        shop.innerHTML += `
                            <div class="row mb-3">
                            <p id="txt-large">${itens.name}</p> 
                            <p id="txt-small">${itens.description}</p>
                            <button class="item sold" id="${itens.id}">SOLD!</button>     
                            </div>`
                        break find
                    }
                }
                shop.innerHTML += `
                <div class="row mb-3">
                <p id="txt-large">${itens.name}</p> 
                <p id="txt-small">${itens.description}</p>
                <button class="item" id="${itens.id}">${itens.value} | Buy</button>     
                </div>`
            }
        }
    }

    else {
        for (let itens of Item.itemArray) {
            shop.innerHTML += `
                <div class="row mb-3">
                    <p id="txt-large">${itens.name}</p> 
                    <p id="txt-small">${itens.description}</p>
                    <button class="item" id="${itens.id}">${itens.value} | Buy</button>     
                </div>`
        }

    }
    renderBtn()
    renderPoints()
    merchantLines(0)
}

function renderBtn() {
    let btns = document.querySelectorAll('.item')
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()
            let itemShop = Item.itemArray[event.target.id - 1]
            //console.log(itemShop)
            //check bought
            //console.log((currentUser.bag).length)
            if ((currentUser.bag).length > 0) {
                console.log(currentUser.point)
                if ((currentUser.bag.find(item => item == itemShop.id)) == undefined && currentUser.point >= itemShop.value) {
                    (currentUser.bag).push(itemShop.id)
                    currentUser.point = currentUser.point - itemShop.value
                    //update inlocalstorage UserBag
                } else {
                    merchantLines(2)
                }
            } else {
                if(currentUser.point >= itemShop.value){
                    (currentUser.bag).push(itemShop.id)
                } else {
                    merchantLines(1)
                }
            }
            (currentUser.bag).sort()
            renderShop()
            renderPoints()
        })
        //add item
        //ler valor de pontos do utiliador
        //alterar esses valores
        //ver se tem na michila
    })

}


//verificar o que o user tem na mochila
//render