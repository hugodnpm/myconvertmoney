// --* Importando os arquivos *--

const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')

// --* Mostrando o caminho das Páginas e como será a página

app.set('view engine', 'ejs') // falando que as página de html serão em ejs
app.set('views', path.join(__dirname, 'views')) // mostrando o caminho(onde esta a pasta) para as página html
app.use(express.static(path.join(__dirname, 'public')))// caminho da pasta public

// --* montando as páginas *--

app.get('/', (req, res) => {
    res.render('home')
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

app.listen(3000, err => {
    if (err) {
        console.log('Erro ao iniciar o Servidor!')
    } else {
        console.log('Servidor rodando Perfeitamente!')
    }
})

