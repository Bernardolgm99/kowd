initdata()

function initdata() {
    //TRY TO GET ARRAY USERS FROM LOCAL STORAGE AS
    if (!localStorage.users) {
        let users = [
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
                point: 0,
                easteregg: [],
                achievements: [],
            },
            {
                id: 2,
                first_name: 'John',
                last_name: 'Doe',
                password: '1234',
                email: 'johndoe@example.com',
                type: 0,
                currentExercise: 0,
                bag: [1, 0, 3, 0],
                level: 0,
                point: 0,
                img: "../media/userIcon/user1.jpg",
                easteregg: [],
                achievements: [],
            },
            {
                id: 3,
                first_name: 'José',
                last_name: 'Magalhães',
                password: '123',
                email: 'jose2002@example.com',
                type: 0,
                currentExercise: 0,
                bag: [0, 0, 0, 0],
                level: 0,
                point: 0,
                img: "../media/userIcon/user1.jpg",
                achievements: [],
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

    if (!localStorage.modules) {
        let modules = [{
            id: 1,
            name: 'Module1',
            boss_life: '1000',
            boss_question: [[`Predict output?\nvar x = {name:'bikki'};\nvar op = (function(x){\ndelete x;\n}return x;\n})(0);\n\nconsole.log(op);`, 0]]

        }, {
            id: 2,
            name: 'Module2',
            boss_life: '2000',
            boss_question: [[`Predict output?\nvar x = {name:'bikki'};\nvar op = (function(x){\ndelete x;\n}return x;\n})(0);\n\nconsole.log(op);`, 0]]
        }, {
            id: 3,
            name: 'Module3',
            boss_life: '3000',
            boss_question: [[`Predict output?\nvar x = {name:'bikki'};\nvar op = (function(x){\ndelete x;\n}return x;\n})(0);\n\nconsole.log(op);`, 0]]
        }]
        localStorage.setItem('modules', JSON.stringify(modules))
        console.log('modules data injected')
    }

    if (!localStorage.lessons) {
        let lessons = [{
            id: 1,
            name: 'Variables',
            url: '../aula.mp4',
            popularity: [[], []],
            idModule: 1,
            description: 'Creating a variable in JavaScript is called "declaring" a variable. You declare a JavaScript variable with the var or the let keyword: var carName;.',
            timestamps: [['primeiro', 100], ['segundo', 200], ['terceiro', 300], ['quarto', 400]]
        }, {
            id: 2,
            name: 'Conditionals',
            url: '../aula.mp4',
            popularity: [[], []],
            idModule: 1,
            description: 'The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark ( ? ), then an expression to execute if the condition is truthy followed by a colon ( : ), and finally the expression to execute if the condition is falsy.',
            timestamps: [],
        }, {
            id: 3,
            name: 'Loops',
            url: '../aula.mp4',
            popularity: [[], []],
            idModule: 2,
            description: 'The For Loop ; Statement 1 is executed (one time) before the execution of the code block. ; Statement 2 defines the condition for executing the code block.',
            timestamps: [],
        }, {
            id: 4,
            name: 'Arrays',
            url: '../aula.mp4',
            popularity: [[], []],
            idModule: 3,
            description: 'Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays. But, JavaScript arrays are best described as arrays.',
            timestamps: [],
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

    if (!localStorage.items) {
        let items = [
            {
                id: 1,
                name: 'Sword of the Abyss',
                description: 'When you hit an enemy, he will lose more health than normal',
                value: 2000,
                img: '../../media/img/icon_playMaker.png'
            }, {
                id: 2,
                name: 'Guardian of Anubis',
                description: 'You will receive less damage',
                value: 1200,
                img: '../../media/img/icon_wayToCool.png'
            }, {
                id: 3,
                name: 'Saitama-san',
                description: 'You gone starts half hp but can kill the boss in one-hit',
                value: 50200,
                img: '../../media/img/icon_deathUnbound.png'
            }, {
                id: 4,
                name: 'Weak like cuphead',
                description: 'Bosses will start with half life',
                value: 1200,
                img: '../../media/img/icon_playMaker.png'
            }
        ]
        localStorage.setItem('items', JSON.stringify(items))
        console.log('Items data injected')
    }
    if (!localStorage.comments) {
        let comments = []
        localStorage.setItem('comments', JSON.stringify(comments))
        console.log('Comments data injected')
    }
}