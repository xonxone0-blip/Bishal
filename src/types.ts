export type Language = 'en' | 'ne';

export interface Product {
  id: string;
  name: string;
  nepaliName: string;
  category: 'milk' | 'ghee' | 'dairy' | 'manure';
  price: number;
  unit: string;
  nepaliUnit: string;
  description: string;
  nepaliDescription: string;
  features: string[];
  nepaliFeatures: string[];
  inStock: boolean;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  nepaliAuthor: string;
  rating: number;
  date: string;
  nepaliDate: string;
  comment: string;
  nepaliComment: string;
  userType: 'Local Customer' | 'Coworker / Digital Nomad' | 'Farm Visitor' | 'Tea Farmer';
  avatarInitials: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  nepaliTitle: string;
  category: 'cows' | 'dairy' | 'coworking' | 'farm';
  image: string;
  caption: string;
  nepaliCaption: string;
}
