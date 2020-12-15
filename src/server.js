// importação das funções de pages
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

// servidor
const express = require('express') // faz o requerimento de uma função, nesse caso a express
const server = express()  // guarda o retorno da função

// configurar nunjucks
const nunjucks = require('nunjucks') // faz o requerimento do nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) // torna a pasta public estática como a src
// rotas para a aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// start do servidor
.listen(5500) 