initdata()

function initdata() {
    //TRY TO GET ARRAY USERS FROM LOCAL STORAGE AS
    if(!localStorage.users){
        users = [
            {id: 2,
             first_name: 'John',
             last_name: 'Doe',
             password: '1234',
             email: 'johndoe@example.com',
             type: 0,
             currentExercise: 0,
             bag: [0,0,0,0],
             level: 0,
             point: 0
             }, 
             {id: 3,
              first_name: 'Piruka',
              last_name: 'Style',
              password: 'admin',
              email: 'yau@example.com',
              type: 0,
              currentExercise: 0,
              bag: [0,0,0,0],
              level: 0,
              point: 0
            },
        ]
        localStorage.setItem('users', JSON.stringify(users))
        console.log('user data injected')
    }

    if(!localStorage.admins) {
        admins = [
            {id: 1,
                first_name: 'Admin',
                last_name: 'Admin',
                password: 'admin',
                email: 'admin@example.com',
                type: 1,
                currentExercise: 0,
                bag: [0,0,0,0],
                level: 0,
                point: 0
            }
        ]
        localStorage.setItem('admins', JSON.stringify(admins))
        console.log('admin data injected')
    }

    if(!localStorage.currentUser) {
        currentUser = {
            id: 2,
             first_name: 'John',
             last_name: 'Doe',
             password: '1234',
             email: 'johndoe@example.com',
             type: 0,
             currentExercise: 0,
             bag: [2],
             level: 0,
             point: 500
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        console.log('current user data injected')
    }
    
    if(!localStorage.modules) {
        modules = [{
            id: 1,
            name: 'Module1'
        } , {
            id: 2,
            name: 'Module2'
        } , {
            id: 3,
            name: 'Module3'
        }]
        localStorage.setItem('modules', JSON.stringify(modules))
        console.log('modules data injected')
    }

    if(!localStorage.lessons) {
        lessons = [{
            id: 1,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 1,
            description: 'yauyauyau',
        } , {
            id: 2,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 1,
            description: 'yauyauyau',
        } , {
            id: 3,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 2,
            description: 'yauyauyau',
        } , {
            id: 4,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 3,
            description: 'yauyauyau',
        }]
        localStorage.setItem('lessons', JSON.stringify(lessons))
        console.log('lessons data injected')
    }

    if(localStorage.exercises) {
        exercises = [{
            
        }

        ]
    }
}