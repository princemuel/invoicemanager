import { BREAKPOINT_SIZES } from './constants';

type BreakPointRange = 'min' | 'max';

type BreakpointFn = (value: BreakPointRange) => string;

export const devices = {
  /**
   * @param value min or max
   * @returns (min-width: 20em) or (max-width: 20em)
   */
  xs: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.xs / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 36em) or (max-width: 36em)
   */
  sm: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.sm / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 40em) or (max-width: 40em)
   */
  md: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.sx / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 45em) or (max-width: 45em)
   */
  tab: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.md / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 65em) or (max-width: 65em)
   */
  ipad: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.lg / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 75em) or (max-width: 75em)
   */
  desk: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.xl / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 93.75em) or (max-width: 93.75em)
   */
  large: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.xxl / 16}em)`,

  /**
   * @param value min or max
   * @returns (min-width: 112.5em) or (max-width: 112.5em)
   */
  xxl: (value) => `(${media(value)}: ${BREAKPOINT_SIZES.xxxl / 16}em)`,
} satisfies Record<string, BreakpointFn>;

const media = (value: BreakPointRange) => {
  return value === 'min' ? 'min-width' : 'max-width';
};

/**
 *
 * Constrained Identity Function
 */
const constrain =
  <T extends unknown>() =>
  <U extends T>(item: U) =>
    item;

/**
 *
 * Custom Fetch Function
 */
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
const localStorageKey = '__bookshelf_token__';

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
