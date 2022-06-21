// <script type="text/javascript" src="/js/base.js"></script>

let currentUser = JSON.parse(localStorage.getItem('currentUser'))
if (currentUser){
    let body = document.querySelector('body')
    let nav = document.createElement('section')
    nav.id = "navigation"
    nav.innerHTML = `
    <nav class="navbar">
        <div class="container">
            <a class="my-1" href="userHome.html">
                <img src="/media/img/icon.png">
            </a>
            <div class="d-flex justify-content-evenly flex-grow-1 menu-desktop">
                <a class="nav-link p-2 nav-link-desktop nav-link-hover" href="userHome.html">Home</a>
                <a class="nav-link p-2 nav-link-desktop nav-link-hover" href="tutorial.html">Tutorial</a>
                <a class="nav-link p-2 nav-link-desktop nav-link-hover" href="merchant.html">Store</a>
                <a class="nav-link p-2 nav-link-desktop nav-link-hover" href="faq.html">F.A.Q.</a>
                <a class="nav-link p-2 nav-link-desktop nav-link-hover" href="aboutUs.html">About Us</a>
            </div>
            <button type="button" class="navbar-btn material-symbols-outlined">menu</button>
            <div id="userIcon">
                <button class="userIcon">
                    <img src="${currentUser.img}">
                </button>
                <div class="menu-dropbox">
                    <div class="info">
                        <span>Player: ${currentUser.first_name}</span>
                        <br>
                        <span>Level: ${currentUser.level}</span>
                        <br>
                        <span>Point: ${currentUser.point}</span>
                    </div>
                    <div class="mini-div"></div>
                    <button class="settings">Settings <span class="center-text material-symbols-outlined">settings</span></button>
                    <br>
                    <button class="logout">Log Out <span class="center-text material-symbols-outlined">logout</span></button>
                </div>
            </div>
        </div>
        </div>
        <div id="menu-mobile" class="container-fluid">
        </div>
    </nav>
    `
    body.insertBefore(nav,body.firstChild)
    body.querySelector('.settings').addEventListener('click', () => {
        window.location.href = "./perfilSettings.html"
    })
    body.querySelector('.logout').addEventListener('click', () => {
        localStorage.removeItem("currentUser")
        window.location.href = "./login.html"
    })
    let icon_button = body.querySelector('.userIcon')
    let icon_menu = body.querySelector('.menu-dropbox')
    icon_button.addEventListener('click', () => {
        if(icon_menu.style.display == 'none') icon_menu.style.display = 'block'
        else icon_menu.style.display = 'none'
    })
    icon_button.addEventListener('focusout', event => {
        if (!(event.relatedTarget == body.querySelector('.settings') || event.relatedTarget == body.querySelector('.logout')))
        icon_menu.style.display = 'none'
    })

    let navbar_btn = body.querySelector('.navbar-btn')
    let menu_mobile = body.querySelector('#menu-mobile')
    navbar_btn.addEventListener('click', () => {
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
    navbar_btn.addEventListener('focusout', (event) => {
        let links = document.querySelector('#menu-mobile').querySelectorAll('a')
        if(!Object.values(links).find(link => link == event.relatedTarget)) document.querySelector('#menu-mobile').innerHTML = ""
    })
} else if (!(window.location.href.search('/html/index.html') > -1)) {
    window.location.href = '/html/login.html'
} else {
    let body = document.querySelector('body')
    let nav = document.createElement('section')
    nav.id = "navigation"
    nav.innerHTML = `
    <nav class="navbar">
        <div class="container">
            <a class="my-1" href="userHome.html">
                <img src="/media/img/icon.png">
            </a>
            <div id="userIcon">
            <a href="login.html" class="btn btn-kowd-secondary stretched-link">
                Sing In
            </a>
            <a href="register.html" class="btn btn-kowd stretched-link">
                Sing Up
            </a>
            </div>
        </div>
        </div>
        <div id="menu-mobile" class="container-fluid">
        </div>
    </nav>
    `
    body.insertBefore(nav,body.firstChild)

}


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