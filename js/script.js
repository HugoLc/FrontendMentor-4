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

let ultimoPorcento;/////////////////////////////arrumar

valorConta.addEventListener('keypress', (evento) => {
  if (evento.key == 'Enter') {
    customTip.value ? btReset.focus() : customTip.focus();;

  }
});

customTip.addEventListener('keypress', (evento) =>{
  if (evento.key == 'Enter') {
    qtdPessoas.value ? btReset.focus() : qtdPessoas.focus();
  }
});

qtdPessoas.addEventListener('keypress', (evento)=>{
  if (evento.key == 'Enter') {
    btReset.focus();
  }
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
  if (num && num > 0 && num <= 10000) {
    conta = num;
    mudarResetButton(btReset, false);
    valorConta.value = conta;
  }else if (num > 10000) {
    conta = 10000;
    mudarResetButton(btReset, false);
    valorConta.value = conta;
  }else if (num < 0) {
    conta = parseFloat((num * (-1)).toFixed(2));
    mudarResetButton(btReset, false);
    valorConta.value = conta;
  }else if (valorConta.value == 0) {
    alertarZero(valorConta, zeroConta);
    valorConta.value = '';
    conta = null;
    mudarResetButton(btReset, true);
  }else {
    valorConta.value = '';
    conta = null;
    mudarResetButton(btReset, true);
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
  if (texto && texto > 0 && texto <= 200) {
    tip = parseInt(texto);
    ultimoPorcento = customTip.id;
    texto = tip + '%';
    mudarResetButton(btReset, false);
    customTip.value = texto;
  }else if (texto > 200) {
    tip = 200;
    ultimoPorcento = customTip.id;
    texto = tip + '%';
    mudarResetButton(btReset, false);
    customTip.value = texto;
  }else if (texto < 0) {
    tip = parseInt(texto) * (-1);
    texto = tip + '%';
    ultimoPorcento = customTip.id;
    mudarResetButton(btReset, false);
    customTip.value = texto;
  }else if (customTip.value == 0) {
    alertarZero(customTip, zeroTip, true);
    texto = '';
    customTip.value = '';
    tip = null;
    mudarResetButton(btReset, true);
  }else {
    texto = '';
    customTip.value = texto;
    tip = null;
    mudarResetButton(btReset, true);
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
  if (qtdPessoas.value && qtdPessoas.value > 0 && qtdPessoas.value <= 500) {
    pessoas = parseInt(qtdPessoas.value);
    mudarResetButton(btReset, false);
    qtdPessoas.value = pessoas;
  }else if (qtdPessoas.value > 500) {
    pessoas = 500;
    mudarResetButton(btReset, false);
    qtdPessoas.value = pessoas;
  }else if (qtdPessoas.value < 0) {
    qtdPessoas.value = parseInt(qtdPessoas.value * (-1));
    pessoas = parseInt(qtdPessoas.value);
    mudarResetButton(btReset, false);
  }else if (qtdPessoas.value == 0) {
    alertarZero(qtdPessoas, zeroPessoas);
    qtdPessoas.value = '';
    pessoas = null;
    mudarResetButton(btReset, true);
  }else {
    qtdPessoas.value = '';
    pessoas = null;
    mudarResetButton(btReset, true);
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
    mudarResetButton(btReset, false);
    atualizarResultado(conta, tip, pessoas);
    changeStyle(id);
    ultimoPorcento = id;
    console.log(tip);
  }else {
    changeStyle(id);
    tip = null;
    mudarResetButton(btReset, true);
    console.log(tip);
  }

  qtdPessoas.value ? btReset.focus() : qtdPessoas.focus();

}

function changeStyle(id){
  if (id != null) {
    let botao = document.getElementById(id);
    botao.classList.toggle('bt-porcento-select');
  }
  ultimoPorcento = null;
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

function mudarResetButton(button, disabled){
  if (!disabled) { //ativar
    button.disabled = disabled;
    button.style.opacity = '1';
  }else { //desativar
    if (!conta && !tip && !pessoas) {
      button.disabled = disabled;
      button.style.opacity = '0.7';
    }

  }
}

function resetAll(){
  // conta = null;
  // tip = null;
  // pessoas = null;
  // changeStyle(ultimoPorcento);
  //
  // valorConta.value = '';
  // customTip.value = '';
  // qtdPessoas.value = '';
  //
  // resultTip.innerText = '$0.00';
  // resultTotal.innerText = '$0.00';
  //
  // btReset.style.opacity = '0.2';
  window.location.reload();
}
