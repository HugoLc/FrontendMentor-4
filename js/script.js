const valorConta = document.getElementById('id-valor-conta');
const customTip = document.getElementById('id-custom-tip');
const qtdPessoas = document.getElementById('id-qtd-pessoas');


// qtdPessoas.onfocusout = function(){
//   // this.placeholder = '0';
//   var texto = qtdPessoas.value;
//   console.log('oi');
// }
//
// function checarValor(arr) {
//   var penultimoValor = arr[arr.length - 2];
//   console.log(penultimoValor);
// }

function qtdPessoasFocusOut(){
  qtdPessoas.placeholder = '0';
  qtdPessoas.value = convertToInt(qtdPessoas.value);
}

function convertToInt(valor){
  var num = valor;
  num = parseInt(num);
  return num;
}
