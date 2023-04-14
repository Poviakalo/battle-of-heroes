export function random ( max = 100, min = 0) {
    return Math.ceil(Math.random() * (max - min) + min)
}


export function findAndRemoveClassName (item, className) {
    item?.elItem?.className.split(' ').includes(className) 
     ? item.elItem.classList.remove(className)
     : true 
 }

 export const closeOuterPopup = (event, parent, child, className) => {
    if(!event.composedPath().map(item => item?.classList?.value).includes(className)){
        parent.removeChild(child);
    } 
}