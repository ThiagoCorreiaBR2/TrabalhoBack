const rotas = require('express').Router();
const Produtos = require('../Models/Produto');
const mongoose = require('mongoose');
/**
 * 
 * @swagger 
 * components:
 *  schemas:
 *    Produtos: 
 *      type: object
 *      required:
 *        - id
 *        - nome  
 *      properties:
 *        id:
 *          type: number
 *          description: ID do produto
 *        nome:
 *          type: string
 *          description: Nome do produto
 *        desc:
 *          type: string
 *          description: Descricão do produto
 *        cor:
 *          type: string
 *          description: Cor do produto
 *        peso:
 *          type: number
 *          description: Peso do produto
 *        tipo:
 *          type: string
 *          description: Tipo do produto
 *        preco:
 *          type: number
 *          description: preco do produto
 *        Data:
 *          type: number
 *          description: Data de cadastro do produto
 *      example:
 *        id: 1
 *        nome: Computador
 *        desc: Computador HP
 *        cor: Branco
 *        peso: 2
 *        tipo: Computador
 *        preco: 1000
 *        Data: 2022
 *
 */
/**
 * 
* @swagger
* /post:
*  post:
*    summary: Cria um novo produto
*    tags: [Produtos]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Produtos'
*    responses:
*      201:
*        description: Cria um novo produto
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Produtos'
*      500:
*        description: Erro ao criar o novo produto
 */
  /**
   * 
  * @swagger
  * /get:
  *  get:
  *    summary: Retorna todos os produtos
  *    tags: [Produtos]
  *    responses:
  *      200:
  *        description: Retorna todos os produtos
  *        content:
  *          application/json:
  *            schema:
  *              type: array
  *              items:
  *                $ref: '#/components/schemas/Produtos'
  *      500:
  *        description: Erro ao obter os produtos
   */
  /**
   * 
  * @swagger
  * /get/{id}:
  *  get:
  *    summary: Retorna um produto pelo ID
  *    tags: [Produtos]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: ID do produto
  *    responses:
  *      200:
  *        description: Retorna um produto pelo ID
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Produtos'
  *      404:
  *        description: Produto não encontrado
  *      500:
  *        description: Erro ao obter o produto
  */
 /**
  *   @swagger
  * /buscarNome/{nome}:
  *  get:
  *    summary: Retorna um produto pelo nome
  *    tags: [Produtos]
  *    parameters:
  *      - in: path
  *        name: nome
  *        schema:
  *          type: string
  *        required: true
  *        description: Nome do produto
  *    responses:
  *      200:
  *        description: Retorna um produto pelo nome
  *        content: 
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Produtos'
  *      404:
  *        description: Produto não encontrado
  *      500:
  *        description: Erro ao obter o produto
  */
/**
 * @swagger
 * /update/{id}:
 *  put:  
 *    summary: Atualiza um produto pelo ID
 *    tags: [Produtos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do produto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produtos'
 *    responses:
 *      200:
 *        description: Atualiza um produto pelo ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produtos'
 *      404:
 *        description: Produto não encontrado
 *      500:
 *        description: Erro ao atualizar o produto
 */
 /**
  * 
 * @swagger
 * /delete/{id}:
 *  delete:
 *    summary: Deleta um produto pelo ID
 *    tags: [Produtos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do produto
 *    responses:
 *      200:
 *        description: Deleta um produto pelo ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produtos' 
 *      404:
 *        description: Produto não encontrado
 *      500:
 *        description: Erro ao deletar o produto
 */

