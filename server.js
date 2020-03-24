
//Install express server
const express = require('express');
const path = require('path');

const app = express();

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}else{

    app.use(express.static(__dirname + '/dist/<name-of-app>'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// Serve only the static files form the dist directory

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);