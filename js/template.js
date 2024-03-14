
export function generaClone(pageToLoad) {
  let template = document.querySelector(pageToLoad);
  let nuovoNodo = document.createElement('div');
  nuovoNodo.innerHTML = template.innerHTML;
  return nuovoNodo;
}

export function generaTraccia(){
  let template = document.querySelector('#album-track')
  let clone = template.content.cloneNode(true)
  return clone
}

export function generaConsigliati(){
  let template = document.querySelector('#artist-album')
  let clone = template.content.cloneNode(true)
  return clone
}
