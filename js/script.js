const valorConta = document.getElementById('id-valor-conta');
const customTip = document.getElementById('id-custom-tip');
const qtdPessoas = document.getElementById('id-qtd-pessoas');

const zeroConta = document.getElementById('zero-conta');
const zeroTip = document.getElementById('zero-tip');
const zeroPessoas = document.getElementById('zero-pessoas');

const resultTip = document.getElementById('id-result-tip');
const resultTotal = document.getElementById('id-result-total');

const btReset = document.getElementById('id-bt-reset');

var conta;
var tip;
var pessoas;

let ultimoPorcento;

document.addEventListener('click', (e) =>{
  let targetElem = e.target;

  if (targetElem.id != ultimoPorcento){
    if (targetElem.id != valorConta.id && targetElem.id != qtdPessoas.id) {
      if (ultimoPorcento) {
        changeStyle(ultimoPorcento);
        tip = null;
        ultimoPorcento = null;
        console.log(tip);
      }
    }
  }
});

document.addEventListener('change', ()=>{
  console.log('teve mudança');
//  if (conta || tip || pessoas) {
    console.log('entrei');
    btReset.style.opacity = '1';
//  }
})

function contaOnFocus(){
  valorConta.placeholder = '';
  valorConta.value = '';
  retornarPadrao(valorConta, zeroConta);
}

function contaFocusOut(){
  retornarPadrao(valorConta, zeroConta, false);
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
  }else if (valorConta.value == 0) {
    alertarZero(valorConta, zeroConta);
    valorConta.value = '';
    conta = null;
  }else {
    valorConta.value = '';
    conta = null;
  }
  console.log(conta);
  atualizarResultado(conta, tip, pessoas);
}


function customOnFocus(){
  retornarPadrao(customTip, zeroTip, true, true);
  customTip.placeholder = '';
  customTip.type = 'number';
  customTip.placeholder = '';
  customTip.value = '';
  if (ultimoPorcento) {
    changeStyle(ultimoPorcento);
    ultimoPorcento = null;
  }
}

function customFocusOut(){
  retornarPadrao(customTip, zeroTip, false, true);
  customTip.placeholder = 'Custom';
  customTip.type = 'text';
  texto = customTip.value;
  if (texto && texto > 0) {
    tip = parseInt(texto);
    texto = tip + '%';
    customTip.value = texto;

  }else if (texto < 0) {
    tip = parseInt(texto) * (-1);
    texto = tip + '%';
    customTip.value = texto;
  }else if (customTip.value == 0) {
    alertarZero(customTip, zeroTip, true);
    texto = '';
    customTip.value = '';
    tip = null;
  }else {
    texto = '';
    customTip.value = texto;
    tip = null;
  }
  console.log(tip);
  atualizarResultado(conta, tip, pessoas);
}

function qtdPessoasOnFocus(){
  retornarPadrao(qtdPessoas, zeroPessoas);
  qtdPessoas.placeholder = '';
  qtdPessoas.value = '';
}

function qtdPessoasFocusOut(){
  retornarPadrao(qtdPessoas, zeroPessoas, false);
  qtdPessoas.placeholder = '0';
  if (qtdPessoas.value && qtdPessoas.value > 0) {
    pessoas = parseInt(qtdPessoas.value);
    qtdPessoas.value = pessoas;
  }else if (qtdPessoas.value < 0) {
    qtdPessoas.value = parseInt(qtdPessoas.value * (-1));
    pessoas = parseInt(qtdPessoas.value);
  }else if (qtdPessoas.value == 0) {
    alertarZero(qtdPessoas, zeroPessoas);
    qtdPessoas.value = '';
    pessoas = null;
  }else {
    qtdPessoas.value = '';
    pessoas = null;
  }
  console.log(pessoas);
  atualizarResultado(conta, tip, pessoas);
}

function convertToInt(valor){
  var num = valor;
  num = parseInt(num);
  return num;
}

function atualizarResultado(con, tip, pes){
  if (con && tip && pes) { //se nenhum der null
    var tipPessoa;
    var totalPessoa;

    var contaComTip = con * ((tip / 100) + 1);
    totalPessoa = contaComTip / pes;

    var somenteTip = con * (tip / 100);
    tipPessoa = somenteTip / pes
    alterarPreco(tipPessoa, totalPessoa)
  }
}

function alterarPreco(tipPessoa, totalPessoa){
  resultTip.innerText = '$'+tipPessoa.toFixed(2);
  resultTotal.innerText = '$'+totalPessoa.toFixed(2);
}

function getTip(num, id){
  retornarPadrao(customTip, zeroTip, false, true);
  customTip.value = '';
  if (id != ultimoPorcento){
    if (ultimoPorcento != null) {
      changeStyle(ultimoPorcento);
    }
    tip = num;
    btReset.style.opacity = '1';
    atualizarResultado(conta, tip, pessoas);
    changeStyle(id);
    ultimoPorcento = id;
    console.log(tip);
  }else {
    changeStyle(id);
    tip = null;
    console.log(tip);
  }
}

function changeStyle(id){
  ultimoPorcento = null;
  let botao = document.getElementById(id);
  botao.classList.toggle('bt-porcento-select');
}

function retornarPadrao(campo, zero, focus = true, custom = false){
  zero.style.visibility = 'hidden';
  if (!custom) {
    let container = campo.parentElement;
    focus ? container.style.border = '2px solid hsl(172, 67%, 45%)' : container.style.border = 'none';
  }else {
    focus ? campo.style.border = '2px solid hsl(172, 67%, 45%)' : campo.style.border = 'none';
  }
}

function alertarZero(campo, zero, custom = false){
  zero.style.visibility = 'visible';
  if (!custom) {
    let container = campo.parentElement;
    container.style.border = '2px solid red';
  }else {
    campo.style.border = '2px solid red';
  }
}

function resetAll(){
  conta = null;
  tip = null;
  pessoas = null;
  changeStyle(ultimoPorcento);

  valorConta.value = '';
  customTip.value = '';
  qtdPessoas.value = '';

  resultTip.innerText = '$0.00';
  resultTotal.innerText = '$0.00';

  btReset.style.opacity = '0.2';
}
