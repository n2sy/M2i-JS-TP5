// V2
// class Book {
//     title;
//     author;
//     isbn;
//     constructor(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//     }
// }

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

class UI {
  addBookToList(book) {
    const liste = document.getElementById("book-list");
    const ligne = document.createElement("tr");
    ligne.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    liste.appendChild(ligne);
  }
  eraseInputs() {
    document.getElementById("titre").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("isbn").value = "";
  }
  showAlert(message, nomDeLaClasseCSS) {
    let newAlert = document.createElement("div");
    newAlert.className = `alert ${nomDeLaClasseCSS}`;
    newAlert.textContent = message;

    let divContainer = document.querySelector(".container");
    let form = document.getElementById("formData");
    divContainer.insertBefore(newAlert, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2500);
  }
  deleteBook(cible) {
    cible.parentElement.parentElement.remove();
  }
}

class Store {
  static getBooks() {
    let books = localStorage.getItem("allBooks");
    if (books == null)
      // if(!books)
      return [];
    else {
      return JSON.parse(books);
    }
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("allBooks", JSON.stringify(books));
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      let ui = new UI();
      ui.addBookToList(book);
    });
  }
  static removeBook(bookId) {
    const books = Store.getBooks();
    let i = books.findIndex((b) => b.isbn == bookId);
    books.splice(i, 1);
    localStorage.setItem("allBooks", JSON.stringify(books));
  }
}

Store.displayBooks();

document.getElementById("formData").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("titre").value;
  const auteur = document.getElementById("auteur").value;
  const isbn = document.getElementById("isbn").value;
  let ui = new UI();

  if (title == "" || auteur == "" || isbn == "" || title.length < 3) {
    ui.showAlert("Veuillez vérifier vos données", "alert-warning");
  } else {
    let b = new Book(title, auteur, isbn);
    ui.addBookToList(b);
    Store.addBook(b);
    ui.showAlert("Livre ajouté !", "alert-success");
    ui.eraseInputs();
  }
});

document.getElementById("book-list").addEventListener("click", (e) => {
  console.log(e);
  let ui = new UI();
  if (e.target.className == "delete") {
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.deleteBook(e.target);
    ui.showAlert("Livre supprimé !", "alert-danger");
  } else {
    ui.showAlert("Veuillez cliquer sur le X pour supprimer !", "alert-info");
  }
});
