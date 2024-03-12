
export function generaClone(pageToLoad) {
  let template = document.querySelector(pageToLoad);
  let nuovoNodo = document.createElement('div');
  nuovoNodo.innerHTML = template.innerHTML;
  return nuovoNodo;
}