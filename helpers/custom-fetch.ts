const localStorageKey = '__bookshelf_token__';

export async function client(
  endpoint: string,
  { body, ...customConfig } = {} as Record<string, any>
) {
  const token = window.localStorage.getItem(localStorageKey);
  const headers: Record<string, any> = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config: Record<string, any> = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        logout();
        // @ts-expect-error
        window.location.assign(window.location);
        return;
      }
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      }
    });
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

// const formatDate = (date: Date) =>
//   `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
//     date.getSeconds()
//   ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`;

// type PokemonData = {
//   id: string;
//   number: string;
//   name: string;
//   image: string;
//   fetchedAt: string;
//   attacks: {
//     special: Array<{
//       name: string;
//       type: string;
//       damage: number;
//     }>;
//   };
// };

// async function fetchPokemon(name: string): Promise<PokemonData> {
//   const pokemonQuery = `
//     query PokemonInfo($name: String) {
//       pokemon(name: $name) {
//         id
//         number
//         name
//         image
//         attacks {
//           special {
//             name
//             type
//             damage
//           }
//         }
//       }
//     }
//   `;

//   const response = await window.fetch('https://graphql-pokemon2.vercel.app/', {
//     // learn more about this API here: https://graphql-pokemon2.vercel.app/
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json;charset=UTF-8',
//     },
//     body: JSON.stringify({
//       query: pokemonQuery,
//       variables: { name: name.toLowerCase() },
//     }),
//   });

//   type JSONResponse = {
//     data?: {
//       pokemon: Omit<PokemonData, 'fetchedAt'>;
//     };
//     errors?: Array<{ message: string }>;
//   };
//   const { data, errors }: JSONResponse = await response.json();
//   if (response.ok) {
//     const pokemon = data?.pokemon;
//     if (pokemon) {
//       // add fetchedAt helper (used in the UI to help differentiate requests)
//       return Object.assign(pokemon, { fetchedAt: formatDate(new Date()) });
//     } else {
//       return Promise.reject(new Error(`No pokemon with the name "${name}"`));
//     }
//   } else {
//     // handle the graphql errors
//     const error = new Error(
//       errors?.map((e) => e.message).join('\n') ?? 'unknown'
//     );
//     return Promise.reject(error);
//   }
// }
