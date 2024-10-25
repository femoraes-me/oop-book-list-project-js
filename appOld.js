// Método Construtor Livro
function Book(title, author, cod) {
    this.title = title;
    this.author = author;
    this.cod = cod;
}

// Método Construtor da Interface
function UI() {}

// propriedade da interface para adicionar o livro na lista
UI.prototype.addBookToList = function(book) {
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

};

// prototype para limpar campos do formulário
UI.prototype.cleanFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('cod').value = '';
};

// prototype para exibir mensagens para o usuário
UI.prototype.showAlert = function(message, className) {
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
};


// prototype para remover livro da lista
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

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

    ui.showAlert('Livro removido com sucesso!', 'success');
    
    e.preventDefault();
});