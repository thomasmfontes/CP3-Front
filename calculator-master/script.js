const visor = document.getElementById('result');
const botoes = document.querySelectorAll('.btn');

let operador = '';
let limparVisor = false;

botoes.forEach(botao => {
  botao.addEventListener('click', () => tratarEntrada(botao.value));
});

function tratarEntrada(valor) {
  if (!isNaN(valor)) {
    adicionarNumero(valor);
  } else if (['+', '-', 'x', '/'].includes(valor)) {
    definirOperador(valor);
  } else if (valor === '=') {
    calcularResultado();
  } else if (valor === 'C') {
    limparTudo();
  } else if (valor === '.') {
    adicionarPonto();
  }
}

function adicionarNumero(numero) {
  if (limparVisor) {
    visor.value = '';
    limparVisor = false;
  }
  visor.value += numero;
}

function adicionarPonto() {
  if (limparVisor) {
    visor.value = '0';
    limparVisor = false;
  }
  const partes = visor.value.split(' ');
  const ultimo = partes[partes.length - 1];
  if (!ultimo.includes('.')) {
    visor.value += '.';
  }
}

function definirOperador(simbolo) {
  if (visor.value === '' || operador) return;
  visor.value += ` ${simbolo} `;
  operador = simbolo;
  limparVisor = false;
}

function calcularResultado() {
  if (!operador) return;

  const partes = visor.value.split(' ');
  if (partes.length < 3) return;

  const num1 = parseFloat(partes[0]);
  const simbolo = partes[1];
  const num2 = parseFloat(partes[2]);

  let resultado = 0;
  switch (simbolo) {
    case '+': resultado = num1 + num2; 
    break;

    case '-': resultado = num1 - num2; 
    break;

    case 'x': resultado = num1 * num2; 
    break;

    case '/': resultado = num1 / num2; 
    break;
  }

  visor.value = resultado === 'Erro' ? resultado : (resultado % 1 === 0 ? resultado : resultado.toFixed(2));
  operador = '';
  limparVisor = true;
}

function limparTudo() {
  visor.value = '';
  operador = '';
  limparVisor = false;
}

document.addEventListener('keydown', (evento) => {
  const tecla = evento.key;
  if (!isNaN(tecla)) adicionarNumero(tecla);
  else if (['+', '-', '*', '/'].includes(tecla)) definirOperador(tecla === '*' ? 'x' : tecla);
  else if (tecla === 'Enter' || tecla === '=') calcularResultado();
  else if (tecla === '.') adicionarPonto();
  else if (tecla === 'Backspace') visor.value = visor.value.slice(0, -1);
  else if (tecla.toLowerCase() === 'c') limparTudo();
});