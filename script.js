const addButton = document.getElementById('add');
const bookAdder = document.getElementById('book-adder');
const submitButton = document.getElementById('submitBook');
const bookTable = document.getElementById('myBooks');
const delBtns = document.querySelectorAll('.delBtn');

function deleteBook(index) {
    myLibrary.splice(index, 1);
    arrangeIndexes();
}

function arrangeIndexes() {
    const delBtns = document.querySelectorAll('.delBtn');
    delBtns.forEach((button,index) => {
        button.setAttribute('data-index', index);
    });
}

function updateTable() {
    let rowsCount = bookTable.rows.length;
    let row = bookTable.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let booksCount = myLibrary.length;
    c1.innerText = myLibrary[booksCount-1].title;
    c2.innerText = myLibrary[booksCount-1].author;
    c3.innerText = myLibrary[booksCount-1].pages;
    let readStatus = document.createElement('div');
    readStatus.classList.add('readStatus');
    if(myLibrary[booksCount-1].read === 'Yes'){
        readStatus.classList.toggle('readCheck');
    } else{
        readStatus.classList.toggle('readUncheck');
    }
    readStatus.dataset.index = booksCount-1;
    checkListener(readStatus);
    c4.appendChild(readStatus);
    let newBtn = document.createElement('button');
    newBtn.innerText = 'Delete';
    newBtn.classList.add('delBtn');
    newBtn.dataset.index = (booksCount - 1);
    addListener(newBtn);
    c5.appendChild(newBtn);
}



function addBook(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);

}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

const myLibrary = [];

myLibrary[0] = new Book('Nineteen Eighty-Four', 'George Orwell', 450, 'Yes');
myLibrary[1] = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 383, 'Yes');
myLibrary[2] = new Book('To Kill a Mockingbird', 'Harper Lee', 289, 'Yes');

function displayBooks() {
    myLibrary.forEach((Book) => console.log(Book.info()));
}

submitButton.addEventListener('click', () => {
    const bookTitle = document.getElementById('title');
    const bookAuthor = document.getElementById('author');
    const bookPages = document.getElementById('pages');
    const bookRead = document.getElementById('select')
    addBook(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
    bookTitle.innerHTML = '';
    bookAuthor.innerHTML = '';
    bookPages.innerHTML = '';
    updateTable();
});

addButton.addEventListener('click', () => {
    bookAdder.style.display = "contents";
} );

function fillTable() {
    myLibrary.forEach((Book, index) => {

        let row = bookTable.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);
        console.log(`${Book.title} by ${Book.author}, ${Book.pages} pages, read`);
        c1.innerText = Book.title;
        c2.innerText = Book.author;
        c3.innerText = Book.pages;
        let readStatus = document.createElement('div');
        readStatus.classList.add('readStatus')
        if(Book.read === 'Yes') {
            readStatus.classList.toggle('readCheck');
        } else {
            readStatus.classList.toggle('readUncheck');
        }
        readStatus.dataset.index = index;
        checkListener(readStatus);
        c4.appendChild(readStatus);
        let newBtn = document.createElement('button');
        newBtn.innerText = 'Delete';
        newBtn.classList.add('delBtn');
        newBtn.dataset.index = index;
        addListener(newBtn);
        c5.appendChild(newBtn);
    })
}

function checkListener(button) {
    button.addEventListener('click', function() {
        let ind = button.getAttribute('data-index');
        console.log(ind);
        if(myLibrary[parseInt(ind)].read === 'Yes') {
            myLibrary[parseInt(ind)].read = 'No';
            button.classList.toggle('readUncheck');
            button.classList.toggle('readCheck');
        }
        else {
            myLibrary[parseInt(ind)].read = 'Yes';
            button.classList.toggle('readCheck');
            button.classList.toggle('readUncheck');
        }
    })
}

function addListener(button) {
    button.addEventListener('click', function() {
        let ind = button.getAttribute('data-index');
        bookTable.deleteRow(parseInt(ind)+1);
        deleteBook(ind);
    });
}

fillTable();

