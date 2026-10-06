
const products = [
  {
    id: 1,
    name: 'Hades II',
    price: 15000,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1758942442',
    description: 'Battle beyond the Underworld using dark sorcery to take on the Titan of Time in this bewitching sequel to the award-winning rogue-like dungeon crawler.',
  },
  {
    id: 2,
    name: 'Hollow Knight: Silksong',
    price: 10500,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1756994410',
    description: 'Discover a vast, haunted kingdom in Hollow Knight: Silksong! Explore, fight and survive as you ascend to the peak of a land ruled by silk and song.',
  },
  {
    id: 3,
    name: 'Stardew Valley',
    price: 7500,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg?t=1754692865',
    description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
  },
  {
    id: 4,
    name: 'DOOM Eternal',
    price: 26900,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/782330/header.jpg?t=1755109910',
    description: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
  },
  {
    id: 5,
    name: 'Balatro',
    price: 8300,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/7a85430784e4d613cdb0547414d8cf16ffa45747/header.jpg?t=1757947116',
    description: 'The poker roguelike. Balatro is a hypnotically satisfying deckbuilder where you play illegal poker hands, discover game-changing jokers, and trigger adrenaline-pumping, outrageous combos.',
  },
];

export function getProducts() {

  // Las promesas (Promise) son una forma de manejar operaciones asincrónicas en JavaScript.
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(products);
    }, 1000);
  })
}

export function getProductById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      return setTimeout(() => {
        resolve(product);
      }, 1000);
    } else {
      reject(new Error("Producto no encontrado"));
    }
  });
}