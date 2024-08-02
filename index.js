/**
 * Author: Robson Junior
 * Creation date: July 16, 2024
 * Description: This file contains a Universal Turing Machine simulator.
 */

function processarEntrada (fitaEntrada, maquinaTuring) {
  
  let estadoFita = {
    fitaEsquerda: maquinaTuring.vazio,
    fitaDireita: fitaEntrada + maquinaTuring.vazio,
    estadoAtual: maquinaTuring.estadoInicial,
    maquinaTuring: maquinaTuring,
  }

  let estadoFinal = executarMaquinaTuring(estadoFita);

  if (maquinaTuring.estadosFinais.includes(estadoFinal)) {
    console.log("aceita");
  } else {
    console.log("rejeita");
  }
}

function executarMaquinaTuring (estadoFita) {
  
  console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);
  
  estadoFita.transicaoAtual = selecionarTransicao(estadoFita);
  
  while (estadoFita.transicaoAtual) {

    estadoFita = realizarMovimento(estadoFita);

    console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);

    estadoFita.transicaoAtual = selecionarTransicao(estadoFita);
  }

  return estadoFita.estadoAtual
}

function selecionarTransicao (estadoFita) { 

  let funcaoTransicao = estadoFita.maquinaTuring.funcaoTransicao;
  let simboloLido = getSimboloLido(estadoFita.fitaDireita);

  let transicoesEstadoAtual = funcaoTransicao.filter(obj => obj.estadoAtual === estadoFita.estadoAtual);
  let transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === simboloLido);

  return transicaoSimboloLido[0];
}

function getSimboloLido (fitaDireita) {
  return fitaDireita[0];
}

function realizarMovimento (estadoFita) {
  
  let resultadoMovimento;
  let transicaoSimboloLido = estadoFita.transicaoAtual;

  if (transicaoSimboloLido.movimento == "D") {
    resultadoMovimento = movimentoDireita(estadoFita);
  } 
  else if (transicaoSimboloLido.movimento == "E") {
    resultadoMovimento = movimentoEsquerda(estadoFita);
  }
  else if (transicaoSimboloLido.movimento == "S") {
    resultadoMovimento = movimentoEstatico(estadoFita);
  }

  resultadoMovimento.estadoAtual = transicaoSimboloLido.novoEstado;

  return resultadoMovimento;
}

function movimentoDireita (estadoFita) { 
  
  estadoFita.fitaEsquerda += estadoFita.transicaoAtual.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  
  if (!estadoFita.fitaDireita) {
    estadoFita.fitaDireita = estadoFita.maquinaTuring.vazio;
  }
  
  return estadoFita;
}

function movimentoEsquerda (estadoFita) { 
  
  if (!estadoFita.fitaEsquerda) {
    return;
  }

  estadoFita.fitaDireita = 
    estadoFita.fitaEsquerda.charAt(estadoFita.fitaEsquerda.length - 1) + 
    estadoFita.transicaoAtual.novoSimbolo + 
    estadoFita.fitaDireita.slice(1);

  estadoFita.fitaEsquerda = estadoFita.fitaEsquerda.slice(0, -1);

  return estadoFita;
}

function movimentoEstatico (estadoFita) {
  
  estadoFita.fitaDireita = estadoFita.transicaoAtual.novoSimbolo + estadoFita.fitaDireita.substring(1);
  
  return estadoFita;
}

processarEntrada(process.argv[2], require(process.argv[3]));