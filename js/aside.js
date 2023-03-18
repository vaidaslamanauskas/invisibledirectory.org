const figures = document.querySelectorAll('aside figure');
const randomFigure = Math.floor(Math.random() * figures.length);

figures[randomFigure].style.display = 'block';
console.log(figures[randomFigure]);

const aside = document.querySelector('aside');
const asideOpen = document.querySelector('header > menu button');
const asideClose = document.querySelector('aside > button');

asideOpen.addEventListener('click', () => {
  aside.classList.add('is-open');
  
  document.documentElement.classList.add('has-drapes');
});

asideClose.addEventListener('click', () => {
  aside.classList.remove('is-open');
  
  document.documentElement.classList.remove('has-drapes');
});