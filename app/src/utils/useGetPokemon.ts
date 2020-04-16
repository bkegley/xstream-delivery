import React from "react";
import { PokemonContext } from "./PokemonProvider";

const useGetPokemon = (id: number) => {
  const context = React.useContext(PokemonContext);
  if (!context) return null;
  // @ts-ignore
  const pokemon = context.state[id];
  if (!pokemon || (!pokemon.loading && !pokemon.data && !pokemon.error)) {
    // @ts-ignore
    context.getPokemon(id);
  }
  return pokemon || {};
  // const { error, loading, data, getPokemon } = context;
  // const pokemon = data.find((pokemon) => pokemon.id === id);
  // if (!data || !pokemon) {
  //   getPokemon(id);
  // }

  // return { error, loading, data: pokemon };
  return {};
};

export default useGetPokemon;
