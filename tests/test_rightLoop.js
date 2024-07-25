// Test whether it's possible to have a loop on the right

const turingMachine = {
  "estados": ["q0"],
  "alfabetoEntrada": ["a"],
  "alfabetoFita": ["a","B", "X", "Y"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q0",
      "simboloLido": "a",
      "novoSimbolo": "X",
      "movimento": "D",
      "novoEstado": "q0"
    },
    {
      "estadoAtual": "q0",
      "simboloLido": "B",
      "novoSimbolo": "Y",
      "movimento": "D",
      "novoEstado": "q0"
    }
  ],
  "estadoInicial": "q0",
  "estadosFinais": ["q0"],
  "estadoRejeicao": "q0",
  "vazio": "B"
};

module.exports = turingMachine;