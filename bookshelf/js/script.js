document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");
    const submitSearch = document.getElementById("search-form");
    submitForm.addEventListener("submit", function(ev){
        ev.preventDefault();
        addBook();
        submitForm.reset();
        alert("Data buku berhasil disimpan")
    });

    if (checkForStorage()){
        loadDataFromStorage();
    }

    submitSearch.addEventListener("submit",function(ev){
        ev.preventDefault();
        const searchTitle = document.getElementById("search-title").value;
        const listUncompleted = document.getElementById(UNFINISHED_BOOK_LIST_ID);
        let listCompleted = document.getElementById(FINISHED_BOOK_LIST_ID);
        book = findBook(searchTitle);
        if (book != null){
            newBook = makeContainerCard(book.title,book.author,book.year,book.isFinished);
            removeAllBooks();
            if (book.isFinished){
                listCompleted.append(newBook);
            }else{
                listUncompleted.append(newBook);
            }
        }else{
            alert("Tidak ditemukan buku dengan judul yang serupa.")
        }
    })
});

document.addEventListener("ondatasaved",()=>{
    console.log("Data berhasil disimpan");
})

document.addEventListener("ondataloaded",()=>{
    refreshDataFromStorage();
})