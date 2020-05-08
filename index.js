// --* Importando os arquivos *--

const express = require('express')
const app = express()
const path = require('path') // para Zeit funcionar
const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')
const port = process.env.PORT || 3000 // instalando o ZEIT


// --* Mostrando o caminho das Páginas e como será a página

app.set('view engine', 'ejs') // falando que as página de html serão em ejs
app.set('views', path.join(__dirname, 'views')) // mostrando o caminho(onde esta a pasta) para as página html
app.use(express.static(path.join(__dirname, 'public')))// caminho da pasta public

// --* montando as páginas *--

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao() // colocando a cotação do BCB na página.
        res.render('home', {cotacao})
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores Inválidos'
        })
    }

})

// --* Montando o Servidor *--

app.listen(port, err => {
    if (err) {
        console.log('Erro ao iniciar o Servidor!')
    } else {
        console.log('Servidor rodando Perfeitamente!')
    }
})

