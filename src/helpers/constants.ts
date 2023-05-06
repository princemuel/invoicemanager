import { capitalize } from './utils';

export const constants = {
  PLACEHOLDER_IMAGE:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCwoLCg8ODAwODxYQERAREBYiFRkVFRkVIh4kHhweJB42KiYmKjY+NDI0PkxERExfWl98fKcBBgYGBgcGBwgIBwoLCgsKDw4MDA4PFhAREBEQFiIVGRUVGRUiHiQeHB4kHjYqJiYqNj40MjQ+TERETF9aX3x8p//CABEIAFAAUAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgMHCAEEBQb/2gAIAQEAAAAAsvkyGTAk1IO8pJ8tBhGYhrh6vnW47oNlcPGu9+fPSA2efrf0OPbDaBkIkqptX02jLJiM6WIkCw8o7yTl1Di5Ww9tWam+LKq8VkEPyNdCifkVIU2jYkr/xAAZAQACAwEAAAAAAAAAAAAAAAACAwABBAX/2gAIAQIQAAAAblTvhcgesRZ83QhRDSoKpn//xAAaAQABBQEAAAAAAAAAAAAAAAACAAEDBAUG/9oACAEDEAAAAKWpbwkHVFzMcd69ioFKDJ3cP//EADUQAAEDAwIEBAMFCQAAAAAAAAECAwQABREGEgchMUEQE1FxIzJhFCAigaEkMENSYnORsbL/2gAIAQEAAT8A/eTp8aBEdlSF7W2xkn/QFXriPcH3HExlllvshPzfmaY13dobu5qepPqCdwNaZ4msznUMT0NpJwA810yf5k/f4s3dDEOFCC8KUovL9hyFIdm3WZ9mhgD1UegFRNFQXE4euRW73DbiautkXYyJUO5Jd8oBa2s/FQM/MMVpe5quunrXOUQVPR0lR9VDkfvcb25qrnaW2W8+ewUJP1SasVuet1sC2GQ6+vkSe1RLROnX6O624UNJKC6Rke4qXo2UxdX2ypZZfcKvPIBBZUMFs9wa0fZzZNM2m3KcC1MMAKUOhKiVeOazWa1LZGL1bVMLbSpxCgtonsodsnsakOXiwXh+NObLe7C8HBGFHqCKmasb+xurYkojObCGso3FSu5AqxaucDq0Trm+4XEpShK8FvJ9qgn9iif2G/8AkVnwzWazWa4vWVcuwi6R0ZfhfP8AVldIuKFv71gZCAlKlDcE889KTdhsIW+F5UMI8tKR16jFQZMeTDjPx3EOMuNJLa0HKSMdq3Vms1nw51xafksaOkOMTksEPIyg/wAcd26ccUtRJAHtSeorSOvNQ6cfZTHlLciJXlcRZ+GoVY+MmnZ6g3NYehLPc/ERUK526e0HIcxh9J7oWFeG2sVd71bLLDVKnyUMtjpnqo+iR3NcR9cPaqmseW2WokbcGW+53dVqojn0oJ6ZpKsdKRILfTmfWmZslpYcQ6pKwchQPMVwo17NvK3bTcnvNfbb3sOn5lpHVKvDiLxERphCIcNKVz3UZ59GkHuau1/ud3kqfnTHX3PVZzj6CiaV1A8CcAn0oHn+VJVXCt5aNcWbb3cWD7FB8NbXc3PU13lbypCpSw2f6EnaK3/qa71nK/BR/CaTkmh+grhQnOubR7un/DZr/8QAIBEAAgICAgIDAAAAAAAAAAAAAQIAEQMEEDEhQRMgcf/aAAgBAgEBPwCbO3jwUDZY+hMO/jyEBlKEn6Z0HzO7Vd+IgtqJBFRRSj85za6vZ9zHrhDK5PUqKZ4PU6swknle5//EACARAAICAgEFAQAAAAAAAAAAAAECABEDBAUQICExQWH/2gAIAQMBAT8AnH8Vs71lKVB7Y+pt8Ds4AWTIuVQPNe+zU2GGpgwYiQtEu36fkZnVbUENMpByuQPp6XNXcfFSfLmTfLi7A8QmyZfQWDLldtQz/9k=',

  BASE_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:4000',
  ONE_DAY: 24 * 3600 * 1000,

  DEFAULT_TITLE_META_TAG: 'Invoice Mail Web',
  DEFAULT_SITE_LOGO: '/assets/svgs/logo.svg',
  DEFAULT_DESC_META_TAG:
    'Browse and purchase the best audio devices on the market located at the heart of New York City. Audiophile is a premier online store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment. This web application presents the products using the most user-friendly format with accessibility in mind.',
  RENDER_TITLE_META_TAG: (text?: string) =>
    text
      ? `Invoice Mail Web | ${capitalize(text)}`
      : constants?.DEFAULT_TITLE_META_TAG,
  RENDER_DESC_META_TAG: (text?: string) =>
    text ? capitalize(text) : constants?.DEFAULT_DESC_META_TAG,

  BASE_URL_PROD: 'https://invoicemail.vercel.app',
};
