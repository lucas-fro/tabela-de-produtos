var tbody = document.getElementById('tbody');
var id = 1;

var inputProduto = document.getElementById('produto');
var inputValor = document.getElementById('valor');


inputValor.addEventListener("keydown", function(tecla) {
    if (tecla.keyCode === 13) {
        adicionarProduto();
    }
});

function adicionarProduto() {
    var produto = inputProduto.value;
    var valor = Number(parseFloat(inputValor.value)).toFixed(2);

    if (produto !== '' && valor !== '') {
        var newRow = tbody.insertRow();
        newRow.id = 'Row' + id;

        const idCell = newRow.insertCell(0);
        idCell.innerHTML = id;

        const produtoCell = newRow.insertCell(1);
        produtoCell.innerHTML = produto;

        const valorCell = newRow.insertCell(2);
        valorCell.innerHTML = 'R$ ' + valor.replace(".", ',');

        const acoes = newRow.insertCell(3);
        acoes.className = 'acoesCell'

        let btnEditar = document.createElement('button');
        btnEditar.className = 'btnAcoes btnEditar'
        btnEditar.innerHTML = '<img src="imagens/pencil-square.svg"/>'
        btnEditar.onclick = () => {
            editarRow(newRow.id);
        };

        acoes.appendChild(btnEditar);
        
        let btnExcluir = document.createElement('button');
        btnExcluir.className = 'btnAcoes btnExcluir'
        btnExcluir.innerHTML = '<img src="imagens/trash.svg"/>';
        btnExcluir.onclick = () => {
            excluirRow(newRow.id);
        };

        acoes.appendChild(btnExcluir);

        inputProduto.value = '';
        inputValor.value = '';
        id++;
    } else {
        alert('Preencha todos os campos');
    }
}

function limparLista(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
    id = 1;
}

function editarRow(rowId){
    const row = document.getElementById(rowId);

    const produtoCell = row.cells[1];
    const valorCell = row.cells[2];

    let produto = prompt('Digite o novo nome do produto:', produtoCell.innerHTML);
    let valor = parseFloat(prompt('Digite o novo valor do produto:', valorCell.innerHTML)).toFixed(2);

    if (produto !== null) {
        if (valor !== null && !isNaN(valor)) {
            valor = 'R$ ' + valor;
        } else {
            valor = 'R$ 0.00';
        }
        produtoCell.innerHTML = produto || '--------';
        valorCell.innerHTML = valor;
    }
}

function excluirRow(rowId){
    const row = document.getElementById(rowId);
            row.remove();
}