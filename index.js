/**
 * Reto: API de Pokemon
 *
 * Estructura de los datos de entrenadores
 *  {
 *    "id": 1,
 *    "nombre": "Ash Ketchup",
 *    "region": "Kanto",
 *    "pokemon": [
 *      "Pikachu",
 *      "Charmander",
 *      "Squirtle"
 *    ]
 * }
 *
 *
 * 1. Obtener la lista de los NOMBRES y ID de los entrenadores
 *
 * 2. Obtener la info de un entrenador por su ID
 *
 * 3. Obtener el listado de POKEMON de un entrenador (por ID)
 *
 * 4. Crear un nuevo entrenador (sin pokemon)
 *
 * 5. Agregar un pokemon a un entrenador
 */

const express = require('express');
const entrenadores = require('./entrenadores.json');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.end('Poke API')
});

// Obtener los nombres y ID's de los entrenadores

app.get('/Entrenadores', (req, res) => {
    const resultado = entrenadores.map( ent => {
        return {id: ent.id, nombre: ent.nombre };
    });
    res.json(resultado);
})

// Obtener la información de un entrenador por su ID

app.get('/Entrenadores/:id', (req, res) => {
    const { id } = req.params;
    entrenador = entrenadores.find(ent => ent.id === parseInt(id));
    if(!entrenador) {
        return res.end('No se encontró al entrenador');
    }
    res.json(entrenador);
});

// Obtener los pokemon de un entrenador por su ID

app.get('/Entrenadores/:id/pokemon', (req, res) => {
    const { id } = req.params;

    pokemon = entrenadores.find(ent => ent.id === parseInt(id)).pokemon;
    if(!pokemon) {
        return res.end('No se encontró al entrenador');
    }
    res.json(pokemon);
})

// Crear un nuevo entrenador

app.get('/agregarEntrenador', (req, res) => {
    const data = req.body;
    let lastID = entrenadores[entrenadores.length-1].id;

    entrenadores.push({...data, id: ++lastID});
    res.end('Entrenador agregado');
})

// Agregar un pokemon a un entrenador

app.get('/agregarPokemon/', (req, res) => {
    const { id, pokemon } = req.body;
    entrenadores.find(ent => ent.id === id).pokemon.push(pokemon);
    
    res.end(`Se agregó el pokemon ${pokemon} al entrenador con ID: ${id}`);
})

app.listen(8080, () => {
    console.log("> Servidor escucuando en puerto 8080");
});