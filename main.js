/*
URLs de exemplo
https://resultados.tse.jus.br/oficial/ele2022/arquivo-urna/407/config/pr/pr-p000407-cs.json
https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=pr;ufbu=pr;mubu=76678;zn=0042;se=0002/dados-de-urna/rdv
https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=pr;ufbu=pr;mubu=76678;zn=0042;se=0002/dados-de-urna/rdv
*/
const axios = require('axios');
const fs = require('fs');

/**
 * As siglas de todos as Unidades da Federação.
 * @typedef estados
 * @type {Array}
 */
estados = [
    'MG',
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

/**
 * Aguarda ms segundos.
 * @param {Number} ms O número de milisegundos que deve aguardar.
 * @returns {void}
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
var objReturn = [];
/**
 * Obtém os dados de todas as seções eleitorais do país.
 * @param {Array} estados Array das siglas dos estados.
 * @returns {Promise} Quando resolvida retorna um JSON com os dados.
 */
const getData = async (estados) =>{
    for (let eachState of estados){
        await axios(`https://resultados.tse.jus.br/oficial/ele2022/arquivo-urna/407/config/${eachState.toLowerCase()}/${eachState.toLowerCase()}-p000407-cs.json`)
            .then(function (response) {
                let sintese = {};
                let geral = response.data.abr[0];
                    sintese['uf'] = geral['cd'];
                    sintese['nome'] = geral['ds'];
                    sintese['code_municipio'] = []
                for (let eachCity of geral['mu']){
                    let echCt = {'codigo': eachCity['cd'], 'nome': eachCity['nm']};
                    echCt['zonas'] = eachCity['zon'].map((eachZone) =>{
                        let session = []
                        for( let cdZona of eachZone['sec']){
                            session.push({
                                'secao':cdZona['ns'], 
                                'urlrdv':`https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=${eachState.toLowerCase()};ufbu=${eachState.toLowerCase()};mubu=${eachCity['cd']};zn=${eachZone['cd']};se=${cdZona['ns']}/dados-de-urna/rdv`,
                                'urlboletim':`https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e545;uf=${eachState.toLowerCase()};ufbu=${eachState.toLowerCase()};mubu=${eachCity['cd']};zn=${eachZone['cd']};se=${cdZona['ns']}/dados-de-urna/boletim-de-urna`
                            });
                        }
                        return {'zona': eachZone['cd'], 'secoes':session}
                    });

                    sintese['code_municipio'].push(echCt)
                }
                objReturn.push(sintese)
            });
            sleep(2000)
    }

}

/*
    Grava o json em um arquivo .json
*/
getData(estados)
    .then(() => {
        let data = JSON.stringify(objReturn, null, 2);
        fs.writeFile('dadosEleicoes.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

    })
