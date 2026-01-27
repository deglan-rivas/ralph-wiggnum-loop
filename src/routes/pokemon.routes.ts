import { Router } from 'express';
import * as pokemonController from '../controllers/pokemon.controller.js';

const router = Router();

router.get('/', pokemonController.listPokemons);
router.get('/:id', pokemonController.getPokemon);
router.post('/', pokemonController.createPokemon);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

export default router;
