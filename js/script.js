const valorConta = document.getElementById('id-valor-conta');
const customTip = document.getElementById('id-custom-tip');
const qtdPessoas = document.getElementById('id-qtd-pessoas');

var conta;
var custom;
var pessoas;


function contaFocusOut(){
  valorConta.placeholder = '0';
  var num = parseFloat(valorConta.value);
  num = num.toFixed(2);
  num = parseFloat(num);
  if (num && num > 0) {
    conta = num;
    valorConta.value = conta;
  }else if (num < 0) {
    conta = parseFloat((num * (-1)).toFixed(2));
    valorConta.value = conta;
  }else {
    valorConta.value = '';
  }
  console.log(conta);
}


function customOnFocus(){
  customTip.placeholder = '';
  customTip.type = 'number';
}

function customFocusOut(){
  customTip.placeholder = 'Custom';
  customTip.type = 'text';
  texto = customTip.value;
  if (texto && texto > 0) {
    custom = parseInt(texto);
    texto = custom + '%';
    customTip.value = texto;

  }else if (texto < 0) {
    custom = parseInt(texto) * (-1);
    texto = custom + '%';
    customTip.value = texto;

  }else {
    texto = '';
    customTip.value = texto;
  }
  console.log(custom);
}

function qtdPessoasFocusOut(){
  qtdPessoas.placeholder = '0';
  if (qtdPessoas.value && qtdPessoas.value > 0) {
    pessoas = parseInt(qtdPessoas.value);
  }else if (qtdPessoas.value < 0) {
    qtdPessoas.value = parseInt(qtdPessoas.value * (-1));
    pessoas = parseInt(qtdPessoas.value);

  }else {
    qtdPessoas.value = '';
  }
  console.log(pessoas);
}

function convertToInt(valor){
  var num = valor;
  num = parseInt(num);
  return num;
}
