const turingMachine = require('./turingMachine');

function processarEntrada (word, turingMachine) {
  
  fitaEsquerda = "B"
  // todo: verificar se word pertence ao alfabeto de entrada
  fitaDireita = word + "B";
  estadoAtual = turingMachine.estadoInicial;
  
  console.log(fitaEsquerda, estadoAtual, fitaDireita);

  transicaoSimboloLido = selecionarTransicao(estadoAtual, turingMachine.funcaoTransicao, fitaDireita[0]);

  let resultadoMovimento;

  while (transicaoSimboloLido) {
    estadoFita = {
      transicao: transicaoSimboloLido,
      fitaEsquerda: fitaEsquerda,
      fitaDireita: fitaDireita,
      estadoAtual: estadoAtual
    };

    if (transicaoSimboloLido.movimento == "D") {
      resultadoMovimento = movimentoDireita(estadoFita);
    }
    else {
      resultadoMovimento = movimentoEsquerda(estadoFita);
    }

    fitaDireita = resultadoMovimento.fitaDireita;
    fitaEsquerda = resultadoMovimento.fitaEsquerda;
    estadoAtual = resultadoMovimento.estadoAtual;

    transicaoSimboloLido = selecionarTransicao(estadoAtual, turingMachine.funcaoTransicao, fitaDireita[0]);
    console.log(fitaEsquerda, estadoAtual, fitaDireita);
  }
}

function selecionarTransicao (estadoAtual, funcaoTransicao, simboloLido) {
  transicoesEstadoAtual = funcaoTransicao.filter(obj => obj.estadoAtual === estadoAtual);
  transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === simboloLido);

  return transicaoSimboloLido[0];
}

function movimentoEsquerda (estadoFita) {
  if (estadoFita.fitaEsquerda == "") {
    return; //erro
  }

  estadoFita.fitaDireita = 
    estadoFita.fitaEsquerda.charAt(estadoFita.fitaEsquerda.length - 1) + 
    estadoFita.transicao.novoSimbolo + 
    estadoFita.fitaDireita.slice(1);

  estadoFita.fitaEsquerda = estadoFita.fitaEsquerda.slice(0, -1);

  estadoFita.estadoAtual = estadoFita.transicao.novoEstado

  return estadoFita;
}

function movimentoDireita (estadoFita) {
  estadoFita.fitaEsquerda += estadoFita.transicao.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  estadoFita.estadoAtual = estadoFita.transicao.novoEstado;
  
  if (estadoFita.fitaDireita == "") {
    estadoFita.fitaDireita = "B";
  }
  
  return estadoFita;
}

// todo: function movimentoEstatico (estadoFita) {}

processarEntrada("aabbcc", turingMachine);