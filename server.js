//Importa as depend�ncias que acabamos de instalar
const express = require('express');
const path = require('path');

const app = express();

// Serve os arquivos est�ticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/Enigma'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/Enigma/index.html'));
});

// Inicia a aplica��o pela porta configurada
app.listen(process.env.PORT || 8080);