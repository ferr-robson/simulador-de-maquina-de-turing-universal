const turingMachine = require('./turingMachine');

function processarEntrada (word, turingMachine) {
  
  fitaEsquerda = "B"
  fitaDireita = word + "B";
  estadoAtual = turingMachine.estadoInicial;
  
  for(i = 0; i < turingMachine.funcaoTransicao.length; i++) {
    
    transicao = turingMachine.funcaoTransicao[i];
    console.log(fitaEsquerda, estadoAtual, fitaDireita);

    if(transicaoEhCorreta(transicao, estadoAtual, fitaDireita)) {

      let estadoFita = {
        transicao: transicao,
        fitaEsquerda: fitaEsquerda,
        fitaDireita: fitaDireita,
        estadoAtual: estadoAtual
      }

      let resultadoMovimento;

      if (transicao.movimento == "D") {
        resultadoMovimento = movimentoDireita(estadoFita);
      }
      else {
        resultadoMovimento = movimentoEsquerda(estadoFita);
      }

      fitaDireita = resultadoMovimento.fitaDireita;
      fitaEsquerda = resultadoMovimento.fitaEsquerda;
      estadoAtual = resultadoMovimento.estadoAtual;
      console.log(fitaEsquerda, estadoAtual, fitaDireita)
      
      return;//
    }
  }
}

function transicaoEhCorreta (transicao, estadoAtual, fitaDireita) {
  
  if (transicao.estadoAtual != estadoAtual) {
    return false;
  }

  if (transicao.simboloLido == fitaDireita[0]) {
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
  estadoFita.fitaEsquerda += estadoFita.transicao.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  estadoFita.estadoAtual = estadoFita.transicao.novoEstado;
  
  return estadoFita;
}

processarEntrada("aabbcc", turingMachine);