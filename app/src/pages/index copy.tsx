import React from "react";
import socketIo from "socket.io-client";
import Pokemon from "../components/Pokemon";
import PokemonProvider from "../utils/PokemonProvider";

const socket = socketIo("http://localhost:4000");

interface Message {
  displayName?: string;
  message: string;
}

const IndexPage = () => {
  const [pokemon, setPokemon] = React.useState([]);
  return (
    <PokemonProvider>
      <PokemonList pokemon={pokemon} setPokemon={setPokemon} />
    </PokemonProvider>
  );
};

const PokemonList = ({ pokemon, setPokemon }) => {
  console.log({ pokemon });

  React.useEffect(() => {
    socket.on("pokemon", (id) => {
      setPokemon((old) => {
        console.log({ old });
        setPokemon(old.concat(id));
      });
    });
  }, []);

  return (
    <div>
      {pokemon.map((poke) => (
        <Pokemon id={poke} />
      ))}
    </div>
  );
};

export default IndexPage;
