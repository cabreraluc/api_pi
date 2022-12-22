const fetch = require("node-fetch");
const { Pokemon } = require("../db");
const { Deleted } = require("../db");
const { all } = require("../routes/Pokemons");

async function traerPokemons() {
  const PokemonesDesdeBd = await Pokemon.findAll();
  return PokemonesDesdeBd;
}

pokecreate = async (objeto) => {
  const newPokemon = await Pokemon.create(objeto);
};

async function SubirPokemonesABd() {
  const a = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=40`);
  const b = await a.json();

  b.results.forEach(async (element) => {
    const busquedaIndividual = await Pokemon.findOne({
      where: { name: element.name },
    });
    const busquedaIndividual2 = await Deleted.findOne({
      where: { name: element.name },
    });
    if (!busquedaIndividual && !busquedaIndividual2) {
      const a = await fetch(element.url);
      let b = await a.json();
      let c = [];
      b.types.forEach((a) => c.push(a.type.name));
      let d = c.join().replace(",", ", ");
      b = {
        name: b.name,
        health: b.stats[0].base_stat,
        attack: b.stats[1].base_stat,
        defense: b.stats[2].base_stat,
        speed: b.stats[5].base_stat,
        height: b.height,
        weight: b.weight,
        pokeNumber: b.id,
        type: d,
        img: b.sprites.other["official-artwork"].front_default,
      };
      await pokecreate(b);
    }
  });
}

module.exports = {
  getPokemonsById: async (id) => {
    try {
      const pokemonQueBusco = await Pokemon.findByPk(id);
      return pokemonQueBusco;
    } catch (error) {
      return { message: "Pokemon no encontrado" };
    }
  },

  getPokemons: async () => {getPokemons: async ()=>{


    const a = await Pokemon.count()

    if(a){
        return traerPokemons()
    }else{
        const a= await SubirPokemonesABd()
        
        while (null===await Pokemon.findOne({where:{pokeNumber:40}})) {
            
        }
           return traerPokemons()


        
       
    }
   
   


},
  },
  getPokemonsFromTrash: async () => {
    const pokemonsFromTrash = await Deleted.findAll();
    return pokemonsFromTrash;
  },
  restorePokemons: async () => {
    const a = await SubirPokemonesABd();

    while (40 !== (await Pokemon.count())) {}
    return traerPokemons();
  },

  restoreFromTrash: async (lista) => {
    lista.forEach(async (element) => {
      const pokemonEnCuestion = await Deleted.findOne({
        where: { name: element },
      });
      console.log(element);
      while (!pokemonEnCuestion) {}
      Deleted.destroy({ where: { name: element } });
      const pokemonEnCuestionCreate = await Pokemon.create(
        pokemonEnCuestion.dataValues
      );
    });
  },

  getPokemonsByName: async (name) => {
    const pokemonQueBusco = await Pokemon.findOne({ where: { name } });

    if (pokemonQueBusco) return pokemonQueBusco;
    else {
      return error;
    }
  },
  createNewPokemon: async (objeto) => {
    let re = /,/gi;
    objeto.type = objeto.type.join().replace(re, ", ");
    objeto.health = Number(objeto.health);
    objeto.attack = Number(objeto.attack);
    objeto.defense = Number(objeto.defense);
    objeto.speed = Number(objeto.speed);
    objeto.height = Number(objeto.height);
    objeto.weight = Number(objeto.weight);
    const newPokemon = await Pokemon.create(objeto);
  },
  sendPokemonToTrash: async (objeto) => {
    const newPokemon = await Deleted.create(objeto);
  },
};
