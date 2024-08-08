# Simulador de Máquina de Turing 

## Índice

- [1. MANUAL DO USUÁRIO](#1.-manual-do-usuário)
  - [1.1. PREPARANDO O AMBIENTE DE DESENVOLVIMENTO](#1.1.-preparando-o-ambiente-de-desenvolvimento)
  - [1.2. FORNECENDO A DESCRIÇÃO DA MÁQUINA DE TURING](#1.2.-fornecendo-a-descrição-da-máquina-de-turing)
  - [1.3. EXECUTANDO O PROGRAMA](#1.3.-executando-o-programa)
- [2. RELATÓRIO TÉCNICO](#2.-relatório-técnico)
  - [2.1. COMO O SIMULADOR FUNCIONA](#2.1.-como-o-simulador-funciona)
  - [2.2. DESAFIOS ENCONTRADOS E AS SOLUÇÕES ADOTADAS](#2.2.-desafios-encontrados-e-as-soluções-adotadas)
    - [2.2.1. Definir o que é Fita](#2.2.1.-definir-o-que-é-fita)
    - [2.2.2. Simular a Fita Infinita Para a Direita](#2.2.2.-simular-a-fita-infinita-para-a-direita)
    - [2.2.3. Quebrar ao Movimentar Para a Esquerda no Primeiro Símbolo](#2.2.3.-quebrar-ao-movimentar-para-a-esquerda-no-primeiro-símbolo)
- [3. RELATÓRIO DE TESTES](#3.-relatório-de-testes)
  - [3.1. APLICAÇÃO FUNCIONA CORRETAMENTE](#3.1.-aplicação-funciona-corretamente)
    - [3.1.1. Resultado Esperado e Resultado Obtido Para 0110](#3.1.1.-resultado-esperado-e-resultado-obtido-para-0110)
    - [3.1.2. Resultado Esperado e Resultado Obtido Para 01](#3.1.1.-resultado-esperado-e-resultado-obtido-para-01)
  - [3.2. TESTE DE LOOP À DIREITA](#3.2.-teste-de-loop-à-direita)
    - [3.2.1. Entrada Fornecida e Resultados Esperados](#3.2.1.-entrada-fornecida-e-resultados-esperados)
  - [3.3. TESTE DE QUEBRA À ESQUERDA](#3.3.-teste-de-quebra-à-esquerda)
    - [3.3.1. Entrada Fornecida e Resultados Esperados](#3.3.1.-entrada-fornecida-e-resultados-esperados)
  - [3.4. TESTE DO MOVIMENTO ESTÁTICO](#3.4.-teste-do-movimento-estático)
    - [3.4.1. Entrada Fornecida e Resultados Esperados](#3.4.1.-entrada-fornecida-e-resultados-esperados)

## 1. MANUAL DO USUÁRIO

## 1.1. PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
- Baixe o repositório
- Baixe e instale o [Node.js](https://nodejs.org/pt)
- Baixe e instale um editor de texto de sua preferência
- Abra o diretório principal do projeto no editor de textos escolhido

## 1.2. FORNECENDO A DESCRIÇÃO DA MÁQUINA DE TURING
- As descrições das máquinas de turing são guardadas em arquivos separados
- Crie um novo arquivo JavaScript dentro do diretório principal do projeto
- Configure o arquivo criado com a descrição da Máquina de Turing desejada
- O arquivo example.js guarda um exemplo de uma máquina de turing para a linguagem a*b. Esse arquivo deve ser usado de referência para outras Máquinas de Turing

## 1.3. EXECUTANDO O PROGRAMA
- No terminal, navegue até o diretório que contém o arquivo index.js do projeto
- Utilize o comando abaixo para executar

```sh
node index.js [palavra de entrada] [caminho para o arquivo da MT]
```

- Exemplo:

```sh
node index.js aab ./tests/example.js
```

## 2. RELATÓRIO TÉCNICO

## 2.1. COMO O SIMULADOR FUNCIONA
Ao receber o texto da fita de entrada e o caminho para o arquivo de descrição da Máquina de Turing no comando de execução (node index.js [fita de entrada] [caminho do arquivo de descrição da MT]), o simulador começa a processar os dados na função processarEntrada(). Esta função monta um objeto com o estado atual (inicialmente o estado inicial), o objeto da Máquina de Turing fornecida e as posições esquerda e direita da cabeça de leitura e gravação. Esse objeto é posteriormente passado para a função executarMaquinaTuring().
A função executarMaquinaTuring() é responsável por mostrar a configuração da fita de entrada e aplicar as transições apropriadas, utilizando a função selecionarTransicao().
A seleção da transição correta ocorre em duas etapas: primeiro, são selecionadas todas as transições do estado em que a máquina está atualmente; em seguida, é aplicado um filtro para identificar apenas a transição correspondente ao símbolo atualmente sendo lido. A função selecionarTransicao() retorna o objeto referente à transição do símbolo atualmente lido para a função executarMaquinaTuring().
De volta para a função executarMaquinaTuring(), um novo campo é adicionado ao objeto estadoFita, que havia sido recebido pela função processarEntrada(). Este novo campo recebe o retorno da função selecionarTransicao() e é utilizado numa estrutura de repetição para determinar o critério de parada da Máquina de Turing, que ocorre quando não há mais transições disponíveis para o símbolo que está sendo lido.
A estrutura de repetição da função executarMaquinaTuring() tem como objetivo repetir o processo de movimentar a cabeça de leitura e gravação e fazer as devidas alterações na fita através da função realizarMovimento(). O loop também exibe, novamente, a configuração da fita e então seleciona uma nova transição.
A função realizarMovimento() recebe o objeto estadoFita, que é usado para identificar a transição atual e o movimento que ela realiza (D para direita, E para esquerda, S para estático). Para cada tipo de movimento, existe uma função específica que realiza as alterações correspondentes nas partes esquerda e direita da cabeça de leitura e gravação.
Para assegurar o funcionamento correto da máquina, as funções movimentoDireita() e movimentoEsquerda() incluem condições que verificam a fita e realizam operações específicas. movimentoDireita() adiciona um novo símbolo vazio ao final da fita (à direita) quando a cabeça de leitura e gravação alcança o final da fita, simulando assim uma fita infinita para a direita. movimentoEsquerda() retorna undefined se o objetivo for fazer um movimento para a esquerda e a cabeça de leitura e gravação estiver apontando para o primeiro símbolo da fita.
Quando o loop na função executarMaquinaTuring() é concluído, a função retorna o estado no qual a máquina parou para a função processarEntrada(). Esta última função verifica se o estado é final, aceitando a palavra se for o caso, ou recusando-a caso contrário.

## 2.2. DESAFIOS ENCONTRADOS E AS SOLUÇÕES ADOTADAS

## 2.2.1. Definir o que é Fita
O primeiro problema encontrado foi o de definir o que é a fita e como ela vai funcionar no aplicativo. A solução adotada foi a de dividir a fita em o que já foi lido e o que ainda vai ser ou está sendo lido, nos campos `fitaEsquerda` e `fitaDireita`, do objeto `estadoFita`. Desta forma é possível usar a sintaxe xQy, onde x é o que já foi lido, Q é o estado atual e y é o que ainda vai ser lido, onde o primeiro símbolo de y é onde a cabeça de leitura e gravação está apontando.

## 2.2.2. Simular a Fita Infinita Para a Direita
Mais adiante, notou-se que o programa era incapaz de simular uma fita infinita para a direita. A fim de solucionar o problema, na função de movimento para a direita, foi adicionada uma condicional para verificar se a parte direita da fita está vazia e, se estiver, ela será preenchida com o símbolo que representa o vazio na descrição Máquina de Turing oferecida.

## 2.2.3. Quebrar ao Movimentar Para a Esquerda no Primeiro Símbolo
Por fim, notou-se a necessidade de impedir que, ao apontar para o primeiro símbolo da fita e tentar fazer um movimento para a esquerda, a máquina “quebre”. Para simular este comportamento foi adicionado uma condicional dentro da função de movimento para a esquerda que retorna undefined para o método que o chamar, fazendo com que o método realizarMovimento() dispare um erro e pare a execução da aplicação.

## 3. RELATÓRIO DE TESTES

## 3.1. APLICAÇÃO FUNCIONA CORRETAMENTE
O arquivo ./tests/test_01.js guarda a configuração de uma Máquina de Turing que deve ser usada para verificar se a aplicação é capaz de processar uma palavra corretamente, decidindo se a palavra fornecida na fita de entrada é aceita. 
Essa máquina decide para a linguagem L = {w ∈ {0,1}* ∣ w contém pelo menos um ‘1’ e w termina com ‘0’}

## 3.1.1. Resultado Esperado e Resultado Obtido Para 0110
Resultado esperado: é esperado que a máquina aceite a palavra “0110”
`node index.js 0110 ./tests/test_01.js`
Resultado obtido:
_ q0 0110_
_0 q0 110_
_01 q1 10_
_011 q1 0_
_0110 q2 _
_0110_ q3 _
aceita

## 3.1.2. Resultado Esperado e Resultado Obtido Para 01
Resultado esperado: é esperado que a máquina rejeite a palavra “01”
`node index.js 01 ./tests/test_01.js`
Resultado obtido:
_ q0 01_
_0 q0 1_
_01 q1 _
rejeita 

## 3.2. TESTE DE LOOP À DIREITA
Existe a possibilidade da Máquina de Turing entrar em loop de acordo com a palavra e a função de transição apresentada. Para testar se a aplicação é capaz de simular o loop à direita foi criada a MT de testes `./tests/test_rightLoop.js`.

## 3.2.1. Entrada Fornecida e Resultados Esperados
A fita de entrada fornecida deve ser uma palavra contendo apenas “a” e o arquivo de teste de loop à direita. `node index.js a ./tests/test_rightLoop.js`
O resultado esperado é um loop onde é lido o último símbolo vazio da fita, que será substituído por “Y”. Em seguida um novo símbolo vazio é adicionado ao final da fita. O procedimento deve se repetir até que o programa seja encerrado. Esse comportamento é esperado devido à condicional dentro da função movimentoDireita(), que verifica se o lado direito da fita está vazio e, se estiver, adiciona um novo símbolo vazio à direita.

## 3.3. TESTE DE QUEBRA À ESQUERDA
Quando a cabeça de leitura e gravação aponta para o primeiro símbolo da fita, não pode ser possível fazer um movimento à esquerda. Para testar se a aplicação é capaz de simular a “quebra” da máquina ao fazer um movimento à esquerda no primeiro símbolo é usado a Máquina de Turing do arquivo `./tests/test_leftProblem.js`.

## 3.3.1. Entrada Fornecida e Resultados Esperados
A fita de entrada fornecida deve ser uma palavra contendo apenas “a” e o arquivo de teste do problema à esquerda. `node index.js a ./tests/test_leftProblem.js`.
O resultado esperado é um erro na atribuição de transicaoSimboloLido.novoEstado para resultadoMovimento.estadoAtual, na função realizarMovimento(). O erro ocorre devido ao condicional da função leftMovement(), que verifica se a cabeça de leitura e gravação já está apontando para o primeiro símbolo da fita e, se estiver, retorna undefined para a função que chamou o método leftMovement().

## 3.4. TESTE DO MOVIMENTO ESTÁTICO
É possível verificar a funcionalidade de transições estáticas na Máquina de Turing do arquivo `./tests/test_abc.js`, que possui um movimento estático de q2 para q3, ao ler um símbolo vazio. Apresentando uma palavra válida para esta MT, é possível ver esta funcionalidade.

## 3.4.1. Entrada Fornecida e Resultados Esperados
Resultado esperado: Passando uma palavra válida deve-se observar o movimento estático de q2 para q3 na última transição.
`node index.js abc ./tests/test_abc.js`
Resultado observado:
B q0 abcB
Ba q0 bcB
Bab q1 cB
Babc q2 B
Babc q3 B
aceita 
