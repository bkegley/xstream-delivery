import React from "react";
import useGetPokemon from "../utils/useGetPokemon";

interface PokemonProps {
  id: number;
}

const Pokemon = ({ id }: PokemonProps) => {
  const { data, error, loading } = useGetPokemon(id);

  if (error) {
    return <div>oops</div>;
  }

  if (loading || !data) {
    return null;
  }

  return (
    <div>
      <img src={data.sprites.front_default} />
    </div>
  );
};

export default Pokemon;
