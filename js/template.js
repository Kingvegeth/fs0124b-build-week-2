
export function generaClone(pageToLoad) {
    let templateHome = document.querySelector(pageToLoad);
    let clone = templateHome.content.cloneNode(true);
    return clone;
  }