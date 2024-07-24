// L = {w ∈ {a,b}* ∣ w pode ser decomposto como w = xby onde x ∈ {a}* e y ∈ {ϵ}}

const turingMachine = {
  "estados": ["q0","q1"],
  "alfabetoEntrada": ["a", "b"],
  "alfabetoFita": ["a","b","_"],
  "funcaoTransicao": [
    {
      "estadoAtual": "q0",
      "simboloLido": "a",
      "novoSimbolo": "a",
      "movimento": "D", // D direita, E esquerda, S static
      "novoEstado": "q0"
    },
    {
      "estadoAtual": "q0",
      "simboloLido": "b",
      "novoSimbolo": "b",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "a",
      "novoSimbolo": "a",
      "movimento": "D",
      "novoEstado": "qErro"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "b",
      "novoSimbolo": "b",
      "movimento": "D",
      "novoEstado": "qErro"
    },
    {
      "estadoAtual": "qErro",
      "simboloLido": "a",
      "novoSimbolo": "a",
      "movimento": "D",
      "novoEstado": "qErro"
    },
    {
      "estadoAtual": "qErro",
      "simboloLido": "b",
      "novoSimbolo": "b",
      "movimento": "D",
      "novoEstado": "qErro"
    }
  ],
  "estadoInicial": "q0",
  "estadosFinais": ["q1"],
  "estadoRejeicao": "qErro",
  "vazio": "_"
};

module.exports = turingMachine;