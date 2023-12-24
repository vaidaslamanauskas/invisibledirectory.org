const header = document.querySelector('header');
const filtersToggle = document.querySelector('header > button');
const filtersBox = document.querySelector('dialog');

filtersToggle.addEventListener('click', () => {
  if (filtersToggle.dataset.open == 'false') {
    filtersBox.setAttribute('aria-hidden', false);
    header.classList.add('has-tongue');
    
    document.documentElement.classList.add('has-drapes');
    
    filtersToggle.dataset.open = 'true';
    filtersToggle.classList.add('is-active');

    // open sound
    let audio = new Audio('../sounds/open.m4a');
    console.log(audio);
    audio.volume = 1;
    audio.play();

  } else {
    filtersBox.setAttribute('aria-hidden', true);
    header.classList.remove('has-tongue');
    
    document.documentElement.classList.remove('has-drapes');
    
    filtersToggle.dataset.open = 'false';
    filtersToggle.classList.remove('is-active');

    // close sound
    let audio = new Audio('../sounds/close.m4a');
    console.log(audio);
    audio.volume = 1;
    audio.play();
  }
});

// Topic filtering
const filters = document.querySelectorAll('dialog > menu a');
const filteringBy = document.querySelector('header > button span');

console.log(filters);

for (filter of filters) {
  filter.addEventListener('click', e => {
    showAllBlocks();

    if (e.target.classList.contains('is-selected')) {
      console.log('selected');
      
      e.target.classList.remove('is-selected');
      
      filteringBy.style.display = 'none';
      filteringBy.innerText = '';

      // clear filter sound
      let audio = new Audio('../sounds/clear.m4a');
      console.log(audio);
      audio.volume = 1;
      audio.play();

    } else {
      for (filter of filters) {
        filter.classList.remove('is-selected');
      }
      e.target.classList.add('is-selected');

      // select filter sound
      let audio = new Audio('../sounds/select.m4a');
      console.log(audio);
      audio.volume = 0.15; // meh ..
      audio.play();

      hideAllBlocks();
      
      // filterBlocks(e.target.dataset.type + 's', e.target.dataset.filter);
      filterBlocks(e.target.dataset.type, e.target.dataset.filter);

      filteringBy.style.display = 'block';
      filteringBy.innerText = `“${e.target.childNodes[0].textContent.trim()}”`; // Dirty, but fixes the fact that filter contain SVGs inside

      insertUrlParam(e.target.dataset.type, e.target.dataset.filter);
    }

    filtersBox.setAttribute('aria-hidden', true);
    header.classList.remove('has-tongue');
    
    document.documentElement.classList.remove('has-drapes');
    
    filtersToggle.classList.remove('is-active');
    filtersToggle.dataset.open = 'false';

  });
}

function insertUrlParam(key, value) {
  if (history.pushState) {
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?type=' + key + '&filter=' + value;
    window.history.pushState({path: newurl}, '', newurl);
  }
}

function filterBlocks(filterBy, filterQuery) {
  console.log('SHOW', filterBy, filterQuery);

  let blocks = document.querySelectorAll('main > a');

  for (block of blocks) {
    if ((filterBy in block.dataset)) {
      if (block.dataset[filterBy].includes(filterQuery)) {
        block.style.display = 'block';
      }
    }
  }
}

function showAllBlocks() {
  console.log('-- SHOW ALL');
  let blocks = document.querySelectorAll('main > a');

  for (block of blocks) {
    block.style.display = 'block';
  }

  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState({path: newurl}, '', newurl);
}

function hideAllBlocks() {
  console.log('HIDE ALL');
  
  let blocks = document.querySelectorAll('main > a');

  for (block of blocks) {
    block.style.display = 'none';
  }
}

// Query filtering
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('type')) {
  const typeParam = urlParams.get('type');
  const filterParam = urlParams.get('filter');

  for (filter of filters) {
    if (filter.dataset.filter == filterParam) {
      filter.click();
    }
  }
}