const pupils = document.querySelectorAll('.pupil');

// thx to Elliott for unknowingly teaching me most of what I know about javascript ..
// https://elliott.computer

// Eye tracking
window.addEventListener('mousemove', (e) => {
  pupils.forEach((pupil) => {
    
    // Get cursors position
    var rect = pupil.getBoundingClientRect();
    var x = (e.clientX - rect.left) / 96 + 'px';
    var y = (e.clientY - rect.top) / 96 + 'px';
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY
    
    pupil.style.transform = 'translate3d(' + x + ',' + y + ', 0)';
  });
});