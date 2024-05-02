import { botanistUser, casualUser, casualUser2 } from './users';

export const defaultPlants = [
  {
    id: 1,
    name: 'Peace Lily',
    description: 'A popular indoor plant',
    address: '123 Green Street',
    city: 'Plantville',
    postalCode: '44001',
    latitude: 47.216672,
    longitude: -1.57,
    isNeedingCare: false,
    isNeedingTips: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Spathiphyllum_floribundum1.jpg/1200px-Spathiphyllum_floribundum1.jpg'
    ],
    owner: casualUser
  },
  {
    id: 2,
    name: 'Aloe Vera',
    description: 'A plant with potential medicinal properties',
    address: '123 Herbal Lane',
    city: 'Herbville',
    postalCode: '44001',
    latitude: 47.216672,
    longitude: -1.57,
    isNeedingCare: false,
    isNeedingTips: true,
    images: ['https://www.willemsefrance.fr/cdn/shop/files/wil_56458_10_1700058448671.jpg?v=1700058544'],
    owner: casualUser
  },
  {
    id: 3,
    name: 'Snake Plant',
    description: 'A hardy indoor plant',
    address: '456 Green Street',
    city: 'Plantville',
    postalCode: '44002',
    latitude: 47.216673,
    longitude: -1.58,
    isNeedingCare: false,
    isNeedingTips: false,
    images: ['https://thewateringcan.ca/wp-content/uploads/2021/03/6-Laurentii-snake-scaled-1-scaled-scaled.jpg'],
    owner: botanistUser
  },
  {
    id: 4,
    name: 'Spider Plant',
    description: 'A popular houseplant with striped leaves',
    address: '789 Leafy Boulevard',
    city: 'Greentown',
    postalCode: '44003',
    latitude: 47.216674,
    longitude: -1.59,
    isNeedingCare: true,
    isNeedingTips: true,
    images: [
      'https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/spider-plant_t50-ss_0.jpg?itok=T7nxutm9'
    ],
    owner: casualUser2
  }
];
