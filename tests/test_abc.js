// L ={w ∈ {a,b,c}* ∣ numero de 'b's em w e impar e w termina com 'c'}

const turingMachine = {
    "estados": ["q0", "q1", "q2", "q3"],
    "alfabetoEntrada": ["a", "b", "c"],
    "alfabetoFita": ["a","b","c","B"],
    "funcaoTransicao": [
      {
        "estadoAtual": "q0",
        "simboloLido": "a",
        "novoSimbolo": "a",
        "movimento": "D",
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
        "estadoAtual": "q0",
        "simboloLido": "c",
        "novoSimbolo": "c",
        "movimento": "D",
        "novoEstado": "q0"
      },
      {
        "estadoAtual": "q1",
        "simboloLido": "a",
        "novoSimbolo": "a",
        "movimento": "D",
        "novoEstado": "q1"
      },
      {
        "estadoAtual": "q1",
        "simboloLido": "b",
        "novoSimbolo": "b",
        "movimento": "D",
        "novoEstado": "q0"
      },
      {
        "estadoAtual": "q1",
        "simboloLido": "c",
        "novoSimbolo": "c",
        "movimento": "D",
        "novoEstado": "q2"
      },
      {
        "estadoAtual": "q2",
        "simboloLido": "a",
        "novoSimbolo": "a",
        "movimento": "D",
        "novoEstado": "q1"
      },
      {
        "estadoAtual": "q2",
        "simboloLido": "b",
        "novoSimbolo": "b",
        "movimento": "D",
        "novoEstado": "q0"
      },
      {
        "estadoAtual": "q2",
        "simboloLido": "c",
        "novoSimbolo": "c",
        "movimento": "D",
        "novoEstado": "q2"
      },
      {
        "estadoAtual": "q2",
        "simboloLido": "B",
        "novoSimbolo": "B",
        "movimento": "S",
        "novoEstado": "q3"
      }
    ],
    "estadoInicial": "q0",
    "estadosFinais": ["q3"],
    "estadoRejeicao": "q0",
    "vazio": "B"
  };
    
  module.exports = turingMachine;