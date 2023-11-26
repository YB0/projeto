const db = require("../database")

async function get_produtos() {

  const pool = await db.conectar();
  const result = await pool.query('SELECT * FROM produtos;');
  const rows = result.rows;
  return rows;

}

async function cadastrar_produto(produto) {
  
  const pool = await db.conectar();
  const sql = 'INSERT INTO produtos (categoria, nome, preco, descricao, imagem_link) VALUES ($1,$2,$3,$4,$5);';
  const values = [produto.categoria, produto.nome, produto.preco, produto.descricao, produto.imagem];
  return await pool.query(sql, values);

}

async function deletar_produto(id) {

  const pool = await db.conectar();

  const sql = 'DELETE FROM produtos WHERE id = $1;';
  const values = [id];
  return await pool.query(sql, values);

}

async function buscar_nome(nome) {

  const pool = await db.conectar();

  const sql = 'SELECT * FROM produtos WHERE nome ILIKE $1;';
  const values = ['%'+nome+'%'];
  const result = await pool.query(sql, values);

  const rows = result.rows;
  return rows;

}

async function buscar_categoria(categoria) {
  
  const pool = await db.conectar();
  
  const sql = 'SELECT * FROM produtos WHERE categoria ILIKE $1;';
  const values = ['%'+categoria+'%'];
  const result = await pool.query(sql, values);
  
  const rows = result.rows;
  return rows;

}

async function buscar_id(id) {
  
  const pool = await db.conectar();
  
  const sql = 'SELECT * FROM produtos WHERE id = $1;';
  const values = [id];
  const result = await pool.query(sql, values);
  
  const produto = result.rows[0];
  return produto;

}

async function editar_produto(id, novoProduto) {
  
  const pool = await db.conectar();
  const sql = 'UPDATE produtos SET categoria = $1, nome = $2, preco = $3, descricao = $4, imagem_link = $5 WHERE id = $6;';
  const values = [novoProduto.categoria, novoProduto.nome, novoProduto.preco, novoProduto.descricao, novoProduto.imagem, id];
  await pool.query(sql, values);

}

module.exports = {get_produtos, cadastrar_produto, deletar_produto, buscar_nome, buscar_categoria, buscar_id, editar_produto}