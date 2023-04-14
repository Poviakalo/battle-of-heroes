export function authorization (  parent, firstChild, list, removeElem, func1, funcRegistr) {
    const popup = document.createElement('div');
    popup.classList.add('popup');    
    parent.insertBefore(popup, firstChild);

    const container = document.createElement('div');
    container.classList.add('container');
    popup.appendChild(container);

    container.innerHTML = `
        <h1 class="formTitle">${"Авторизація"}</h1>
            <div class="formGroup">
                <label for="inputName">Логін</label>
                <input type="text" class="formControl" id="inputName" placeholder="Enter your login">
            </div>
            <div class="formGroup">
                <label for="inputPassword">Пароль</label>
                <input type="password" class="formControl" id="inputPassword" placeholder="Password">
            </div>
            <button class="btn btnForm" id="btnForm">Увійти</button>
            <button class="toggleForm">Зареєструватись</button>`
        
        const login = document.getElementById('inputName')
        const password = document.getElementById('inputPassword')
        const btn = document.getElementById('btnForm');
        const linkRegistr = document.querySelector('.toggleForm');

        linkRegistr.addEventListener('click', () => {
            funcRegistr()
        })

        btn.addEventListener('click', () => {
            let arr = list.filter(obj => obj.login === login.value)
           if(arr.length === 0 ){
            alert('Ви не зареєстровані')
           } else {
            if(arr[0].password === password.value ) {
                arr[0].isActive = true;
                parent.removeChild(popup);                
                func1(removeElem)  // chooseHero(heroes, wrapper, startGame)
            } else {
                console.log('Невірний пароль')
            } 
           }
           console.log(list)
        })

    
    popup.addEventListener('click', (e) => {           
        closeOuterPopup(e, parent, popup, 'container');
    })
}

function closeOuterPopup (event, parent, child, className) {
    if(!event.composedPath().map(item => item?.classList?.value).includes(className)){
        parent.removeChild(child);
    } 
}