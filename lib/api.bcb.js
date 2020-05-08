// aqui está o modulo que pega a cotação dolar no BCB 
const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoApi = (data) => axios.get(getUrl(data))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + (today.getDate()) + '-' + (today.getFullYear())
}

const getCotacao = async () => {
    try { // serve para não quebrar a página! se não consegui pegar no BCB, é só colocar na mão
        const today = getToday()
        const res = await getCotacaoApi(today) //'05-08-2020'
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}

module.exports = {
    getCotacaoApi,
    getCotacao,
    extractCotacao
}

