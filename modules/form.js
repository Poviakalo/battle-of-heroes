import { toggleClasses, isTrueRegexp, isValid } from './validate.js';



//RegExp
const regexpName = /^[A-Za-zА-Яа-яЁёІіЇїЄє']{3,16}$/;
const regexpEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

//Classes
class User {
    constructor(name, login, email, password ) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.email = email;
    }
    isActive = false;
}

export class Authorization {
    constructor(login, password) {
        this.login = login;
        this.password = password;

        this.body = document.body;
        this.header = document.querySelector('.header');
        
    }

    

    renderForm = (title = 'Авторизація', list, funcRegistr, startGame, heroes, wrapper, startGameBtn) => {
        this.renderPopup(title);
        this.accountEnter(list, funcRegistr, startGame,heroes, wrapper, startGameBtn);
    }

    renderPopup = (title) => {
        const popup = document.createElement('div');
        popup.classList.add('popup');    
        this.body.insertBefore(popup, this.header);

        const container = document.createElement('div');
        container.classList.add('container');
        popup.appendChild(container);

        const titleForm = document.createElement('h1');
        titleForm.classList.add('formTitle');
        container.appendChild(titleForm); 
               

        titleForm.innerText = title;
        this.renderInput(container);
        this.renderBtn(container, 'btnForm', 'Авторизуватись');
        this.renderBtn(container, 'btnRegistr', 'Зареєструватись');
        

        popup.addEventListener('click', (e) => {           
            if(!e.composedPath().map(item => item?.classList?.value).includes('container')){
               popup && this.body.removeChild(popup);
            }

        })
    }
    renderInput = (container) => {        
        const colections = Object.keys(this).filter(key => key === 'name' || key === 'login' || key === 'email' || key === 'password')

        colections.map(elem => {
            const formGroup = document.createElement('div');
            formGroup.classList.add('formGroup');
            container.appendChild(formGroup); 
            formGroup.innerHTML = ` <label for="input-${elem}">${elem}</label>
            <input type=${elem === 'email' || elem === 'password' ? elem : 'text' } name=${elem} class="formControl" id="input-${elem}" placeholder="Enter your ${elem}">`
       })
        const labels = [...document.querySelectorAll('label')];
        const inputs = [...document.querySelectorAll('input')];
        inputs.forEach(elem => {
            elem.attributes.type.value === 'email' 
            ? toggleClasses(isTrueRegexp(regexpEmail,  elem.name), elem)
            : toggleClasses(isTrueRegexp(regexpName,  elem.name), elem);
        })
    }
    renderBtn = (container, className, nameBtn = 'Увійти') => {
        const btn = document.createElement('button');
        btn.classList.add('btn',[className]);
        btn.id = className;
        container.appendChild(btn);
        btn.innerText = `${nameBtn}`;
        
    }
    accountEnter = (list, funcRegistr, startGame, heroes, wrapper, startGameBtn) => {
        const login = document.getElementById('input-login')
        const password = document.getElementById('input-password')
        const btn = document.getElementById('btnForm');
        const btnRegistr = document.querySelector('.btnRegistr');
        const popup = document.querySelector('.popup');

        btn.addEventListener('click', () => {
            let arr = list.filter(obj => obj?.login === login?.value ? obj : null);
            if(arr.length === 0 ) {
             alert('Ви не правильно ввели ім\'я, або ви не зареєстровані')
            } else if(arr[0]?.password === password.value  ) {                         
                arr[0].isActive = true;
                localStorage.setItem('list', JSON.stringify(list))
                this.body.removeChild(popup);
                startGame(heroes, wrapper, startGameBtn);
                
            } else {
                alert('Невірний пароль')
            }
        })
        btnRegistr.addEventListener('click', () => {
            this.body.removeChild(popup);
            funcRegistr(list)            
        })
    }

}

export class Registration extends Authorization {
    constructor(name, login, email, password) {
        super(login, password);
        this.name = name;
        this.email = email;
   
    }
    accountEnter = (list, init) => {
        const name = document.getElementById('input-name');
        const login = document.getElementById('input-login');
        const email = document.getElementById('input-email');
        const password = document.getElementById('input-password');
        const btn = document.getElementById('btnForm');
        const btnRegistr = document.querySelector('.btnRegistr');
        const popup = document.querySelector('.popup');
        btnRegistr.addEventListener('click', () => {
            const user = new User(name.value,login.value, email.value, password.value);
            list.push(user);
            localStorage.setItem('list', JSON.stringify(list));            
            this.body.removeChild(popup);
            init()
        })
        btn.disabled = true;
    }

}