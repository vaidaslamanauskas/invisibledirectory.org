const pupils = document.querySelectorAll('.pupil');

// Eye tracking
window.addEventListener('mousemove', (e) => {
  pupils.forEach((pupil) => {
    
    // Get cursors position
    var rect = pupil.getBoundingClientRect();
    var x = (e.clientX - rect.left) / 80 + 'px';
    var y = (e.clientY - rect.top) / 80 + 'px';
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY
    
    pupil.style.transform = 'translate3d(' + x + ',' + y + ', 0)';
  });
});