const turingMachine = {
  "estados": ["q1", "q2", "q3"],
  "alfabetoEntrada": ["a", "b", "c"],
  "alfabetoFita": ["a","b","c","B"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q1",
      "simboloLido": "a",
      "novoSimbolo": "Y",
      // "movimento": "D",
      "movimento": "E",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "b",
      "novoSimbolo": "b",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "c",
      "novoSimbolo": "c",
      "movimento": "D",
      "novoEstado": "q3"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "b",
      "novoSimbolo": "b",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q3",
      "simboloLido": "c",
      "novoSimbolo": "c",
      "movimento": "D",
      "novoEstado": "q3"
    }
  ],
  "estadoInicial": "q1",
  "estadosFinais": ["q1, q2"],
  "qAceita": "",
  "qRejeita": "",
  "vazio": "B"
};

module.exports = turingMachine;