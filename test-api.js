const axios = require('axios')

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='05-08-2020'&$top=100&$format=json&$select=cotacaoVenda`

//axios.get(url).then( res =>console.log(res.data.value[0].cotacaoVenda))

const bcb = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='05-08-2020'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`


axios.get(bcb).then( res =>console.log(res.data.value[0]))