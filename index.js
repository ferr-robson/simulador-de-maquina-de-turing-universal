/**
 * Author: Robson Junior
 * Creation date: July 16, 2024
 * Description: This file contains a Universal Turing Machine simulator.
 */

/**
 * Função que processa a entrada fornecida através de uma máquina de Turing.
 * @param {string} fitaEntrada - A entrada a ser processada pela máquina de Turing.
 * @param {Object} maquinaTuring - A configuração da máquina de Turing, incluindo fita, estados e regras.
 */
function processarEntrada (fitaEntrada, maquinaTuring) {
  
  // Inicializa o estado da fita com a configuração inicial da máquina de Turing.
  // fitaEsquerda começa vazia, fitaDireita é a entrada fornecida mais um símbolo vazio no final,
  // estadoAtual é o estado inicial da máquina, e a referência à máquina de Turing é armazenada.
  let estadoFita = {
    fitaEsquerda: maquinaTuring.vazio,
    fitaDireita: fitaEntrada + maquinaTuring.vazio,
    estadoAtual: maquinaTuring.estadoInicial,
    maquinaTuring: maquinaTuring,
  }

  // Executa a máquina de Turing com o estado inicial da fita e obtém o estado final resultante.
  let estadoFinal = executarMaquinaTuring(estadoFita);

  // Verifica se o estado final é um dos estados finais aceitos pela máquina de Turing.
  // Se sim, a entrada é aceita; caso contrário, é rejeitada.
  if (maquinaTuring.estadosFinais.includes(estadoFinal)) {
    console.log("aceita");
  } else {
    console.log("rejeita");
  }
}

/**
 * Executa a máquina de Turing até que não haja mais transições a serem aplicadas.
 * @param {Object} estadoFita - O estado atual da fita da máquina de Turing, incluindo fitaEsquerda, fitaDireita e estadoAtual.
 * @returns {string} - O estado final da máquina de Turing após a execução.
 */
function executarMaquinaTuring (estadoFita) {
  
  // Imprime a configuração atual da fita.
  console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);
  
  // Seleciona a transição a ser aplicada com base no estado atual e na configuração da fita.
  estadoFita.transicaoAtual = selecionarTransicao(estadoFita);
  
  // Continua aplicando transições enquanto houver uma transição válida.
  while (estadoFita.transicaoAtual) {

    // Executa o movimento definido pela transição atual, atualizando o estado da fita.
    estadoFita = realizarMovimento(estadoFita);

    // Imprime a configuração atual da fita.
    console.log(estadoFita.fitaEsquerda, estadoFita.estadoAtual, estadoFita.fitaDireita);

    // Seleciona a próxima transição com base no novo estado da fita.
    estadoFita.transicaoAtual = selecionarTransicao(estadoFita);
  }

  // Retorna o estado final da máquina de Turing após a execução completa das transições.
  return estadoFita.estadoAtual
}

/**
 * Seleciona a transição a ser aplicada com base no estado atual e no símbolo lido da fita.
 * @param {Object} estadoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - A transição selecionada que corresponde ao estado atual e ao símbolo lido, ou undefined se não houver correspondência.
 */
function selecionarTransicao (estadoFita) { 

  // Obtém a função de transição definida na configuração da máquina de Turing.
  let funcaoTransicao = estadoFita.maquinaTuring.funcaoTransicao;

  // Obtém o símbolo que está sendo lido no momento.
  let simboloLido = getSimboloLido(estadoFita.fitaDireita);

  // Filtra as transições possíveis para o estado atual da máquina.
  let transicoesEstadoAtual = funcaoTransicao.filter(obj => obj.estadoAtual === estadoFita.estadoAtual);

  // Dentro das transições possíveis para o estado atual, filtra aquelas que correspondem ao símbolo lido.
  let transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === simboloLido);

  // Retorna a primeira transição correspondente ou undefined se nenhuma for encontrada.
  return transicaoSimboloLido[0];
}

