import { Pokemon } from '../models/pokemon.model.js';

let pokemons: Pokemon[] = [
  { id: 1, name: 'Bulbasaur', type: 'grass', level: 5 },
  { id: 2, name: 'Charmander', type: 'fire', level: 5 },
  { id: 3, name: 'Squirtle', type: 'water', level: 5 }
];

let nextId = 4;

export function getAll(): Pokemon[] {
  return pokemons;
}

export function getById(id: number): Pokemon | undefined {
  return pokemons.find(p => p.id === id);
}

export function create(pokemon: Omit<Pokemon, 'id'>): Pokemon {
  const newPokemon: Pokemon = {
    id: nextId++,
    ...pokemon
  };
  pokemons.push(newPokemon);
  return newPokemon;
}

export function update(id: number, data: Partial<Omit<Pokemon, 'id'>>): Pokemon | null {
  const index = pokemons.findIndex(p => p.id === id);
  if (index === -1) {
    return null;
  }
  pokemons[index] = { ...pokemons[index], ...data };
  return pokemons[index];
}

export function deleteById(id: number): boolean {
  const index = pokemons.findIndex(p => p.id === id);
  if (index === -1) {
    return false;
  }
  pokemons.splice(index, 1);
  return true;
}
