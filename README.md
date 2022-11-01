## Visão geral 
Este Script Obtém os dados do Site do TSE (https://resultados.tse.jus.br/) para auxílio àqueles que pretendem comparar os dados dos boletins de urna com o resultado apresentado pelo TSE no site.
Basicamente o script faz requisições para as urls de resultados do boletim de urna (Ex: https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=mg;ufbu=mg;mubu=40274;zn=0013;se=0110/dados-de-urna/boletim-de-urna) e RDV (Ex: https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=mg;ufbu=mg;mubu=40274;zn=0013;se=0106/dados-de-urna/rdv), gerando um json (dadosEleicoes.json).

O Script depende do pacote axios (https://www.npmjs.com/package/axios)
```
npm install axios
```
ou

```
bower install axios
```
ou
```
yarn install axios
```
ou 
```
pnpm  install axios
```


A execução do arquivo é muito simples:
```
node main.js
```
