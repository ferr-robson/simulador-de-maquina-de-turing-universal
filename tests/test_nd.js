// L = {w ∈ {0,1}* ∣ w termina com 0}

const turingMachine = {
  "estados": ["q0","q1"],
  "alfabetoEntrada": ["0", "1"],
  "alfabetoFita": ["0","1","_"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q0",
      "simboloLido": "0",
      "novoSimbolo": "0",
      "movimento": "D",
      "novoEstado": "q0"
    },
    {
      "estadoAtual": "q0",
      "simboloLido": "0",
      "novoSimbolo": "0",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q0",
      "simboloLido": "1",
      "novoSimbolo": "1",
      "movimento": "D",
      "novoEstado": "q0"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "0",
      "novoSimbolo": "0",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "1",
      "novoSimbolo": "1",
      "movimento": "D",
      "novoEstado": "q0"
    },
  ],
  "estadoInicial": "q0",
  "estadosFinais": ["q1"],
  "estadoRejeicao": "qErro",
  "vazio": "_"
};

module.exports = turingMachine;