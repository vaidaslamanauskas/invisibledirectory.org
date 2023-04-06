var favicons = [
  '/gaze.png',
  '/gaze-left.png',
  '/gaze-right.png'
],

// To keep track of the current image
counter = 0;

setInterval(function() {

  // Remove current favicon
  if(document.querySelector("link[rel='icon']") !== null)
     document.querySelector("link[rel='icon']").remove();

  // Add new favicon image
  document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="icon" type="image/png" href="' + favicons[counter] + '">');

  // If last image then goto first image
  // Else go to next image    
  if(counter == favicons.length -1)
     counter = 0;
  else
    counter++;
}, 2000);