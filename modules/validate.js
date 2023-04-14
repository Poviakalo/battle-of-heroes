export const createFleshError = (name, input) => {
    let fleshError = document.createElement('span');
    fleshError.classList.add('order__form-fleshError')
    fleshError.innerText = `Введіть коректно ${name}`
    input.parentNode.appendChild(fleshError)
    setTimeout(() => fleshError.remove(), 1000)
}
export const toggleClasses = (bool, input) => {
    if(bool) {
        input.classList.add('order__input-validate')
        input.parentNode.classList.add('valid')
        input.parentNode.classList.remove('error')        
        input.classList.remove('order__input-error')
    } else {
        input.classList.add('order__input-error') 
        input.parentNode.classList.add('error')
        input.parentNode.classList.remove('valid')
        input.classList.remove('order__input-validate') 
        createFleshError(input.attributes.name?.value, input)
    }         
}

export const isTrueRegexp = (regexp, value) => {
    return regexp.test(value)
}
export const isValid = (labels) => {
    let arr = labels.map(label => (
        label.parentNode.lastElementChild.tagName === 'SPAN' ? 'error' : 'validate'
    ));
}
