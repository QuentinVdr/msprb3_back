import type { UserType } from './UserType';

export type PlantType = {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isNeedingCare: boolean;
  isNeedingTips: boolean;
  images: string[];
  owner: UserType;
};
