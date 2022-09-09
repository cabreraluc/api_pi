const { Router } = require("express");
const {Pokemon} = require("../db")

const router = Router()
const {getPokemonsById, SubirPokemonesABd,sendPokemonToTrash, getPokemonsByName,createNewPokemon,getPokemons,restorePokemons, getPokemonsFromTrash} = require("../middlewares/middlewares.js")

const fetch = require("node-fetch")




router.get("/", async (req,res) =>{
    // const a = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40")
    // const b = await a.json()
   

        const {name} = req.query
    if(name){
        try {
            const resultado = await getPokemonsByName(name)
            res.json(resultado)
        } catch (error) {
            res.status(404).json({message:"No se encontro el pokemon"})
        }
        
    }else{

        const resultado = await getPokemons()
        res.json(resultado)
    }
})


router.get("/restorePokemons", async (req,res) =>{
    // const a = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40")
    // const b = await a.json()

        const resultado = await restorePokemons()
        res.json(resultado)
    })



router.get("/:id", async (req,res) =>{
    try {
            const resultado = await getPokemonsById(req.params.id)
            res.json(resultado)
    } catch (error) {
            res.status(404).json({message:req.params.id})
    }

})


router.get("/", async (req,res) =>{
    const resultado = await getPokemonsById(req.params.id)
    res.json(resultado)
    })



router.post("/", async (req,res) =>{

    const objeto = req.body
     await createNewPokemon(objeto)
    res.json("resultado")
})






module.exports = router;