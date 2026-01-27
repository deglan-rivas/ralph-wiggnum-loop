import { Request, Response } from 'express';
import * as pokemonRepository from '../repositories/pokemon.repository.js';

export function listPokemons(req: Request, res: Response): void {
  try {
    const pokemons = pokemonRepository.getAll();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function getPokemon(req: Request, res: Response): void {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const pokemon = pokemonRepository.getById(id);
    if (!pokemon) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }

    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function createPokemon(req: Request, res: Response): void {
  try {
    const { name, type, level } = req.body;

    if (!name || !type || level === undefined) {
      res.status(400).json({ error: 'Missing required fields: name, type, level' });
      return;
    }

    if (typeof name !== 'string' || typeof type !== 'string' || typeof level !== 'number') {
      res.status(400).json({ error: 'Invalid field types' });
      return;
    }

    const newPokemon = pokemonRepository.create({ name, type, level });
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function updatePokemon(req: Request, res: Response): void {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const { name, type, level } = req.body;
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (type !== undefined) updateData.type = type;
    if (level !== undefined) updateData.level = level;

    const updatedPokemon = pokemonRepository.update(id, updateData);
    if (!updatedPokemon) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }

    res.json(updatedPokemon);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function deletePokemon(req: Request, res: Response): void {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const deleted = pokemonRepository.deleteById(id);
    if (!deleted) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
