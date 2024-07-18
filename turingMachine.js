const turingMachine = {
  "estados": ["q1", "q2", "q3"],
  "alfabetoEntrada": ["a", "b", "c"],
  "alfabetoFita": ["a","b","c","B"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q1",
      "simboloLido": "a",
      "novoSimbolo": "X",
      "movimento": "D",
      // "movimento": "E",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "b",
      "novoSimbolo": "Y",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "c",
      "novoSimbolo": "Z",
      "movimento": "D",
      "novoEstado": "q3"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "b",
      "novoSimbolo": "Y",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "c",
      "novoSimbolo": "Z",
      "movimento": "D",
      "novoEstado": "q3"
    },
    {
      "estadoAtual": "q3",
      "simboloLido": "c",
      "novoSimbolo": "Z",
      "movimento": "D",
      "novoEstado": "q3"
    }
  ],
  "estadoInicial": "q1",
  "estadosFinais": ["q1", "q2"],
  "estadoRejeicao": "qErro",
  "vazio": "B"
};

module.exports = turingMachine;