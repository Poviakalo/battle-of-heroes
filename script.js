//Modules js
import { fighters } from './modules/store.js';
import Fighter, { Kozak } from './modules/fighter.js';
import { random, findAndRemoveClassName } from './modules/utils.js';
import { accounts } from './modules/accounts.js';
import { Authorization, Registration } from './modules/form.js';


let list = [];

localStorage.getItem('list') 
? list = [...JSON.parse(localStorage.getItem('list'))] 
: localStorage.setItem('list',JSON.stringify(accounts));

list = [...JSON.parse(localStorage.getItem('list'))];

//constants

const auth = new Authorization(); //авторизація
const reg = new Registration(); //реєстрація


const wrapper = document.querySelector('.mainWrapper');
const arena = document.querySelector('.arena');
const btnKick = document.getElementById('btn-kick');
const btnNextLevel = document.querySelector('.btnNextLevel');
const matchAccount = document.querySelector('.matchAccount');
const score = document.querySelector('.score span');
const title = document.querySelector('.title');
const userName = document.querySelector('.userName');
const userExit = document.querySelector('.userExit');
const myAccount = document.querySelector('.myAccount');

myAccount.addEventListener('click', () => {
    let arr = list.filter(obj => obj.isActive); 
    arr.length === 0
    ? auth.renderForm('Авторизація', list, toggleForm(init)) 
    : null
})


let presentLevev = 1;
let count = 0;

let presentKozak = {}; // об'єкт для зберігання даних вибраного козака

let player1 = {}; //об'єкт для зберігання екземпляра класку козака
let player2 = {}; //об'єкт для зберігання екземпляра класку месника

const heroes = fighters.filter( fighter => fighter.type === 'kozak'); // створюємо масив козаків
const avengers = fighters.filter( fighter => fighter.type === 'avenger').sort((a, b) => a.hp - b.hp); // створюємо масив месників


init()

//Functions

function init () {
    let arr = list.filter(obj => obj.isActive);
     
    const startGameBtn = document.createElement('button');   
    startGameBtn.classList.add('btn', ['btnStart']);
    startGameBtn.innerText = 'Start game';
    wrapper.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        arr.length === 1 
        ? startGame(heroes, wrapper, startGameBtn, arr[0])
        : auth.renderForm('Авторизація', list, toggleForm, startGame, heroes, wrapper, startGameBtn )       
    })
} 

function startGame (heroes, wrapper, startGameBtn, objUser) {
    chooseHero(heroes, wrapper, startGameBtn);    
    userName.innerText = objUser?.name;    
    userExit.style.display = 'block';    
}



function chooseHero (arrHeroes, block, elem) {
    block.removeChild(elem); //видаляємо кнопку start game
    title.innerText = "Вибери героя";

    const showcaseHeroes = document.createElement('div'); //створюємо вітрину наших героїв
    showcaseHeroes.classList.add('showcaseHeroes');
    block.appendChild(showcaseHeroes);

    arrHeroes.forEach( item => {        
        const kozakItem = document.createElement('div'); //створюємо картку козака
        kozakItem.classList.add('fighter');
        showcaseHeroes.appendChild(kozakItem);
        
        // відрендерюємо картки козаків
        kozakItem.innerHTML = `                          
            <img src="./img/${item.name}.png" alt=${item.name}>
            <h2 class="titleName">${item.name}</h2>
            <p>${item.description}</p>`

        kozakItem.addEventListener('click', () => {  //при клікі на картку козака    
                                    
            block.removeChild(showcaseHeroes);  // видаляємо вітрину    

            arena.style.display = 'flex'; // робимо видимим блок арена в якій відбувається бій
            matchAccount.style.display = 'flex';   // робимо видимим блок рахунку гри
            presentKozak = {...item};

            nextLevelGame(item, list)     //запускаємо бій 
        })
    })    
}

function toggleForm (init) {
    reg.renderForm('Реєстрація', list, init)
}

function nextLevelGame(obj, person1, person2, list) {

    // findAndRemoveClassName( person1, 'crossOut');
    findAndRemoveClassName( person2, 'crossOut');
     
    title.innerHTML = `Level - <span>${presentLevev}</span>` 

    const kozak = new Kozak({ //створюємо екземпляр козака
        ...obj,
        selectors: 'player1',
    });

    avengers.forEach((person, index) => {
        if(index + 1 === presentLevev) {
            const avenger = new Fighter({ //створюємо екземпляр месника
                ...person,
                selectors: 'player2',
            });
            return player2 = {...avenger}
        }
    })
    return  player1 = {...kozak}
}

const btnCount = document.createElement('span');

function countBtn() {
    count++
    btnCount.innerText = ` (${count})`;
    btnKick.appendChild(btnCount);
    score.innerText = count
}
//Events
btnKick.addEventListener('click', () => {
    player1.changeHP( random(40), btnKick, btnNextLevel,  )
    player2.changeHP( random(player1.powerMax, player1.powerMin), btnKick, btnNextLevel, presentLevev, player1?.name, count );    
    countBtn();
})

btnNextLevel.addEventListener('click', () => {

    if(btnNextLevel.innerText === 'reset'){
        document.location.reload();
    }
    if(btnNextLevel.innerText === 'Грати ще раз'){
        document.location.reload();
    }    
    presentLevev +=1;

    btnNextLevel.style.display = 'none';
    
    nextLevelGame(presentKozak, player1, player2);
    btnKick.disabled = false;
})

userExit.addEventListener('click', () => {
    exitAccount()
})

function exitAccount () {
    let arr = list.filter(obj => obj.isActive);
    arr[0].isActive = false;
    localStorage.setItem('list',JSON.stringify(list));
    userExit.style.display = 'none';
    userName.innerText = 'user name';
    document.location.reload();
}