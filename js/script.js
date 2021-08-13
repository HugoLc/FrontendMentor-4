const valorConta = document.getElementById('id-valor-conta');
const customTip = document.getElementById('id-custom-tip');
const qtdPessoas = document.getElementById('id-qtd-pessoas');

var conta;
var custom;
var pessoas;


function contaFocusOut{
  valorConta.placeholder = '0';
}


function customOnFocus(){
  customTip.placeholder = '';
  customTip.type = 'number';
}

function customFocusOut(){
  customTip.placeholder = 'Custom';
  customTip.type = 'text';
  texto = customTip.value;
  if (texto) {
    custom = parseInt(texto);
    console.log(custom);
    texto = texto + '%';
  }
  customTip.value = texto;
}

function qtdPessoasFocusOut(){
  qtdPessoas.placeholder = '0';
  if (qtdPessoas.value) {
    qtdPessoas.value = convertToInt(qtdPessoas.value);
    pessoas = parseInt(qtdPessoas.value);
    console.log(pessoas);
  }
}

function convertToInt(valor){
  var num = valor;
  num = parseInt(num);
  return num;
}
