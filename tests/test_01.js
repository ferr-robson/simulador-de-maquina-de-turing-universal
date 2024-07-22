// L={w ∈ {0,1}* ∣ w contem pelo menos um ’1’ e w termina com ’0’}

const turingMachine = {
  "estados": ["q0", "q1", "q2", "q3"],
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
      "simboloLido": "1",
      "novoSimbolo": "1",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "0",
      "novoSimbolo": "0",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q1",
      "simboloLido": "1",
      "novoSimbolo": "1",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "0",
      "novoSimbolo": "0",
      "movimento": "D",
      "novoEstado": "q2"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "1",
      "novoSimbolo": "1",
      "movimento": "D",
      "novoEstado": "q1"
    },
    {
      "estadoAtual": "q2",
      "simboloLido": "_",
      "novoSimbolo": "_",
      "movimento": "D",
      "novoEstado": "q3"
    }
  ],
  "estadoInicial": "q0",
  "estadosFinais": ["q3"],
  "estadoRejeicao": "q0",
  "vazio": "_"
};
  
module.exports = turingMachine;