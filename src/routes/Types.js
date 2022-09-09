const { Router } = require("express");
const {Types} = require("../db.js")
const fetch = require('node-fetch')

const router = Router()

router.get("/", async (req,res)=>{



     const DesdeBd = await Types.findAll()
             
     if(DesdeBd.length < 1){
        const a = await fetch('https://pokeapi.co/api/v2/type')
        const b = await a.json()
         
      
        b.results.forEach( async (cadaUno) => {
        const subidaABd = await Types.create(
            {
               name:cadaUno.name,
                url:cadaUno.url
                })
            })
    
        // const subidaABd = await Types.create(b.results)
        
        res.json(b.results)
        // console.log(b.results)
     }
     else{
         res.json(DesdeBd)
     }

   
    })



module.exports = router;