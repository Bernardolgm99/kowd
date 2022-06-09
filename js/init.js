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
}