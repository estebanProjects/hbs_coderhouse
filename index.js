const express = require('express')
const handlebars = require('express-handlebars')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("views", "./views")
app.set("view engine", "hbs")

const container = require('./contend')

// Configuracion de la plantilla 
app.engine(
    "hbs", 
    handlebars({
        extname: "hbs",
        layoutsDir: __dirname + "/views/layaouts",
        defaultLayout: "index",
        partialsDir: __dirname + "/views/partials"
    })  
)

// CODE
// PROYECT-
const writeFileAsync = async (arr, nameFile) => {
    await fs.promises.writeFile(
      nameFile,
      JSON.stringify(arr, null, 2),
      "utf-8"
    );
  }; 
  
  const readFileAsync = async (nameFile) => {
    let file = await fs.promises.readFile(nameFile, "utf-8");
    return file;
  };
  
  const truncateAsync = async (nameFile) => {
    await fs.promises.truncate(
      nameFile, 0, function() {
  
      }
    )
  }
  // PROYECT-

let contenedor = new container.Contenedor("./productos.txt");


// Exportar
module.exports.contenedor = contenedor
module.exports.writeFileAsync = writeFileAsync
module.exports.readFileAsync = readFileAsync
module.exports.truncateAsync = truncateAsync


// Rutas
app.get('/', (req, res) => {
    res.render("main")
})

app.get('/productos', async (req, res) => {
    let productos = await contenedor.getAll() 
    console.log(productos)
    res.render("productos", {layout:"productos_all", data: productos})
    // res.send(await inde.contenedor.getAll())    
})

app.post("/", async (req, res) => {
    req.body.price = Number(req.body.price)                                                                                                                                                                      
      await contenedor.save(req.body)  
      console.log("Send")
    res.render("main")
  })

app.listen(port, () => {
    console.log('Server running on port ' + port)
})