initdata()

function initdata() {
    //TRY TO GET ARRAY USERS FROM LOCAL STORAGE AS
    if (!localStorage.users) {
        let users = [
            {
                id: 2,
                first_name: 'John',
                last_name: 'Doe',
                password: '1234',
                email: 'johndoe@example.com',
                type: 0,
                currentExercise: 0,
                bag: [0, 0, 0, 0],
                level: 0,
                point: 0,
                img: "../media/userIcon/user1.jpg",
                easteregg: []
            },
            {
                id: 3,
                first_name: 'Piruka',
                last_name: 'Style',
                password: 'admin',
                email: 'yau@example.com',
                type: 0,
                currentExercise: 0,
                bag: [0, 0, 0, 0],
                level: 0,
                point: 0,
                img: "../media/userIcon/user1.jpg",
                easteregg: []
            },
        ]
        localStorage.setItem('users', JSON.stringify(users))
        console.log('user data injected')
    }

    if (!localStorage.admins) {
        let admins = [
            {
                id: 1,
                first_name: 'Admin',
                last_name: 'Admin',
                password: 'admin',
                email: 'admin@example.com',
                type: 1,
                currentExercise: 0,
                bag: [0, 0, 0, 0],
                level: 0,
                point: 0
            }
        ]
        localStorage.setItem('admins', JSON.stringify(admins))
        console.log('admin data injected')
    }

    if (!localStorage.currentUser) {
        let currentUser = {
            id: 2,
            first_name: 'John',
            last_name: 'Doe',
            password: '1234',
            email: 'johndoe@example.com',
            type: 0,
            currentExercise: 0,
            bag: [2],
            level: 0,
            point: 500,
            img: "../media/userIcon/user1.jpg"
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        console.log('current user data injected')
    }

    if (!localStorage.modules) {
        let modules = [{
            id: 1,
            name: 'Module1'
        }, {
            id: 2,
            name: 'Module2'
        }, {
            id: 3,
            name: 'Module3'
        }]
        localStorage.setItem('modules', JSON.stringify(modules))
        console.log('modules data injected')
    }

    if (!localStorage.lessons) {
        let lessons = [{
            id: 1,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 1,
            description: 'yauyauyau',
        }, {
            id: 2,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 1,
            description: 'yauyauyau',
        }, {
            id: 3,
            name: 'so vim dizer yau',
            url: '',
            popularity: 2,
            idModule: 2,
            description: 'yauyauyau',
        }, {
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

    if (!localStorage.exercises) {
        let exercises = [
            {
                id: 1,
                lessonId: 1,
                type: 1,
                answer: "true",
                question: `The keyword "let" is used to do a variable?`,
            },
            {
                id: 2,
                lessonId: 3,
                type: 2,
                answer: "for",
                question: `What's keyword is used to do a Loop?`,
                wrong_answers: ["loop", "For", "doUntil"]
            },
            {
                id: 4,
                lessonId: 1,
                type: 3,
                answer: "l,e,t,0,1,0,i",
                question: `How to do a loop from 0 to 10?`,
                question_text: `for (___ i = _; i < __; _++){*loop function*}`,
            }
        ]
        localStorage.setItem('exercises', JSON.stringify(exercises))
        console.log('exercises data injected')
    }

    if (!localStorage.currentExercise) {
        let currentExercise = {
            id: 1,
            lessonId: 1,
            type: 1,
            answer: "true",
            question: `The keyword "let" is used to do a variable?`,
        }
        localStorage.setItem('currentExercise', JSON.stringify(currentExercise))
        console.log('exerciseExercise data injected')
    }
}