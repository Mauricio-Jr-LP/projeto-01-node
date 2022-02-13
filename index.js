const express = require('express'); //Chamando o express que foi adicionado no cmd
var bodyParser = require('body-parser') //Chamando o body-parser que foi adicionado no cmd

const path = require('path'); //Constante para poder mexer com as pastas

const app = express(); //Consatante para usar funções do express

app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

app.engine('html', require('ejs').renderFile); //Rendereiza arquivo tipo html 
app.set('view engine', 'html'); //Seta o tipo de arquivo pra html
app.use('/public', express.static(path.join(__dirname, 'public'))); //Seta a pasta public como pasta para arquivos estaticos
app.set('views', path.join(__dirname, '/views')); //Seta pasta das view //__dirname=diretorio atual


var tarefas = ['Arrumar o quarto','Comprar no supermercado']; //Array global de tarefas, são colocadas sempre que os erver iniciar

app.post('/',(req,res)=>{
    tarefas.push(req.body.tarefa); //Envia array de tarefa
    res.render('index',{tarefasList:tarefas}); //Renderiza novamente as tarefas
})//Rota da tela inicial e envia as tarefas 

app.get('/',(req,res)=>
{
    res.render('index',{tarefasList:tarefas}); //Primeiro paramento = nome do arquivo e segundo parametro um objeto que deseja passa pro arquivo
});//Rota da tela inicial, se a url tiver vazia carrega o arquivo index

app.get('/deletar/:id',(req,res)=> //Pega a rota (url) que possui o id que foi passado no <a> e passa como parametro para deletetar
{ 
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id) //Pega o id que foi passado pelo index, req = requisição | params = parametro que no caso é o /:id | id = id passado pelo index
        {
            return val;
        }
    })
    res.render('index',{tarefasList:tarefas});
})

app.listen(5000,()=>
{
    console.log('server rodando!');
}) //definição da porta e callback para sinalizar se foi iniciado 