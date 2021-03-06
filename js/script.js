'use strict';

const studentList = document.getElementsByClassName('student-item cf');
const pageDiv = document.querySelector('.page');
// number of items listed per page
const numItems = 10;

// General funtion to create, append and add a property to elements
function createElement(elementName, parentNode, property, value) {
  const element = document.createElement(elementName);
  element[property] = value;
  parentNode.appendChild(element);
  return element;
}

// Hides all the list items except for ones in a given page
function showPage(list, page) {
  const startIndex = page * numItems - numItems;
  let endIndex;
  // Makes sure the last page contains the rest of the items
  if (page <= Math.floor(list.length / numItems)) {
    endIndex = page * numItems;
  } else {
    endIndex = list.length;
  }

  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }
  for (let i = startIndex; i < endIndex; i++) {
    list[i].style.display = 'block';
  }
}

// Generates, appends, and adds functionality to the pagination buttons
function appendPageLinks(list) {
  const paginationDiv = createElement('div', pageDiv, 'className', 'pagination');
  const ul = createElement('ul', paginationDiv);

  // Assigns number of pages based on the length of the list
  for (let i = 1; i <= Math.ceil(list.length / numItems); i++) {
    const li = createElement('li', ul);
    const a = createElement('a', li, 'href', '#');
    a.textContent = i;
  }

  // when page first loads, it shows page 1 and link '1' is highlited
  if (ul.firstChild != null) {
    ul.firstChild.firstChild.className = 'active';
  }
  showPage(list, 1);

  // Changes the class name of the target link to active
  // Displays the list items in the target page
  ul.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      const activeLink = ul.querySelector('.active');
      activeLink.className = '';
      event.target.className = 'active';
      const pageNum = event.target.textContent;
      showPage(list, pageNum);
    }
  });
}

// Dynamically creates and appends a search bar
function searchBar() {
  const headerDiv = document.getElementsByClassName('page-header cf')[0];
  const searchForm = createElement('form', headerDiv, 'className', 'student-search');
  const input = createElement('input', searchForm, 'placeholder', 'Search for students...');
  const button = createElement('button', searchForm, 'textContent', 'Search');
  const errorMessage = createElement('p', pageDiv, 'textContent', 'No results found.');
  errorMessage.style.display = 'none';

  // filters the list based on the input provided
  function getSearchResult() {
    const searchTerm = input.value.toLowerCase();
    const searchResults = [];

    for (let i = 0; i < studentList.length; i++) {
      const name = studentList[i].querySelector('h3').textContent;

      if (name.toLowerCase().indexOf(searchTerm) !== -1) {
        studentList[i].style.display = 'block';
        searchResults.push(studentList[i]);
      } else {
        studentList[i].style.display = 'none';
      }
    }

    if (searchResults.length === 0) {
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }

    pageDiv.removeChild(pageDiv.querySelector('.pagination'));
    appendPageLinks(searchResults);
  }

  input.addEventListener('keyup', () => {
    getSearchResult();
  });
  searchForm.addEventListener('submit', () => {
    getSearchResult();
  });
}

searchBar();
appendPageLinks(studentList);
