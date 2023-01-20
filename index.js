const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();

app.use(express.json())

const jsonPath =path.resolve('./file/tast.json');

app.get('/tast', async (req, res) =>{
   
    const jsonFile = await fs.readFile(jsonPath,'utf8');
    res.send(jsonFile);
})

app.post("/tast", async (req, res) =>{

    const tas = req.body;
    const tastArray = JSON.parse(await fs.readFile(jsonPath, "utf8"));
    
    const lastIndex = tastArray.length - 1;
    const newId = tastArray[lastIndex].id + 1;
    tastArray.push({...tas, id: newId});
    
    await fs.writeFile(jsonPath, JSON.stringify(tastArray));
    res.end();
})
 
app.put('/tast', async (req, res) => { 
  const tastArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const {name, title, descripcion, status, id} = req.body;
 
  const choresIndex = tastArray.findIndex(chores => chores.id === id);
  
  if(choresIndex >= 0){
      tastArray[choresIndex].name = name;
      tastArray[choresIndex].title = title;
      tastArray[choresIndex].descripcion = descripcion;
      tastArray[choresIndex].status = status;
  };
 
  await fs.writeFile(jsonPath, JSON.stringify(tastArray));
  res.send('Usuario actualizado...'); 
});

//TODO/ METODO DELETE. Eliminar

app.delete('/tast', async (req, res) => {
  const tastArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const {id} = req.body;
  const choresIndex = tastArray.findIndex(chores => chores.id === id);
  tastArray.splice(choresIndex, 1);
  await fs.writeFile(jsonPath, JSON.stringify(tastArray));
  res.end();
});

  
const PORT = 8000;

app.listen(PORT, () =>{
    console.log(`servidor escuchando en el puerto ${PORT}`)
})
 