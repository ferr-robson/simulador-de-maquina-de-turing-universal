const turingMachine = require('./turingMachine');

function processarEntrada(fitaDeEntrada, turingMachine) {
  
  data = {
    fitaEsquerda: turingMachine.vazio,
    fitaDireita: fitaDeEntrada + turingMachine.vazio,
    estadoAtual: turingMachine.estadoInicial,
    turingMachine: turingMachine
  }

  estadoFinal = executeTuringMachine(data);

  if (turingMachine.estadosFinais.includes(estadoFinal)) {
    console.log("aceita");
  } else {
    console.log("rejeita");
  }
}

function executeTuringMachine(data) {
  
  auxObj = {
    estadoAtual: data.estadoAtual, 
    funcaoTransicao: data.turingMachine.funcaoTransicao, 
    simboloLido: data.fitaDireita[0]
  };
  
  let transicaoSimboloLido = selecionarTransicao(auxObj);

  console.log(data.fitaEsquerda, data.estadoAtual, data.fitaDireita);
  
  while (transicaoSimboloLido) {
    const estadoFita = {
      transicao: transicaoSimboloLido,
      fitaEsquerda: data.fitaEsquerda,
      fitaDireita: data.fitaDireita,
      vazio: data.turingMachine.vazio
    };

    let resultadoMovimento = decidirMovimento(transicaoSimboloLido, estadoFita);

    data.fitaDireita = resultadoMovimento.fitaDireita;
    data.fitaEsquerda = resultadoMovimento.fitaEsquerda;
    data.estadoAtual = transicaoSimboloLido.novoEstado;
    
    auxObj.estadoAtual = data.estadoAtual;
    auxObj.simboloLido = data.fitaDireita[0];

    console.log(data.fitaEsquerda, data.estadoAtual, data.fitaDireita);

    transicaoSimboloLido = selecionarTransicao(auxObj);
  }

  return data.estadoAtual
}

function decidirMovimento (transicaoSimboloLido, estadoFita) {
  
  let resultadoMovimento;

  if (transicaoSimboloLido.movimento == "D") {
    resultadoMovimento = movimentoDireita(estadoFita);
  } else {
    resultadoMovimento = movimentoEsquerda(estadoFita);
  }

  return resultadoMovimento;
}

function selecionarTransicao (estadoFita) { 
  transicoesEstadoAtual = estadoFita.funcaoTransicao.filter(obj => obj.estadoAtual === estadoFita.estadoAtual);
  transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === estadoFita.simboloLido);

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

  return estadoFita;
}

function movimentoDireita (estadoFita) { 
  estadoFita.fitaEsquerda += estadoFita.transicao.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  
  if (estadoFita.fitaDireita == "") {
    estadoFita.fitaDireita = estadoFita.vazio;
  }
  
  return estadoFita;
}

// todo: function movimentoEstatico (estadoFita) {}

processarEntrada("aabbcc", turingMachine);