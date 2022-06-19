let currentUser = JSON.parse(localStorage.getItem('currentUser'))
document.querySelector('.userIcon').src = currentUser.img

let btn = document.querySelector('.navbar-btn')
let menu_mobile = document.querySelector('#menu-mobile')
btn.addEventListener('click', () => {
    if (menu_mobile.innerHTML === "") {
        menu_mobile.innerHTML = `
        <div class="d-flex flex-column justify-content-evenly text-center flex-grow-1">
        <a class="nav-link py-4 nav-link-hover" href="userHome.html">Home</a>
        <a class="nav-link py-4 nav-link-hover" href="tutorial.html">Tutorial</a>
        <a class="nav-link py-4 nav-link-hover" href="merchant.html">Store</a>
        <a class="nav-link py-4 nav-link-hover" href="faq.html">F.A.Q.</a>
        <a class="nav-link py-4 nav-link-hover" href="aboutUs.html">About Us</a>
        </div>`
    } else {
        menu_mobile.innerHTML = ""
    }
})

btn.addEventListener('focusout', () => {
    document.querySelector('#menu-mobile').innerHTML = ""
})

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 66) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navigation").style.top = "0";
        } else{
            document.getElementById("navigation").style.top = "-64px";
        }
        prevScrollpos = currentScrollPos;
    }
}

function typeWriter(element){
    const textArray = element.innerHTML.split('');
    element.innerHTML = ''
    textArray.forEach((letter, i) => {
        setTimeout(() =>{
            element.innerHTML += letter
        }, 75*i)
    })
}

let title = document.querySelector('.type-writer')

if(title)typeWriter(title)