let modules = JSON.parse(localStorage.getItem('modules'))
console.log(modules)
let lessons = JSON.parse(localStorage.getItem('lessons'))
console.log(lessons)

let mainDiv = document.querySelector('#container')

modules.forEach(module => {
    mainDiv.innerHTML += `<div id="${module.id}" class="modules">
                            <img src="https://www.onlygfx.com/wp-content/uploads/2018/03/grunge-circle-2-9.png" alt="Module${module.id} Image" width="50" height="50">
                          </div>`

    let lessonsId = lessons.filter(lesson => lesson.idModule == module.id)
    let moduleId = document.getElementById(`${module.id}`)

    lessonsId.forEach(lesson => {
        console.log(lesson)
        moduleId.innerHTML += `<div hidden="true" id="lesson${lesson.id}" class="lessons">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Blue_profile_frame_transparent.svg/512px-Blue_profile_frame_transparent.svg.png" alt="Module${module.id} Image" width="30" height="30">
                                    <img src="https://effectiveness.lahc.edu/student_services/Umoja/SiteAssets/SitePages/Home/rectangle-transparent-black-3.png?Mobile=1&Source=%2Fstudent_services%2FUmoja%2F_layouts%2F15%2Fmobile%2Fdispforma%2Easpx%3FList%3De28ded73-da22-4f14-af45-9406824de9a0%26ID%3D12%26wdFCCState%3D1" alt="Module${module.id} Image" width="40" height="45">
                               </div>`
    })  
})

document.querySelectorAll('.modules').forEach(module => module.addEventListener('click', () => {
    module.querySelectorAll("div").forEach(node => {
            if(node.hidden == true){
                node.hidden = false
            } else {
                node.hidden = true
            }
        console.log(node)
    })

}))
