const studentList = document.getElementsByClassName('student-item cf');
const numItems = 10;

// Hides all the list items except for ones in a given page
function showPage(list, page) {
   const startIndex = (page * numItems) - numItems;
   let endIndex;
   // Assigns the last page's 'endIndex' to the list's length 
   if (page <= Math.floor(list.length / numItems)) {
      endIndex = page * numItems;
   } else {
      endIndex = list.length;
   }

   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
   }
   for (let i = startIndex; i < endIndex; i++) {
      list[i].style.display = '';
   }
}

// Generates, appends, and adds functionality to the pagination buttons.
function appendPageLinks(list) {
   const pageDiv = document.querySelector('.page')
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   const ul = document.createElement('ul');

   // Number of links depends on the list's length and number of item per page
   for (let i = 1; i <= Math.ceil(list.length / numItems); i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }

   paginationDiv.appendChild(ul);
   pageDiv.appendChild(paginationDiv);

   ul.firstChild.firstChild.className = 'active';

   // Changes class name of 'a' to 'active' and displays the corresponding list items
   ul.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
         const activeLink = ul.querySelector('.active');
         activeLink.className = '';
         event.target.className = 'active';
         const pageNum = event.target.textContent;
         showPage(studentList, pageNum);
      }
   })
}

showPage(studentList, 1);
appendPageLinks(studentList);