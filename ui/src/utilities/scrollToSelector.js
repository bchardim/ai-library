function scrollTo(selectors, x, y) {
  let elem = document.querySelector(selectors);
  if (elem && elem.scrollTo) {
    elem.scrollTo(x,y);
  }
}


export default scrollTo;
