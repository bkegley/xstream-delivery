import fetch from "node-fetch";

import { createConnection, getConnection } from "typeorm";
import { Pokemon } from "../entity/Pokemon";
import { Ability } from "../entity/Ability";
import { GameIndex } from "../entity/GameIndex";
import { Item } from "../entity/Item";
import { Move } from "../entity/Move";
import { PokemonType } from "../entity/PokemonType";
import { Statistic } from "../entity/Statistic";

const baseUrl = "https://pokeapi.co/api/v2/";

interface ListPoke {
  name: string;
  url: string;
}

interface PokeAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokeGameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface PokeItem {
  item: {
    name: string;
    url: string;
  };
  version_details: Array<{
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }>;
}

interface PokeMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}

interface PokeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokeStatistic {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

const getPokemonIds = async (): Promise<number[]> => {
  const allPokes = await fetch(`${baseUrl}pokemon?limit=1500`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });

  return allPokes.results.map((poke: ListPoke) => {
    return parseInt(
      poke.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", "")
    );
  });
};

const createPokemon = async (id: number) => {
  const poke = await fetch(`${baseUrl}pokemon/${id}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });

  const abilities: Ability[] = await Promise.all(
    poke.abilities.map((ability: PokeAbility) => {
      const dbAbility = new Ability();
      dbAbility.is_hidden = ability.is_hidden;
      dbAbility.name = ability.ability.name;
      dbAbility.slot = ability.slot;
      dbAbility.url = ability.ability.url;
      return getConnection().manager.save(dbAbility);
    })
  );

  const game_indices: GameIndex[] = await Promise.all(
    poke.game_indices.map((gameIndex: PokeGameIndex) => {
      const dbGameIndex = new GameIndex();
      dbGameIndex.game_index = gameIndex.game_index;
      dbGameIndex.name = gameIndex.version.name;
      dbGameIndex.url = gameIndex.version.url;
      return getConnection().manager.save(dbGameIndex);
    })
  );

  const held_items: Item[] = await Promise.all(
    poke.held_items.map((item: PokeItem) => {
      const dbItem = new Item();

      dbItem.name = item.item.name;
      dbItem.url = item.item.url;
      dbItem.version_details = item.version_details;

      return getConnection().manager.save(dbItem);
    })
  );

  const moves: Move[] = await Promise.all(
    poke.moves.map((move: PokeMove) => {
      const dbMove = new Move();
      dbMove.name = move.move.name;
      dbMove.url = move.move.url;
      dbMove.version_group_details = move.version_group_details;
      return getConnection().manager.save(dbMove);
    })
  );

  const types: PokemonType[] = await Promise.all(
    poke.types.map((type: PokeType) => {
      const dbType = new PokemonType();
      dbType.name = type.type.name;
      dbType.slot = type.slot;
      dbType.url = type.type.url;
      return getConnection().manager.save(dbType);
    })
  );

  const stats: Statistic[] = await Promise.all(
    poke.stats.map((stat: PokeStatistic) => {
      const dbStat = new Statistic();
      dbStat.base_stat = stat.base_stat;
      dbStat.effort = stat.effort;
      dbStat.name = stat.stat.name;
      dbStat.url = stat.stat.url;
      return getConnection().manager.save(dbStat);
    })
  );

  const fields = [
    "base_experience",
    "forms",
    "height",
    "id",
    "is_default",
    "location_area_encounters",
    "name",
    "order",
    "species",
    "sprites",
    "weight",
  ];

  const pokemon = new Pokemon();
  fields.forEach((field: string) => {
    // @ts-ignore
    pokemon[field] = poke[field];
  });
  pokemon.abilities = abilities;
  pokemon.game_indices = game_indices;
  pokemon.held_items = held_items;
  pokemon.moves = moves;
  pokemon.stats = stats;
  pokemon.types = types;

  await getConnection().manager.save(pokemon);
  console.log(`Successfully created ${pokemon.name}`);
};

async function startServer() {
  await createConnection();
  const pokes = await getPokemonIds();
  pokes.forEach((id) => {
    createPokemon(id);
  });
  // pokes.reduce(async (acc, id) => {
  //   await acc;
  //   return createPokemon(id);
  // }, Promise.resolve());
}

startServer();
