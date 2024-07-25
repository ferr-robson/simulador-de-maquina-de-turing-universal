// Test if the machine crashes when attempting to move right on the first symbol

const turingMachine = {
  "estados": ["q0"],
  "alfabetoEntrada": ["a"],
  "alfabetoFita": ["a","X","Y","B"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q0",
      "simboloLido": "a",
      "novoSimbolo": "X",
      "movimento": "E",
      "novoEstado": "q0"
    },
    {
      "estadoAtual": "q0",
      "simboloLido": "B",
      "novoSimbolo": "Y",
      "movimento": "E",
      "novoEstado": "q0"
    }
  ],
  "estadoInicial": "q0",
  "estadosFinais": ["q0"],
  "estadoRejeicao": "q0",
  "vazio": "B"
};

module.exports = turingMachine;