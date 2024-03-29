// Display random figure from DOM
const figures = document.querySelectorAll('aside figure');
const randomFigure = Math.floor(Math.random() * figures.length);

figures[randomFigure].style.display = 'block';
console.log(figures[randomFigure]);