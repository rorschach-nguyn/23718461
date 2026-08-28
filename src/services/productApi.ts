// src/services/productApi.ts
import { PRICE_MULTIPLIER } from '@constants/student';

export type CategoryId = 'all' | 'food' | 'drink' | 'study';

export interface RawApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductItem {
  id: number;
  title: string;
  rawPrice: number;
  priceVnd: number;
  description: string;
  category: string;
  categoryType: CategoryId;
  categoryLabel: string;
  image: string;
}

function parseCategoryType(categoryStr: string): { type: CategoryId; label: string } {
  const lower = (categoryStr || '').toLowerCase();
  if (lower.includes('clothing')) {
    return { type: 'study', label: 'Học tập' };
  }
  if (lower.includes('jewel')) {
    return { type: 'drink', label: 'Nước' };
  }
  return { type: 'food', label: 'Đồ ăn' };
}

export async function fetchProducts(): Promise<ProductItem[]> {
  const res = await fetch('https://fakestoreapi.com/products?limit=8');
  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}`);
  }
  const data: RawApiProduct[] = await res.json();

  return data.map((item) => {
    const { type, label } = parseCategoryType(item.category);
    const priceVnd = Math.round(item.price * PRICE_MULTIPLIER);

    return {
      id: item.id,
      title: item.title,
      rawPrice: item.price,
      priceVnd,
      description: item.description,
      category: item.category,
      categoryType: type,
      categoryLabel: label,
      image: item.image,
    };
  });
}