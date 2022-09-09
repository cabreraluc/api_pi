const { Router } = require('express');
const Pokemons = require("./Pokemons.js")
const Types = require("./Types.js")
const {Deleted, Pokemon} = require("../db.js")
const {getPokemonsFromTrash,sendPokemonToTrash, restoreFromTrash} = require("../middlewares/middlewares")

 // Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons",Pokemons)
router.use("/types", Types)







router.post("/delete", function(req, res){
    const arregloConNames = req.body
    
    arregloConNames.forEach(async(element) =>{
        const pokemonEnCuestion = await Pokemon.findOne({where:{name:element}}) 
        while (!pokemonEnCuestion) {
            
        }
       
        Pokemon.destroy({where:{name:element}})
        await sendPokemonToTrash(pokemonEnCuestion.dataValues)
       
    })
    res.send("Pokemones eliminados")
})


router.get("/deleted", async (req,res) =>{
    // const a = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40")
    // const b = await a.json()
   
        
        const resultado = await getPokemonsFromTrash()
        if(resultado.length){
        res.json(resultado)}
        else{
            res.json({message:"No hay basura"})
        }
})

router.post("/deleteFromTrash", async (req,res) => {
    const arregloConNombres = req.body
    arregloConNombres.forEach(element => {
     Deleted.destroy({where:{name:element}})
    });
    
    res.send("Pokemones eliminados de la papelera")
})

router.post("/RestoreFromTrash", async (req,res) => {
    const arregloConNombres = req.body
    restoreFromTrash(arregloConNombres)
    res.send("Pokemones eliminados de la papelera")
})





module.exports = router;
