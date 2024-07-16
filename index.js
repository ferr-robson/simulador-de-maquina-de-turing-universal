const turingMachine = require('./turingMachine');

function processarEntrada (word, turingMachine) {
  
  fitaEsquerda = "B"
  fitaDireita = word + "B";
  estadoAtual = turingMachine.estadoInicial;
  
  for(i = 0; i < turingMachine.funcaoTransicao.length; i++) {
    
    transicao = turingMachine.funcaoTransicao[i];
    estadoFita = {
      transicao: transicao,
      fitaEsquerda: fitaEsquerda,
      fitaDireita: fitaDireita,
      estadoAtual: estadoAtual
    }

    if(transicaoEhCorreta(estadoFita)) {

      resultadoMovimento;

      if (transicao.movimento == "D") {
        resultadoMovimento = movimentoDireita(estadoFita);
      }
      else {
        resultadoMovimento = movimentoEsquerda(estadoFita);
      }

      fitaDireita = resultadoMovimento.fitaDireita;
      fitaEsquerda = resultadoMovimento.fitaEsquerda;
      estadoAtual = resultadoMovimento.estadoAtual;

      // todo:
      // remover o return
      // executar operacoes ate que a palavra tenha sido consumida ou esteja em estado final
      return;
    }
  }
}

function transicaoEhCorreta (estadoFita) {
  
  if (estadoFita.transicao.estadoAtual != estadoFita.estadoAtual) {
    return false;
  }

  if (estadoFita.transicao.simboloLido == estadoFita.fitaDireita[0]) {
    return true;
  }

  return false;
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
  if (estadoFita.fitaDireita == "") {
    estadoFita.fitaDireita = "B";
  }

  estadoFita.fitaEsquerda += estadoFita.transicao.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  estadoFita.estadoAtual = estadoFita.transicao.novoEstado;
  
  return estadoFita;
}

// todo: function movimentoEstatico (estadoFita) {}

processarEntrada("aabbcc", turingMachine);