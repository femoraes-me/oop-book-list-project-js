class Book {
    constructor(title, author, cod) {
        this.title = title;
        this.author = author;
        this.cod = cod;
    }
}

class UI {
    
    // método para adicionar o livro na lista
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // criando elemento de linha 'tr'
        const row = document.createElement('tr');
        // inserindo as colunas dentro da linha
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.cod}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    // método para limpar campos do formulário
    cleanFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('cod').value = '';
    }

    // método para exibir mensagens para o usuário
    showAlert(message, className) {
        // criando div
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        // inserindo a div dentro da interface
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        
        // remover alerta depois de 3 segundos
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // método para remover livro da lista
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {
    
    // método para pegar array de livros
    static getBooks() {        
        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    // método para adicionar livros ao array
    static addBook(book) {

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    // método para criar lista de livros do array
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            ui.addBookToList(book);
        })
    }

    // método para remover livros do array
    static removeBook(cod, index) {
        const books = Store.getBooks();

        books.forEach(function(book){
            if (book.cod = cod) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Evento para carregamento da DOM
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listner para adicionar livro a lista
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const cod = document.getElementById('cod').value;

    // Instanciando o objeto livro
    const book = new Book(title, author, cod);
    
    // Instanciando o objeto de interface
    const ui = new UI();

    // validando o preenchimento no formulário
    if (title === '' || author === '' || cod === '') {
        ui.showAlert('Por favor, preencha todos os campos', 'error');
    } else {
        // passando livro para adição na interface
        ui.addBookToList(book);

        // adicionando ao LS
        Store.addBook(book);

        // limpando campos do formulário
        ui.cleanFields();

        // mensagem de sucesso
        ui.showAlert('Livro adicionado com sucesso!', 'success');
    }    

    e.preventDefault();
});

// Event Listner para remover livro a lista
document.getElementById('book-list').addEventListener('click', function(e) {

    // Instanciando o objeto de interface
    const ui = new UI();
    
    ui.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Livro removido com sucesso!', 'success');
    
    e.preventDefault();
});