/**
 * Obtém o símbolo que está sendo lido no momenoto.
 * @param {string} fitaDireita - O lado direito da fita da máquina de Turing, onde o símbolo lido é o primeiro caractere.
 * @returns {string} - O símbolo lido no momento.
 */
function getSimboloLido (fitaDireita) {
  return fitaDireita[0];
}

/**
 * Realiza o movimento na fita de acordo com a transição atual definida para o estado da máquina de Turing.
 * @param {Object} estadoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - Configuração da fita da Máquina de Turing após o movimento.
 */
function realizarMovimento (estadoFita) {
  
  let resultadoMovimento;

  // Obtém a transição atual a ser aplicada.
  let transicaoSimboloLido = estadoFita.transicaoAtual;

  // Verifica o tipo de movimento especificado na transição e aplica o movimento correspondente.
  if (transicaoSimboloLido.movimento == "D") {
    // Aplica o movimento para a direita e atualiza o estado da fita.
    resultadoMovimento = movimentoDireita(estadoFita);
  } 
  else if (transicaoSimboloLido.movimento == "E") {
    // Aplica o movimento para a esquerda e atualiza o estado da fita.
    resultadoMovimento = movimentoEsquerda(estadoFita);
  }
  else if (transicaoSimboloLido.movimento == "S") {
    // Aplica o movimento estático (sem mover a fita) e atualiza o estado da fita.
    resultadoMovimento = movimentoEstatico(estadoFita);
  }

  // Atualiza o estado atual da máquina de Turing para o novo estado definido pela transição.
  resultadoMovimento.estadoAtual = transicaoSimboloLido.novoEstado;

  // Retorna o estadoFita atualizado após o movimento.
  return resultadoMovimento;
}

/**
 * Faz o movimento para a direita.
 * @param {Object} estadoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - O estado atualizado da fita após o movimento para a direita.
 */
function movimentoDireita (estadoFita) { 
  
  // Adiciona o novo símbolo à parte esquerda da fita e remove o primeiro símbolo da parte direita.
  estadoFita.fitaEsquerda += estadoFita.transicaoAtual.novoSimbolo;
  estadoFita.fitaDireita = estadoFita.fitaDireita.slice(1);
  
  // Se a parte direita estiver vazia após o movimento, define-a como o símbolo vazio da máquina.
  if (!estadoFita.fitaDireita) {
    estadoFita.fitaDireita = estadoFita.maquinaTuring.vazio;
  }
  
  // Retorna o estadoFita atualizado da fita.
  return estadoFita;
}

/**
 * Faz o movimento para a esquerda.
 * @param {Object} estadoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - O estado atualizado da fita após o movimento para a esquerda.
 */
function movimentoEsquerda(estadoFita) { 
  
  // Se a fita esquerda estiver vazia, não há espaço para mover para a esquerda.
  // Retorna undefined para a função anterior.
  if (!estadoFita.fitaEsquerda) {
    return;
  }

  // Adiciona um novo símbolo no início da parte direita da fita,
  // E remove o último símbolo da parte esquerda.
  estadoFita.fitaDireita = 
    estadoFita.fitaEsquerda.charAt(estadoFita.fitaEsquerda.length - 1) + 
    estadoFita.transicaoAtual.novoSimbolo + 
    estadoFita.fitaDireita.slice(1);

  estadoFita.fitaEsquerda = estadoFita.fitaEsquerda.slice(0, -1);

  // Retorna o estado atualizado da fita.
  return estadoFita;
}

/**
 * Mantém a fita no mesmo local (movimento estático) e atualiza o símbolo na fita direita.
 * @param {Object} estadoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - O estado atualizado da fita após o movimento estático.
 */
function movimentoEstatico(estadoFita) {
  
  // Substitui o símbolo na posição atual da fita direita pelo novo símbolo definido na transição.
  estadoFita.fitaDireita = estadoFita.transicaoAtual.novoSimbolo + estadoFita.fitaDireita.substring(1);
  
  // Retorna o estado atualizado da fita.
  return estadoFita;
}

processarEntrada(process.argv[2], require(process.argv[3]));