//Rotas
//Essa parte confere se os produtos tiveram todos os seus campos preenchidos
function checkProducts(req, res, next) {
    const { id, nome, desc, tipo, peso, cor, preco, Data } = req.body;
    if (!id || !nome || !desc || !tipo || !peso || !cor || !preco || !Data) {
      res.status(400).json({ message: 'É necessário preencher todos os campos' });
      return;
    }
    if (
      typeof id !== 'number' || 
      typeof nome !== 'string' ||
      typeof desc !== 'string' ||
      typeof tipo !== 'string' ||
      typeof peso !== 'number' ||
      typeof cor !== 'string' ||
      typeof preco !== 'number' ||
      typeof Data !== 'number'
      /*nome: String ,
    desc: String,
    tipo: String ,
    cor: String ,
    peso: Number,
    preco: Number,
    Data: Date,*/
    ) {
      res.status(400).json({ message: 'Os campos devem ter o tipo correto' });
      return;
    }
    next();
}
function checkProductsPut(req, res, next) {
    const { nome, desc, tipo, peso, cor, preco, Data } = req.body;
    if ( !nome || !desc || !tipo || !peso || !cor || !preco || !Data) {
      res.status(400).json({ message: 'É necessário preencher todos os campos' });
      return;
    }
    if (
      typeof nome !== 'string' ||
      typeof desc !== 'string' ||
      typeof cor !== 'string' ||
      typeof peso !== 'number' ||
      typeof tipo !== 'string' ||
      typeof preco !== 'number' ||
      typeof Data !== 'number'
    ) {
      res.status(400).json({ message: 'Os campos devem ter o tipo correto' });
      return;
    }
    next();
}
//GET
rotas.get('/get', async (req, res) => {
    try {
      const produtos = await Produtos.find();
      for (const produto of produtos) {
       // delete produto.MongoClient;
      }
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: 'Não foi possível obter os produtos' });
      console.error(error);
    }
  });
  //GET com id
rotas.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const produto = await Produtos.find({ id: id });
      if (produto.length === 0) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
     // delete produto.MongoClient;
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ message: 'Não foi possível obter o produto' });
      console.error(error);
    }
});
rotas.get('/buscaNome/:nome', async (req, res) => {
    const nome = req.params.nome;
    try {
      const produtos = await Produtos.find({ nome: nome });
      if (produtos.length === 0) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Não foi possível obter o produto' });
    }
  });
//PUT 
rotas.put('/put/:id',checkProductsPut, async (req, res) => {
    const id = (req.params.id);
    console.log(id)
    const { nome, desc, tipo, peso, cor, preco, Data } = req.body;
    const infoProdutos = {
        nome,
        desc,
        tipo,
        peso,
        cor,
        preco,
        Data
    };
    try {
        // Update product using product ID
        const updatedProduct = await Produtos.findOneAndUpdate({ id: id }, infoProdutos, { new: true });
        if (!updatedProduct) {
          res.status(404).json({ message: 'Produto não encontrado' });
          return;
        }
        res.status(200).json({ message: `Atualizado com sucesso`, product: updatedProduct });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar o produto ${error}`});
      }
});
/*PUT id hexadecimal do banco de dados porque eu errei mas achei daora dmais para apagar
rotas.put('/putHex/:id',checkProductsPut, async (req, res) => {
    const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const { nome, desc, cor, peso, tipo, preco, Data } = req.body;
    try {
      const updatedProduct = await Produtos.findByIdAndUpdate(id, { nome, desc, cor, peso, tipo, preco, Data }, { new: true });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o produto' });
      console.error(error);
    }
}); */
//POST
rotas.post('/post', checkProducts,(req, res)=>{
    const {id, nome, desc, tipo, peso, cor, preco, Data} = req.body;
    console.log(id, nome, desc, tipo, peso, cor, preco, Data);
    const newProduct =  {
        id,
        nome,
        desc,
        tipo,
        peso,
        cor,
        preco,
        Data
    };
    try{
         Produtos.create(newProduct);
         res.status(201).json({message:'Objeto criado com sucesso'});    
    }
    catch (error){
        res.status(500).json({message:'Algo aconteceu, tente novamente'});
    }
})
//DELETE
rotas.delete('/delete/:id', async (req, res) => {
    const id = req.params.id; // Get product ID from route parameter
    try {
      // Delete product using product ID
      const deletedProduct = await Produtos.findOneAndDelete({ id: id }); // Use 'id' field
  
      if (!deletedProduct) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
  
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir o produto' });
    }
  });

module.exports = rotas;