const router = require("express").Router()
const Person = require("../models/Person");

// create
router.post('/', async (req, res) => {
  //req.body
  const { name, salary, approved } = req.body;

  if(!name) return res.status(422).json({ error:"Nome de usuário invalido !" })

  const person = {
    name,
    salary,
    approved
  }

  // Create

  try {
    await Person.create(person)
    res.status(201).json({ message:'Registrado com sucesso !'})
  } 
  catch(err){
    res.status(500).json({ error: err })
  }
})

// Read - leitura de dados
router.get('/', async (req, res) => {
  try {

    const people = await Person.find() // busca por todos dados do banco
    res.status(200).json(people)
    
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/:id', async (req, res) => {

  // extrair dados da requisição; req.params
  const id = req.params.id
  try {
    const person = await Person.findOne({ _id: id }) // Buscar por um parametro ou resposta
    if(!person) return res.status(422).json({ message: 'Usuário não encontrado !' })
    
    res.status(200).json(person)

  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// atualização de dados ( PUT && PATCH )
// PUT = Objeto completo para o sistema.
// PATCH = Atualização parcial.

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body
  const person = {
    name, 
    salary,
    approved
  }

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person)
    if(updatePerson.matchedCount === 0) return res.status(422).json({ message: 'Usuário não encontrado !' })
    res.status(200).json(person)

  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// Delete - Deletar dados (Obvio)

router.delete('/:id', async (req, res) => {

  const id = req.params.id
  const person = await Person.findOne({ _id: id }) // Buscar po
  if(!person) return res.status(422).json({ message: 'Usuário não encontrado !' })

  try {
    
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário deletado com sucesso !'})

  } catch (err) {
    res.status(500).json({ error: err })
  }

})


module.exports = router