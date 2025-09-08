import bodyParser from "express"
import express from "express"
import {Plato} from "./domain/dominio.js";
const app = express()
const port = 3000

class RepoPlatos {
  platos = []

  guardarPlato(plato){
    plato.id = this.platos.length + 1
    this.platos.push(plato)
    return plato;
  }

  buscarPorId(id){
    return this.platos.find(p => p.id === id)
  }

  listar(){
    return this.platos
  }
}

const Menu =  new RepoPlatos()

app.use(bodyParser.json())

//Crear un plato
//POST /platos
app.post('/platos', (req, res) => {
  const nuevoPlato = new Plato({
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
  })
  const platoGuardado = Menu.guardarPlato(nuevoPlato)
  res.status(201).json(platoGuardado)
})

//Ver todos los platos
app.get('/platos', (req, res) => {
  // Response
  // 200
  //[{
  //     "nombre": "Ravioles con bolognesa",
  //     "precio": 10000,
  //     "categoria": "PRINCIPAL"
  // },
  // {
  //     "nombre": "Pizza",
  //     "precio": 6500,
  //     "categoria": "PRINCIPAL"
  // }]
  res.status(200).json(Menu.listar())
})

//Ver un plato
app.get('/platos/:id', (req, res) => {
  const idRecibido = parseInt(req.params.id, 10); // lo convierto a número
  const plato = Menu.buscarPorId(idRecibido);

  if (!plato) {
    return res.status(404).json({ error: `No se encontró el plato con id ${idRecibido}` });
  }

  res.status(200).json(plato);
})

//Modificar un plato
app.put('/platos/:id', (req, res) => {
  //Body
  //{
  //     "id": 1,
  //     "nombre": "Ravioles con bolognesa",
  //     "precio": 10000,
  //     "categoria": "PRINCIPAL"
  // }
  //Response 200
  //{
  //     "id": 1,
  //     "nombre": "Ravioles con bolognesa",
  //     "precio": 10000,
  //     "categoria": "PRINCIPAL"
  // } (Opcional)
  const platoActualizar = new Plato({
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
  })
  const idPlatoActualizar = parseInt(req.params.id, 10)
  const platoAactualizar = Menu.buscarPorId(idPlatoActualizar)

  platoAactualizar.nombre = platoActualizar.nombre
  platoAactualizar.categoria = platoActualizar.categoria
  platoAactualizar.precio = platoActualizar.precio

  res.status(200).json(platoActualizar)
})


//Marcar un plato como no disp.
app.patch('/platos/:id', (req, res) => {
  //Body
  //{
  //     "estaDisponible": false
  // }
  // Response 200

  const platoActualizar = new Plato({
    estaDisponible: req.body.estaDisponible
  })

  const idPlatoActualizar = parseInt(req.params.id, 10)
  const platoAactualizar = Menu.buscarPorId(idPlatoActualizar)

  platoAactualizar.estaDisponible = platoActualizar.estaDisponible

  res.status(200).json(platoAactualizar)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})