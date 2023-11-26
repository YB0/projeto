const { Router } = require('express');
const Home = require('../controllers/HomeController');
const Session = require('../controllers/SessionController');
const Crud = require('../models/crud')

const routes = new Router();

routes.get('/home', Home.index);
routes.get('/', Session.index);
routes.get('/login', Session.index);
routes.post('/logar', Session.logar);
routes.get('/logout', Session.logout);

routes.get('/produtos', async (req, res) => {
    
    try {
      
        const produtos = await Crud.get_produtos();
        res.json(produtos);
    
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    
    }
  
});

routes.post('/produtos', async (req, res) => {

    const produto = req.body;
  
    try {

      await Crud.cadastrar_produto(produto);
      res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
});

routes.delete('/deletar/:id', async (req, res) => {
    
    const id = req.params.id;
  
    try {
      
        await Crud.deletar_produto(id);
        res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
    
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    
    }
  
});

routes.get('/nome/:nome', async (req, res) => {

    const nome = req.params.nome;
    
    try {
      
        const produtos = await Crud.buscar_nome(nome);
        res.json(produtos);
    
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    
    }
  
});

routes.get('/categoria/:categoria', async (req, res) => {
    
    const categoria = req.params.categoria;
  
    try {
      
        const produtos = await Crud.buscar_categoria(categoria);
        res.json(produtos);
    
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    
    }
  
});

routes.get('/id/:id', async (req, res) => {
    
    const id = req.params.id;
  
    try {
      
        const produto = await Crud.buscar_id(id);
        res.json(produto)
    
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter produto' });
    
    }
  
});

routes.put('/produtos/:id', async (req, res) => {
    
    const id = req.params.id;
    const novoProduto = req.body;
  
    try {
      
        await Crud.editar_produto(id, novoProduto);
        res.status(200).json({ mensagem: 'Produto editado com sucesso!' });
    
    } catch (error) {
     
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar produto' });
    
    }
  
});

module.exports = routes;