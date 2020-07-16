
## Pré-requisito [opcional]

Este projeto foi desenvolvido utilizando yarn como gerenciador de pacotes, portanto para manter a consistência utilize o yarn.<br />
Caso não possua yarn na sua máquina, basta rodar via CMD o comando abaixo: 
### `npm i -g yarn`

## 1.1. Setup - yarn

Via CMD, navegue até o diretório do projeto e rode:

### `yarn`

Este comando irá baixar os pacotes necessários para execução do software.<br />

### `yarn start`

Este comando irá iniciar o app em modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para visualizar no seu browser.<br />


## 1.2. Setup - npm

Via CMD, navegue até o diretório do projeto e rode:

### `npm install`

Este comando irá baixar os pacotes necessários para execução do software.<br />

### `npm start`

Este comando irá iniciar o app em modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para visualizar no seu browser.<br />


## 2. Build - yarn ou npm [opcional]

Após o setup de sua preferência, rode na pasta do projeto:

### `npm build`

ou

### `yarn build`

Este comando irá gerar os arquivos de produção do app dentro da pasta "build".<br />
Observação: Este projeto já contem uma build que está pronta pra ser servida, para isto basta seguir os passos do item "3. Servindo o app em produção".

## 3. Servindo o app em produção [opcional]

Caso ainda não tenha instalado em sua máquina o pacote "serve", instale-o pelo comando:

### `npm i -g serve`

ou

### `yarn global add serve`

Em seguida, rode o seguinte comando na pasta do projeto:

### `serve -s build`

Este comando irá iniciar a execução da produção app.<br />
Abra [http://localhost:5000](http://localhost:5000) para visualizar no seu browser.<br />

