# Simulador de Máquina de Turing 

## Autor: Robson Ferreira

## Índice

- [MANUAL DO USUÁRIO](#manual-do-usuário)
  - [PREPARANDO O AMBIENTE DE DESENVOLVIMENTO](#preparando-o-ambiente-de-desenvolvimento)
  - [FORNECENDO A DESCRIÇÃO DA MÁQUINA DE TURING](#fornecendo-a-descrição-da-máquina-de-turing)
  - [EXECUTANDO O PROGRAMA](#executando-o-programa)
- [RELATÓRIO TÉCNICO](#relatório-técnico)
  - [COMO O SIMULADOR FUNCIONA](#como-o-simulador-funciona)
  - [DESAFIOS ENCONTRADOS E AS SOLUÇÕES ADOTADAS](#desafios-encontrados-e-as-soluções-adotadas)
    - [Definir o que é Fita](#definir-o-que-é-fita)
    - [Simular a Fita Infinita Para a Direita](#simular-a-fita-infinita-para-a-direita)
    - [Quebrar ao Movimentar Para a Esquerda no Primeiro Símbolo](#quebrar-ao-movimentar-para-a-esquerda-no-primeiro-símbolo)
    - [Simular o Não Determinismo](#simular-o-não-determinismo)
- [RELATÓRIO DE TESTES](#relatório-de-testes)
  - [APLICAÇÃO FUNCIONA CORRETAMENTE](#aplicação-funciona-corretamente)
    - [Resultado Esperado e Resultado Obtido Para 0110](#resultado-esperado-e-resultado-obtido-para-0110)
    - [Resultado Esperado e Resultado Obtido Para 01](#resultado-esperado-e-resultado-obtido-para-01)
  - [TESTE DE LOOP À DIREITA](#teste-de-loop-à-direita)
    - [Entrada Fornecida e Resultados Esperados](#entrada-fornecida-e-resultados-esperados)
  - [TESTE DE QUEBRA À ESQUERDA](#teste-de-quebra-à-esquerda)
    - [Entrada Fornecida e Resultados Esperados](#entrada-fornecida-e-resultados-esperados)
  - [TESTE DO MOVIMENTO ESTÁTICO](#teste-do-movimento-estático)
    - [Entrada Fornecida e Resultados Esperados](#entrada-fornecida-e-resultados-esperados)

## MANUAL DO USUÁRIO

### PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
- Baixe o repositório
- Baixe e instale o [Node.js](https://nodejs.org/pt)
- Baixe e instale um editor de texto de sua preferência
- Abra o diretório principal do projeto no editor de textos escolhido

### FORNECENDO A DESCRIÇÃO DA MÁQUINA DE TURING
- As descrições das máquinas de turing são guardadas em arquivos separados
- Crie um novo arquivo JavaScript dentro do diretório principal do projeto
- Configure o arquivo criado com a descrição da Máquina de Turing desejada
- O arquivo `example.js` guarda um exemplo de uma máquina de turing para a linguagem a*b. Esse arquivo deve ser usado de referência para outras Máquinas de Turing

### EXECUTANDO O PROGRAMA
- No terminal, navegue até o diretório que contém o arquivo `index.js` do projeto
- Utilize o comando abaixo para executar

```sh
node index.js [palavra de entrada] [caminho para o arquivo da MT]
```

- Exemplo:

```sh
node index.js aab ./example.js
```

## RELATÓRIO TÉCNICO

### COMO O SIMULADOR FUNCIONA
Ao receber a palavra de entrada e o caminho para o arquivo de descrição da Máquina de Turing, no comando de execução (`node index.js [palavra de entrada] [caminho para o arquivo da MT]`), o simulador começa a processar os dados na função `processarEntrada()`. Esta função monta um objeto que representa a configuração da fita principal, com o estado atual (inicialmente o estado inicial) e as posições esquerda e direita da cabeça de leitura e gravação. Esse objeto é posteriormente passado para a função `executarMaquinaTuring()`.

A função `executarMaquinaTuring()` é responsável por mostrar a configuração da fita de entrada e aplicar as transições apropriadas, utilizando a função `selecionarTransicao()`.

A seleção da transição correta ocorre em duas etapas: primeiro, são selecionadas todas as transições do estado em que a máquina está atualmente; em seguida, é aplicado um filtro para identificar apenas a transição correspondente ao símbolo atualmente sendo lido. A função `selecionarTransicao()` retorna o objeto referente à transição do símbolo atualmente lido para a função `executarMaquinaTuring()`. Se houver não-determinísmo ao ler o símbolo, a função retorna a primeira transição encontrada e envia as demais para a função `adicionarTransicoesND()`, que fará a adição da configuração atual da fita e as transições não-determinísticas, no array `fitaTransicoes`.

De volta para a função `executarMaquinaTuring()`, um novo campo é adicionado ao objeto de configuração da fita principal, que havia sido recebido pela função `processarEntrada()`. Este novo campo recebe o retorno da função `selecionarTransicao()` e é utilizado numa estrutura de repetição para determinar o critério de parada da Máquina de Turing, que ocorre quando não há mais transições disponíveis para o símbolo que está sendo lido.

A estrutura de repetição da função `executarMaquinaTuring()` tem como objetivo repetir o processo de movimentar a cabeça de leitura e gravação e fazer as devidas alterações na fita através da função `realizarMovimento()`. O loop também exibe, novamente, a configuração da fita e então seleciona uma nova transição.

A função `realizarMovimento()` recebe o objeto de configuração da fita principal, que é usado para identificar a transição atual e o movimento que deve ser feito (D para direita, E para esquerda, S para estático). Para cada tipo de movimento, existe uma função específica que realiza as alterações correspondentes nas partes a esquerda e a direita da cabeça de leitura e gravação.

Para assegurar o funcionamento correto da máquina, as funções `movimentoDireita()` e `movimentoEsquerda()` incluem condições que verificam a fita e realizam operações específicas. `movimentoDireita()` adiciona um novo símbolo vazio ao final da fita (à direita) quando a cabeça de leitura e gravação alcança o final da fita, simulando assim uma fita infinita para a direita. `movimentoEsquerda()` retorna undefined se o objetivo for fazer um movimento para a esquerda e a cabeça de leitura e gravação estiver apontando para o primeiro símbolo da fita, gerando erro.

Quando o loop na função `executarMaquinaTuring()` é concluído, a função retorna o estado no qual a máquina parou para a função `processarEntrada()`, que vai verificar se a palavra é aceita e se não houve nenhuma transição não-determinística salva no objeto `fitaTransicoes`. 

Se `fitaTransicoes` não for vazio e o processamento ainda não foi aceito, siguinifica que houveram transições não-determinísticas. Nesse caso, a primeira configuração em `fitaTransicoes` será removida do array e enviada para a função `executarMaquinaTuring()`. O código repete o processo até que `fitaTransicoes` esteja vazio ou que alguma configuração seja aceita.

### DESAFIOS ENCONTRADOS E AS SOLUÇÕES ADOTADAS

#### Definir o que é Fita
O primeiro desafio foi definir o conceito de "fita" e seu funcionamento no aplicativo. Para resolver esse problema, a fita foi dividida em duas partes: o que já foi lido e o que ainda será ou está sendo lido. Essas partes são representadas pelos campos `parteEsquerda` e `parteDireita` do objeto `configuracaoFita`.

Dessa forma, utilizamos a sintaxe `xQy`, onde:
- `x` representa o que já foi lido,
- `Q` é o estado atual,
- `y` é o que ainda será lido, com o primeiro símbolo de y indicando a posição da cabeça de leitura e gravação.

Esse método é aplicado tanto na configuração da fita principal quanto na saída visual do programa. Por exemplo, para a entrada `node index.js aab ./example.js`, a saída visual será:
- `_ q0 aab_`
- `_a q0 ab_`
- `_aa q0 b_`
- `_aab q1 _`
- `aceita`

#### Simular a Fita Infinita Para a Direita
Mais adiante, notou-se que o programa era incapaz de simular uma fita infinita para a direita. A fim de solucionar o problema, na função de movimento para a direita, foi adicionada uma condicional para verificar se a parte direita da fita está vazia e, se estiver, ela será preenchida com o símbolo que representa o vazio na descrição de Máquina de Turing oferecida.

#### Quebrar ao Movimentar Para a Esquerda no Primeiro Símbolo
Também foi identificado a necessidade de garantir que a máquina "quebre" ao tentar mover-se para a esquerda quando estiver apontando para o primeiro símbolo da fita. Para simular esse comportamento, foi adicionada uma condicional na função de movimentação para a esquerda. Se a máquina tentar se mover para a esquerda a partir do primeiro símbolo, a condicional faz com que a função retorne `undefined`.

Esse retorno faz com que o método `realizarMovimento()` dispare um erro e interrompa a execução da aplicação, simulando assim o comportamento esperado para uma fita que não pode ser estendida para a esquerda além do primeiro símbolo.

#### Simular o Não Determinismo
Uma Máquina de Turing Universal pode simular o comportamento de uma Máquina de Turing não determinística ao manter todas as possíveis configurações da fita principal em uma de suas fitas. Isso permite que, se a primeira configuração não for aceita, a máquina possa processar as demais configurações até que elas se esgotem ou que uma delas seja aceita.

Para simular esse comportamento na aplicação, foi adicionado o array `fitaTransicoes`. Sempre que a função `selecionarTransicao()` encontra mais de uma transição possível para o símbolo atualmente lido, ela retorna a primeira transição encontrada e envia as demais transições para o método `adicionarTransicoesND()`. Esse método é responsável por adicionar, para cada transição não determinística, um novo campo na variável `fitaTransicoes`. Cada campo contém uma das transições não determinísticas e a configuração da fita principal no momento em que o não-determinismo ocorreu.

Dessa forma, a aplicação tornou-se capaz simular o comportamento de uma Máquina de Turing não determinística ao explorar todas as possibilidades de transição e suas respectivas configurações.

## RELATÓRIO DE TESTES

### APLICAÇÃO FUNCIONA CORRETAMENTE
O arquivo `./tests/test_01.js` guarda a configuração de uma Máquina de Turing que deve ser usada para verificar se a aplicação é capaz de processar uma palavra corretamente, decidindo se a palavra fornecida na fita de entrada é aceita. 
Essa máquina decide para a linguagem L = {w ∈ {0,1}* ∣ w contém pelo menos um '1' e w termina com '0'}

#### Resultado Esperado e Resultado Obtido Para 0110
Resultado esperado: é esperado que a máquina ACEITE a palavra "0110", que pertence à linguagem.

```sh
node index.js 0110 ./tests/test_01.js
```

Resultado obtido:
- `_ q0 0110_`
- `_0 q0 110_`
- `_01 q1 10_`
- `_011 q1 0_`
- `_0110 q2 _`
- `_0110_ q3 _`
- `aceita`

#### Resultado Esperado e Resultado Obtido Para 01
Resultado esperado: é esperado que a máquina REJEITE a palavra "01", pois ela não pertence à linguagem.

```sh
node index.js 01 ./tests/test_01.js
```

Resultado obtido:
- `_ q0 01_`
- `_0 q0 1_`
- `_01 q1 _`
- `rejeita`

### TESTE DE LOOP À DIREITA
Existe a possibilidade da Máquina de Turing entrar em loop de acordo com a palavra e a função de transição apresentada. Para testar se a aplicação é capaz de simular o loop à direita foi criada a MT de testes `./tests/test_rightLoop.js`.

#### Entrada Fornecida e Resultados Esperados
A fita de entrada fornecida deve ser uma palavra contendo apenas “a” e o arquivo de teste de loop à direita. 

```sh
node index.js a ./tests/test_rightLoop.js
```

O resultado esperado é um loop onde é lido o último símbolo vazio da fita, que será substituído por “Y”. Em seguida um novo símbolo vazio é adicionado ao final da fita. O procedimento deve se repetir até que o programa seja encerrado. Esse comportamento é esperado devido à condicional dentro da função `movimentoDireita()`, que verifica se o lado direito da fita está vazio e, se estiver, adiciona um novo símbolo vazio à direita.

### TESTE DE QUEBRA À ESQUERDA
Quando a cabeça de leitura e gravação aponta para o primeiro símbolo da fita, não pode ser possível fazer um movimento à esquerda. Para testar se a aplicação é capaz de simular a “quebra” da máquina ao fazer um movimento à esquerda no primeiro símbolo é usado a Máquina de Turing do arquivo `./tests/test_leftProblem.js`.

#### Entrada Fornecida e Resultados Esperados
A fita de entrada fornecida deve ser uma palavra contendo apenas “a” e o arquivo de teste do problema à esquerda. 

```sh
node index.js a ./tests/test_leftProblem.js
```

O resultado esperado é um erro na atribuição de `transicaoSimboloLido.novoEstado` para `resultadoMovimento.estadoAtual`, na função `realizarMovimento()`. O erro ocorre devido ao condicional da função `movimentoEsquerda()`, que verifica se a cabeça de leitura e gravação já está apontando para o primeiro símbolo da fita e, se estiver, retorna undefined para a função que chamou o método `movimentoEsquerda()`.

### TESTE DO MOVIMENTO ESTÁTICO
É possível verificar a funcionalidade de transições estáticas na Máquina de Turing do arquivo `./tests/test_abc.js`, que possui um movimento estático de q2 para q3, ao ler um símbolo vazio. Apresentando uma palavra válida para esta MT, é possível ver esta funcionalidade.

#### Entrada Fornecida e Resultados Esperados
Resultado esperado: Passando uma palavra válida deve-se observar o movimento estático de q2 para q3 na última transição.

```sh
node index.js abc ./tests/test_abc.js
```

Resultado observado:

B q0 abcB

Ba q0 bcB

Bab q1 cB

Babc q2 B

Babc q3 B

aceita 

### TESTE DO NÃO DETERMINISMO
A aplicação deve ser capaz de simular o não determinismo ao executar a máquina de turing. Para fazer este teste, foi desenviolvida a MT `./tests/test_nd.js`, para a linguagem L = {w ∈ {0,1}* ∣ w termina com 0}. 

#### Entrada Fornecida e Resultados Esperados
É esperado que a função `selecionarTransicao()` encontre transições não determinísticas e adicione-as ao objeto `fitaTransicoes` para que essas transições sejam processadas posteriormente.

Resultado observado: 
_ q0 010_

_0 q0 10_

_01 q0 0_

_010 q0 _

rejeita  

_0 q1 10_

_01 q0 0_

_010 q0 _

rejeita  

_010 q1 _

aceita
