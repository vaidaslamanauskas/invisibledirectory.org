const filtersOpen = document.querySelector('header > button');
const filtersClose = document.querySelector('dialog > button');
const filtersBox = document.querySelector('dialog');

filtersOpen.addEventListener('click', () => {
  filtersBox.showModal();
  filtersBox.setAttribute('aria-hidden', false);
});

/* bring back into a close button ..
filtersClose.addEventListener('click', () => {
  filtersBox.close();
  filtersBox.setAttribute('aria-hidden', true);
});
*/

// Topic filtering
const filters = document.querySelectorAll('dialog > menu button');
const filteringBy = document.querySelector('header > button span');

console.log(filters);

for (filter of filters) {
  filter.addEventListener('click', e => {
    showAllBlocks();

    filtersBox.close();

    if (e.target.classList.contains('is-selected')) {
      console.log('selected');
      
      e.target.classList.remove('is-selected');
      
      filteringBy.style.display = 'none';
      filteringBy.innerText = '';
    } else {
      for (filter of filters) {
        filter.classList.remove('is-selected');
      }
      e.target.classList.add('is-selected');

      hideAllBlocks();
      
      filterBlocks(e.target.dataset.type, e.target.dataset.filter);

      filteringBy.style.display = 'block';
      filteringBy.innerText = `“${e.target.childNodes[0].textContent.trim()}”`; // Dirty, but fixes the fact that filter contain SVGs inside

      insertUrlParam(e.target.dataset.type, e.target.dataset.filter);
    }

    filtersBox.setAttribute('aria-hidden', true);

    // restore scroll position when filter is selected or cleared
    window.scrollTo(0,0);
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