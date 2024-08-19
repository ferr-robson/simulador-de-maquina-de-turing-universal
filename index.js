/**
 * Author: Robson Ferreira
 * Creation date: July 16, 2024
 * Description: This file contains a Universal Turing Machine simulator.
 */

let fitaTransicoes = [];
let maquinaTuring = require(process.argv[3]);

/**
 * Função que processa a entrada fornecida através de uma máquina de Turing.
 * @param {string} fitaEntrada - A entrada a ser processada pela máquina de Turing.
 */
function processarEntrada (fitaEntrada) {
  
  // Inicializa o estado da fita com a configuração inicial da máquina de Turing.
  // parteEsquerda começa vazia, parteDireita é a entrada fornecida mais um símbolo vazio no final,
  // estadoAtual é o estado inicial da máquina, e a referência à máquina de Turing é armazenada.
  let configuracaoFita = {
    parteEsquerda: maquinaTuring.vazio,
    parteDireita: fitaEntrada + maquinaTuring.vazio,
    estadoAtual: maquinaTuring.estadoInicial,
  }

  imprimirConfiguracaoAtualFita(configuracaoFita);

  // Executa a máquina de Turing com o estado inicial da fita e obtém o estado final resultante.
  let estadoFinal = executarMaquinaTuring(configuracaoFita);

  while (!palavraEhAceita(estadoFinal) && fitaTransicoes.length > 0) {
    estadoFinal = executarMaquinaTuring(fitaTransicoes.shift());
  }
}

/**
 * Função que verifica se o estado que a máquina parou é final.
 * @param {string} estadoFinal - Estado em que a máquina de turing parou.
 */
function palavraEhAceita (estadoFinal) {
  
  if (maquinaTuring.estadosFinais) {

    // Verifica se o estado final é um dos estados finais aceitos pela máquina de Turing.
    // Se sim, a entrada é aceita; caso contrário, é rejeitada.
    if (maquinaTuring.estadosFinais.includes(estadoFinal)) {
      console.log("aceita");
      return true;
    } else {
      console.log("rejeita");
      return false;
    }
  }
}

/**
 * Executa as transições sobre a configuração da fita até que não haja mais transições a serem aplicadas.
 * @param {Object} configuracaoFita - Configuração atual da máquina de turing.
 * @returns {string} - O estado final da máquina de Turing após a execução.
 */
function executarMaquinaTuring (configuracaoFita) {
  
  // Seleciona a transição a ser aplicada com base no estado atual e na configuração da fita.
  if (!configuracaoFita.transicaoAtual) {
    configuracaoFita.transicaoAtual = selecionarTransicao(configuracaoFita);
  }
  
  // Continua aplicando transições enquanto houver uma transição válida.
  while (configuracaoFita.transicaoAtual) {

    // Executa o movimento definido pela transição atual, atualizando o estado da fita.
    configuracaoFita = realizarMovimento(configuracaoFita);

    imprimirConfiguracaoAtualFita(configuracaoFita);

    // Seleciona a próxima transição com base no novo estado da fita.
    configuracaoFita.transicaoAtual = selecionarTransicao(configuracaoFita);
  }

  // Retorna o estado onde a Máquina de Turing parou.
  return configuracaoFita.estadoAtual;
}

/**
 * Imprime a configuração atual da fita no formato xQy 
 * x = parte à esquerda da cabeça de leitura de gravação, 
 * Q = estado atual, 
 * y = parte direita da cabeça de leitura e gravação onde o primeiro símbolo de y é onde a cabeça está apontando.
 * @param {Object} configuracaoFita - Configuração atual da máquina de turing.
 */
function imprimirConfiguracaoAtualFita (configuracaoFita) {
  console.log(
    configuracaoFita.parteEsquerda, 
    configuracaoFita.estadoAtual, 
    configuracaoFita.parteDireita
  );
}

/**
 * Seleciona a transição a ser aplicada com base no estado atual e no símbolo lido.
 * @param {Object} configuracaoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - A transição selecionada que corresponde ao estado atual e ao símbolo lido, ou undefined se não houver correspondência.
 */
function selecionarTransicao (configuracaoFita) { 

  // Obtém a função de transição definida na configuração da Máquina de Turing.
  let funcaoTransicao = maquinaTuring.funcaoTransicao;

  // Obtém o símbolo que está sendo lido no momento.
  let simboloLido = getSimboloLido(configuracaoFita.parteDireita);

  // Filtra as transições possíveis para o estado atual da máquina.
  let transicoesEstadoAtual = funcaoTransicao.filter(obj => obj.estadoAtual === configuracaoFita.estadoAtual);

  // Dentro das transições possíveis para o estado atual, filtra aquelas que correspondem ao símbolo lido.
  let transicaoSimboloLido = transicoesEstadoAtual.filter(obj => obj.simboloLido === simboloLido);

  // Se mais de uma transição for encontrada para o símbolo lido, guardar as configurção não determinísticas
  if (transicaoSimboloLido.length > 1) {
    adicionarTransicoesND(transicaoSimboloLido.slice(1), configuracaoFita);
  }

  // Retorna a primeira transição ou undefined se nenhuma for encontrada.
  return transicaoSimboloLido[0];
}

