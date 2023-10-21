import { Review } from '../shared/review.model';
import { User } from '../shared/user.model';

export const PRODUCTS: any = {
  1: {
    id: 4,
    title: 'Antonio Visconti Silver Wood Eau de Parfum, 100ml',
    price: 175,
    description:
      'Visconti perfumes has an unmistakable, specific and enduring olfactory signature, thanks to the concentration of the essences used. These are created with the knowledge and skill of ancient apothecaries, using special blending techniques that can often take several months. This lenght of time is essential if the perfume oils are to find the ideal condition to merge and form a final, perfect harmony that is sublime and sumptuous, able to make the most important moments of life even more special.',
    stock: 45,
    image:
      'https://www.aroma-butik.ru/images/product_images/original_images/150107_0.jpg',
    rating: {
      rate: 4.2,
      count: 32,
    },
  },
  2: {
    id: 5,
    title: 'Alexandre.J The Collector Golden Oud Eau de Parfum, 100ml',
    price: 95,
    description:
      'Alexander. J reinvents the notion of fragrances. Each fragrance explores a wide range of olfactory notes dosed for a unique design and composition. The raw materials are noble and valuable. As each of them reacts differently to heat. Alexander. J has more than 20 perfumes in the market. The earliest edition was launched in 2012.',
    stock: 0,
    image:
      'https://spb.wadoo.ru/upload/iblock/a76/a767e88a45949f1c1e67eae9005cac90.png',
    rating: {
      rate: 1.2,
      count: 14,
    },
  },
  3: {
    id: 6,
    title: 'Parfums de Marly Herod Eau de Parfum, 125ml',
    price: 198,
    description:
      'Unforgettable thanks to its addictive presence and unique appeal, this exhilarating fragrance fits within the great lineage of Parfums de Marly. Its bottles features the brand’s equestrian cabinets, embossed on solid and opaque glass. Parfums de Marly has 30 perfumes in the fragrance market. The earliest edition was created in 2009.',
    stock: 9,
    image: 'https://www.laromat.ru/pics/86858MARLY_Herod.jpg',
    rating: {
      rate: 0,
      count: 0,
    },
  },
  4: {
    id: 7,
    title: 'Aedes de Venustas Oeillet Bengale Eau de Parfum, 100ml',
    price: 154,
    description:
      'The Bengale Oeillet is actually a variety of China rose, Rosa Indica caryophyllea, bred by the floral painter and botanist ',
    stock: 0,
    image: 'https://cdn1.ozone.ru/s3/multimedia-h/6180297521.jpg',
    rating: {
      rate: 4.5,
      count: 8,
    },
  },
  5: {
    id: 8,
    title: 'Ajmal Silver Shade Eau de Parfum, 100ml',
    price: 20.9,
    description:
      'Ajmal Perfumes has nearly 6 decades of expertise in crafting some of the most enchanting and enticing oriental perfumes. At Ajmal perfected the science, art and craft of oriental perfumery. These selections appeal to modern connoisseurs who are also deeply rooted in traditional values. These concentrated perfume oils and eau de parfums offer discerning consumers a truly memorable experience.',
    stock: 20,
    image: 'https://cdn1.ozone.ru/s3/multimedia-o/6400589484.jpg',
    rating: {
      rate: 2.6,
      count: 11,
    },
  },
};
export const CART: any = {
  2: {
    id: 2,
    title: 'Moresque Gold Collection Sole Eau de Parfum, 50ml',
    count: 10,
    price: '287',
  },
  1: {
    id: 1,
    title: 'Van Cleef & Arpels Extraordinaire Precious Oud Eau de Parfum, 75ml',
    count: 2,
    price: 93.5,
  },
};

export const REWIEWS: Review[] = [
  {
    id: 1,
    productId: 3,
    name: 'John S.',
    rate: 4,
    text: 'Good product!',
  },
  {
    id: 2,
    productId: 3,
    name: 'Ella A.',
    rate: 5,
    text: 'Great product!',
  },
  {
    id: 3,
    productId: 4,
    name: 'Ella A.',
    rate: 3,
    text: 'Great product!',
  },
];

export const USERS: User[] = [
  {
    email: 'user@gmail.com',
    password: '1111',
    id: 1,
  },
  {
    email: 'user2@gmail.com',
    password: '2222',
    id: 2,
  },
  {
    email: 'user3@gmail.com',
    password: '3333',
    id: 3,
  },
];
