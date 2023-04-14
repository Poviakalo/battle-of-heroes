class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`helth-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elItem = document.getElementById(`${name}`);
    }
}

class Fighter extends Selectors {
    constructor( { name, hp, type, selectors } ) {  
        super(selectors);      
        this.name = name;
        this.hp = {
                current: hp,
                total: hp,
            }
        this.type = type;

        this.renderHP();
        this.renderName();
        this.renderImg();
    }

    changeHP = (count, btn, btnNext, numLevel, enemy, score) => {
        this.hp.current -= count;

        if( this.hp.current <= 0 ) {
            this.hp.current = 0;
            btn.disabled = true;  


            this.elItem.classList.add('crossOut');
            btnNext.style.display = 'block';
            if(this.type === 'kozak') {
                btnNext.innerText = 'reset'
                setTimeout(() => {
                    alert(`${this.name} - ти програв!!! Спробуй свою удачу наступного разу`)
                }, 1000 )
        }  
            
            if(numLevel === 5) {
                btnNext.innerText = 'Грати ще раз';
                
               setTimeout(() => {
                    alert(`Гру завершено! Переміг ${enemy} набравши ${score + 1} очок`)
                }, 1000 )  
            }  
        }            
        this.renderHP();              
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }
    
    renderHPLife = () => {
        const { elHP, hp: {current, total} } = this;
        elHP.innerText = current + '/' + total;
    }
    
    renderProgressbarHP = () => {
        const {hp: {current, total}, elProgressbar} = this;
        const procent = current / (total / 100);
        elProgressbar.style.width = `${procent}%`;
    }

    renderImg = () => {
        const { elImg, name } = this;
        elImg.src = `./img/${name}.png`

    }
    renderName = () => {
        const { elName, name } = this;
        elName.innerText = `${name}`;
    }
    
}

export default Fighter;


export class Kozak extends Fighter {
    constructor( { name, hp, type, selectors, powerMax, powerMin }) {   
        super( {name, hp, type, selectors} );

        this.powerMax = powerMax;
        this.powerMin = powerMin;
    }
    changeRecord = () => {

    }
}