/**
 * Adiciona a configuração da fita atual e as transições não determinísticas a uma lista para que possam ser processadas posteriormente.
 * @param {Object} transicoesND - Lista de transições não determinísticas.
 * @param {Object} configuracaoFita - Configuração atual da máquina de turing.
 */
function adicionarTransicoesND (transicoesND, configuracaoFita) {
  
  for (i = 0; i < transicoesND.length; i++) {
    configuracaoFita.transicaoAtual = transicoesND[i];
    fitaTransicoes.push({...configuracaoFita});
  }
}

/**
 * Obtém o símbolo que está sendo lido no momenoto.
 * @param {string} parteDireita - O lado direito da fita da máquina de Turing, onde o símbolo lido é o primeiro caractere.
 * @returns {string} - O símbolo lido no momento.
 */
function getSimboloLido (parteDireita) {
  return parteDireita[0];
}

/**
 * Realiza o movimento na fita de acordo com a transição atual.
 * @param {Object} configuracaoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - Configuração da fita da Máquina de Turing após o movimento.
 */
function realizarMovimento (configuracaoFita) {
  
  let resultadoMovimento;

  // Obtém a transição atual a ser aplicada.
  let transicaoSimboloLido = configuracaoFita.transicaoAtual;

  // Verifica o tipo de movimento especificado na transição e aplica o movimento correspondente.
  if (transicaoSimboloLido.movimento == "D") {
    // Aplica o movimento para a direita.
    resultadoMovimento = movimentoDireita(configuracaoFita);
  } 
  else if (transicaoSimboloLido.movimento == "E") {
    // Aplica o movimento para a esquerda.
    resultadoMovimento = movimentoEsquerda(configuracaoFita);
  }
  else if (transicaoSimboloLido.movimento == "S") {
    // Aplica o movimento estático (sem mover a cabeça de leitura e gravação).
    resultadoMovimento = movimentoEstatico(configuracaoFita);
  }

  // Atualiza o estado atual da máquina de Turing para o novo estado definido pela transição.
  resultadoMovimento.estadoAtual = transicaoSimboloLido.novoEstado;

  // Retorna a configuracão da fita após o movimento.
  return resultadoMovimento;
}

/**
 * Faz o movimento para a direita.
 * @param {Object} configuracaoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - A configuração da fita após o movimento para a direita.
 */
function movimentoDireita (configuracaoFita) { 
  
  // Adiciona o novo símbolo à parte esquerda da fita e remove o primeiro símbolo da parte direita.
  configuracaoFita.parteEsquerda += configuracaoFita.transicaoAtual.novoSimbolo;
  configuracaoFita.parteDireita = configuracaoFita.parteDireita.slice(1);
  
  // Se a parte direita estiver vazia após o movimento, define-a como o símbolo vazio da máquina.
  if (!configuracaoFita.parteDireita) {
    configuracaoFita.parteDireita = maquinaTuring.vazio;
  }
  
  // Retorna a configuracaoFita atualizada.
  return configuracaoFita;
}

/**
 * Faz o movimento para a esquerda.
 * @param {Object} configuracaoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - A configuração da fita após o movimento para a esquerda.
 */
function movimentoEsquerda(configuracaoFita) { 
  
  // Se a parte esquerda estiver vazia, não há espaço para mover para a esquerda.
  // Retorna undefined para a função anterior.
  if (!configuracaoFita.parteEsquerda) {
    return;
  }

  // Adiciona um novo símbolo no início da parte direita da fita,
  // E remove o último símbolo da parte esquerda.
  configuracaoFita.parteDireita = 
    configuracaoFita.parteEsquerda.charAt(configuracaoFita.parteEsquerda.length - 1) + 
    configuracaoFita.transicaoAtual.novoSimbolo + 
    configuracaoFita.parteDireita.slice(1);

  configuracaoFita.parteEsquerda = configuracaoFita.parteEsquerda.slice(0, -1);

  // Retorna a configuracaoFita atualizada.
  return configuracaoFita;
}

/**
 * Mantém a cabeça de leitura e gravação no mesmo local (movimento estático) e atualiza o símbolo lido.
 * @param {Object} configuracaoFita - A configuração atual da fita da máquina de Turing.
 * @returns {Object} - A configuração da fita após o movimento para a estático.
 */
function movimentoEstatico(configuracaoFita) {
  
  // Substitui o símbolo na posição atual da fita direita pelo novo símbolo definido na transição.
  configuracaoFita.parteDireita = 
    configuracaoFita.transicaoAtual.novoSimbolo + 
    configuracaoFita.parteDireita.substring(1);
  
  // Retorna a configuracaoFita atualizada.
  return configuracaoFita;
}

processarEntrada(process.argv[2]);