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
    <td><a href="#">X</a></td>
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
}

document.getElementById("formData").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("titre").value;
  const auteur = document.getElementById("auteur").value;
  const isbn = document.getElementById("isbn").value;
  let ui = new UI();
  let b = new Book(title, auteur, isbn);
  ui.addBookToList(b);
  ui.showAlert("Livre ajouté !", "alert-success");
  ui.eraseInputs();
});
