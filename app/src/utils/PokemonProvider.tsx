import React from "react";

interface Action {
  id: number;
  type: "init" | "success" | "error";
  data?: any;
  error?: any;
}

interface State {
  [id: string]: {
    error: any | null;
    data: any | null;
    loading: boolean;
  };
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init": {
      return {
        ...state,
        [action.id]: {
          error: null,
          loading: true,
          data: null,
        },
      };
    }
    case "success": {
      return {
        ...state,
        [action.id]: {
          error: null,
          data: action.data,
          loading: false,
        },
      };
    }
    case "error": {
      return {
        ...state,
        [action.id]: {
          data: null,
          error: action.error,
          loading: false,
        },
      };
    }
  }
};

// export class Pokemon {
//   constructor() {}
//   error: any;
//   loading: boolean;
//   data: any;
//   get: (id: number) => any;
//   set: (id: number) => void;
// }

// const initialState = new Map<string, Pokemon>();

const initialState = {};

interface PokeContext {
  state: State;
  getPokemon?: Function;
}

export const PokemonContext = React.createContext(initialState);

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getPokemon = (id: number) => {
    console.log("making network req");
    dispatch({ id, type: "init" });
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ id, type: "success", data: res });
      })
      .catch((error) => {
        dispatch({ id, type: "error", error });
      });
  };

  return (
    <PokemonContext.Provider value={{ state, getPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
