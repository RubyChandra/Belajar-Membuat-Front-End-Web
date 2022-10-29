const UNFINISHED_BOOK_LIST_ID = "unfinished";
const FINISHED_BOOK_LIST_ID = "finished";
const BOOK_ITEMID = "bookId";

function addBook(){
    const unfinishedBookList = document.getElementById(UNFINISHED_BOOK_LIST_ID);
    const finishedBookList = document.getElementById(FINISHED_BOOK_LIST_ID);

    const bookTitle = document.getElementById("title").value;
    const authorName = document.getElementById("author").value;
    const yearPublished = document.getElementById("year").value;
    const isFinished = document.getElementById("finished-reading").checked;

    const bookDetails = makeContainerCard(bookTitle,authorName,yearPublished,isFinished);
    const bookObject = composeBooksObject(bookTitle,authorName,yearPublished,isFinished);

    bookDetails[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);


    if (isFinished){
        finishedBookList.append(bookDetails);
    }else{
        unfinishedBookList.append(bookDetails);
    }

    updateDataStorage();
}

function makeContainerCard(data,author,year,isFinished){
    const row = document.createElement("div");
    row.classList.add("row");
   
    const col = document.createElement("div");
    col.classList.add("col-md-10", "mx-auto");
   
    const card = document.createElement("div");
    card.classList.add("card");
   
    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("card-header");
    bookTitle.innerHTML = "<span class = title>" +data+"</span> (<span class = year>" + year + "</span>)";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardText = document.createElement("p");
    cardText.classList.add("card-text")
    cardText.innerHTML = "Penulis: <span class=author>"+author+"</span>";

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "text-right");

    cardBody.append(cardText);

    if (isFinished){
        cardFooter.append(createUndoButton());
        cardFooter.append(createTrashButton());
    }else{
        cardFooter.append(createCheckButton());
        cardFooter.append(createTrashButton());
    }

    card.append(bookTitle,cardBody,cardFooter);

    col.append(card);

    row.append(col);

    return row;
}
function addToFinished(bookElement){
    const listFinished = document.getElementById(FINISHED_BOOK_LIST_ID);
    
    const bookTitle = bookElement.querySelector("span.title").innerHTML;
    const bookAuthor = bookElement.querySelector("span.author").innerHTML;
    const bookYear = bookElement.querySelector("span.year").innerHTML;

    const newBookDetails = makeContainerCard(bookTitle,bookAuthor,bookYear,true);

    
    const book = findBook(bookTitle);
    
    book.isFinished = true;

    newBookDetails[BOOK_ITEMID] = book.id;

    listFinished.append(newBookDetails);
    bookElement.remove();
    updateDataStorage();
}

function undoBookFromFinished (bookElement){
    const listUnfinished = document.getElementById(UNFINISHED_BOOK_LIST_ID);
   
    const bookTitle = bookElement.querySelector("span.title").innerHTML;
    const bookAuthor = bookElement.querySelector("span.author").innerHTML;
    const bookYear = bookElement.querySelector("span.year").innerHTML;

    const newBookDetails = makeContainerCard(bookTitle,bookAuthor,bookYear,false);
    const book = findBook(bookTitle);
    book.isFinished = false;
    newBookDetails[BOOK_ITEMID]=book.id;
    listUnfinished.append(newBookDetails);
    bookElement.remove();
    updateDataStorage();
}

function removeBook (bookElement){
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition,1);
    bookElement.remove();
    updateDataStorage();
}

function createButton (buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(ev){
        eventListener(ev);
    })
    return button;
}

function createCheckButton (){
    return createButton("check-button", function(ev){
        addToFinished(ev.target.parentElement.parentElement);
    });
}

function createTrashButton (){
    return createButton("trash-button", function(ev){
        if (confirm("Apakah yakin untuk menghapus buku ini?")==true){
        removeBook(ev.target.parentElement.parentElement);
        }
    });
}

function createUndoButton (){
    return createButton("undo-button", function(ev){
        undoBookFromFinished(ev.target.parentElement.parentElement);
    })
}