const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function checkForStorage(){
    return typeof(Storage) !== "undefined";
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null){
        books = data;
    }
    document.dispatchEvent(new Event ("ondataloaded"));
}

function updateDataStorage(){
    if(checkForStorage){
        saveData();
    }
}

function composeBooksObject(title, author, year, isFinished){
    return{
        id : +new Date(),
        title,
        author,
        year,
        isFinished
    };
}

function findBook(bookTitle){
   
    for (book of books){
        if (book.title == bookTitle){
            return book;
        }
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (book of books){
        if(book.id == bookId){
            return index;
        }
        index++;
    }
    return -1;
}

function refreshDataFromStorage(){
    const listUncompleted = document.getElementById(UNFINISHED_BOOK_LIST_ID);
    let listCompleted = document.getElementById(FINISHED_BOOK_LIST_ID);

    for (book of books){
        const newBook = makeContainerCard(book.title,book.author,book.year,book.isFinished);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isFinished){
            listCompleted.append(newBook);
        }else{
            listUncompleted.append(newBook);
        }
    }
}

function removeAllBooks(){
    const listUncompleted = document.getElementById(UNFINISHED_BOOK_LIST_ID);
    let listCompleted = document.getElementById(FINISHED_BOOK_LIST_ID);
    listUncompleted.innerHTML='';
    listCompleted.innerHTML='';
}