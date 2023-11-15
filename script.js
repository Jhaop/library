const addButton = document.getElementById('add');
const bookAdder = document.getElementById('book-adder');
const submitButton = document.getElementById('submitBook');
const bookTable = document.getElementById('myBooks');
const delBtns = document.querySelectorAll('.delBtn');

function deleteBook(index) {
    myLibrary.deleteBook(index);
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
    let booksCount = myLibrary.bookCounter();
    let book = myLibrary.getBook(booksCount-1);
    c1.innerText = book.title;
    c2.innerText = book.author;
    c3.innerText = book.pages;
    let readStatus = document.createElement('div');
    readStatus.classList.add('readStatus');
    if(book.read === 'Yes'){
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
    myLibrary.addBook(new Book(title, author, pages, read));

}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    get bookTitle() {
        return this.title;
    }
    set bookTitle(title) {
        this.title = title;
    }
    get bookAuthor() {
        return this.author;
    }
    set bookAuthor(author) {
        this.author = author;
    }
    get bookPages() {
        return this.pages;
    }
    set bookPages(pages) {
        this.pages = pages;
    }
    get bookRead() {
        return this.read;
    }
    set bookRead(read) {
        this.read = read;
    }
}

/*function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}*/

class Library {
    collection = [];
    constructor() {
        this.collection[0] = new Book('Nineteen Eighty-Four', 'George Orwell', 450, 'Yes');
        this.collection[1] = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 383, 'Yes');
        this.collection[2] = new Book('To Kill a Mockingbird', 'Harper Lee', 289, 'Yes');
    }

    addBook(book) {
        this.collection[this.collection.length] = book;
    }

    displayBooks() {
        for(let i = 0; i < this.collection.length; i++) {
            console.log(this.collection[i].info());      
        }
    }

    bookCounter() { return this.collection.length; }

    getBook(index) { return this.collection[index]; }

    deleteBook(index) {
        this.collection.splice(index, 1);
    }
    updateBook(book, index) {
        this.collection[index] = book;
    }
}

const myLibrary = new Library();

/*myLibrary[0] = new Book('Nineteen Eighty-Four', 'George Orwell', 450, 'Yes');
myLibrary[1] = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 383, 'Yes');
myLibrary[2] = new Book('To Kill a Mockingbird', 'Harper Lee', 289, 'Yes');

function displayBooks() {
    myLibrary.forEach((Book) => console.log(Book.info()));
}*/

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
    let totalBooks = myLibrary.bookCounter();
    for(let i = 0; i < totalBooks; i++) {
        let book = myLibrary.getBook(i);
        let row = bookTable.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);
        c1.innerText = book.title;
        c2.innerText = book.author;
        c3.innerText = book.pages;
        let readStatus = document.createElement('div');
        readStatus.classList.add('readStatus')
        if(book.read === 'Yes') {
            readStatus.classList.toggle('readCheck');
        } else {
            readStatus.classList.toggle('readUncheck');
        }
        readStatus.dataset.index = i;
        checkListener(readStatus);
        c4.appendChild(readStatus);
        let newBtn = document.createElement('button');
        newBtn.innerText = 'Delete';
        newBtn.classList.add('delBtn');
        newBtn.dataset.index = i;
        addListener(newBtn);
        c5.appendChild(newBtn);
    }
}
/*
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
}*/
/*
function checkListener(button) {
    button.addEventListener('click', function() {
        let ind = button.getAttribute('data-index');
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
}*/

function checkListener(button) {
    button.addEventListener('click', function (){
        let index = button.getAttribute('data-index');
        let book = myLibrary.getBook(index);
        if(book.read === 'Yes') {
            book.read = 'No';
            button.classList.toggle('readUncheck');
            button.classList.toggle('readCheck');
        }
        else {
            book.read = 'Yes';
            button.classList.toggle('readCheck');
            button.classList.toggle('readUncheck');
        }
        myLibrary.updateBook(book, index);
    });
}

function addListener(button) {
    button.addEventListener('click', function() {
        let ind = button.getAttribute('data-index');
        bookTable.deleteRow(parseInt(ind)+1);
        deleteBook(ind);
    });
}

fillTable();

