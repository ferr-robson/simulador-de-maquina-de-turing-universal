/**
 * Author: Robson Junior
 * Creation date: July 16, 2024
 * Description: This file contains a Universal Turing Machine simulator.
 */

function processarEntrada(fitaDeEntrada, turingMachine) {
  
  estadoFita = {
    fitaEsquerda: turingMachine.vazio,
    fitaDireita: fitaDeEntrada + turingMachine.vazio,
    estadoAtual: turingMachine.estadoInicial,
    turingMachine: turingMachine,
  }

  estadoFinal = executeTuringMachine(estadoFita);

  if (turingMachine.estadosFinais.includes(estadoFinal)) {
    console.log("aceita");
  } else {
    console.log("rejeita");
  }
}

function executeTuringMachine(estadoFita) {
  
  let transicaoSimboloLido = selecionarTransicao(estadoFita);

  console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);
  
  while (transicaoSimboloLido) {

    estadoFita.transicaoAtual = transicaoSimboloLido;

    estadoFita = realizarMovimento(transicaoSimboloLido, estadoFita);

    console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);

    transicaoSimboloLido = selecionarTransicao(estadoFita);
  }

  return estadoFita.estadoAtual
}

function realizarMovimento (transicaoSimboloLido, estadoFita) {
  
  let resultadoMovimento;

  if (transicaoSimboloLido.movimento == "D") {
    resultadoMovimento = rightMovement(estadoFita);
  } 
  else if (transicaoSimboloLido.movimento == "E") {
    resultadoMovimento = leftMovement(estadoFita);
  }
  else if (transicaoSimboloLido.movimento == "S") {
    resultadoMovimento = staticMovement(estadoFita);
  }

  resultadoMovimento.estadoAtual = transicaoSimboloLido.novoEstado;

  return resultadoMovimento;
}

function selecionarTransicao (estadoFita) { 

  funcaoTransicao = estadoFita.turingMachine.funcaoTransicao;
  simboloLido = getSimboloLido(estadoFita.fitaDireita);

  transicoesEstadoAtual = funcaoTransicao.filter(obj => obj.estadoAtual === estadoFita.estadoAtual);
  transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === simboloLido);

  return transicaoSimboloLido[0];
}

function getSimboloLido (fitaDireita) {

  return fitaDireita[0];
}

function leftMovement (estadoFita) { 
  
  if (estadoFita.fitaEsquerda == "") {
    return; //erro
  }

  estadoFita.fitaDireita = 
    estadoFita.fitaEsquerda.charAt(estadoFita.fitaEsquerda.length - 1) + 
    estadoFita.transicaoAtual.novoSimbolo + 
    estadoFita.fitaDireita.slice(1);

  estadoFita.fitaEsquerda = estadoFita.fitaEsquerda.slice(0, -1);

  return estadoFita;
}

function rightMovement (estadoFita) { 
  
  estadoFita.fitaEsquerda += estadoFita.transicaoAtual.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  
  if (estadoFita.fitaDireita == "") {
    estadoFita.fitaDireita = estadoFita.turingMachine.vazio;
  }
  
  return estadoFita;
}

function staticMovement (estadoFita) {
  
  estadoFita.fitaDireita = estadoFita.transicaoAtual.novoSimbolo + estadoFita.fitaDireita.substring(1);
  
  return estadoFita;
}

processarEntrada(process.argv[2], require(process.argv[3]));