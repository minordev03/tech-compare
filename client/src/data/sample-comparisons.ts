// This file contains sample comparison data for development and testing purposes
// In production, this would be replaced by actual API data

import type { Comparison, Category } from "@shared/schema";

export const sampleCategories: Category[] = [
  {
    id: "software",
    name: "Software",
    icon: "fas fa-laptop",
    path: "software",
    comparisonCount: 245
  },
  {
    id: "electronics",
    name: "Electronics", 
    icon: "fas fa-mobile-alt",
    path: "electronics",
    comparisonCount: 189
  },
  {
    id: "appliances",
    name: "Home Appliances",
    icon: "fas fa-home", 
    path: "appliances",
    comparisonCount: 156
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "fas fa-car",
    path: "automotive", 
    comparisonCount: 98
  }
];

export const sampleComparisons: Comparison[] = [
  {
    id: "iphone-15-pro-vs-galaxy-s24-ultra",
    title: "iPhone 15 Pro vs Samsung Galaxy S24 Ultra",
    category: "electronics",
    categoryPath: "Consumer Electronics > Smartphones",
    introduction: "Both flagship devices represent the pinnacle of smartphone technology in 2024. This comprehensive comparison analyzes performance, camera capabilities, battery life, and overall value to help you make an informed decision.",
    items: [
      {
        name: "iPhone 15 Pro",
        description: "Apple's flagship smartphone with A17 Pro chip and titanium design",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        specs: {
          display: "6.1 inches",
          processor: "A17 Pro", 
          ram: "8GB",
          camera: "48MP",
          battery: "3,274 mAh",
          price: "$999"
        }
      },
      {
        name: "Samsung Galaxy S24 Ultra", 
        description: "Samsung's premium smartphone with Snapdragon 8 Gen 3 and S Pen",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        specs: {
          display: "6.8 inches",
          processor: "Snapdragon 8 Gen 3",
          ram: "12GB", 
          camera: "200MP",
          battery: "5,000 mAh",
          price: "$1,299"
        }
      }
    ],
    comparisonTable: [
      {
        feature: "Display Size",
        values: {
          "iPhone 15 Pro": "6.1 inches",
          "Samsung Galaxy S24 Ultra": "6.8 inches"
        }
      },
      {
        feature: "Processor",
        values: {
          "iPhone 15 Pro": "A17 Pro",
          "Samsung Galaxy S24 Ultra": "Snapdragon 8 Gen 3"
        }
      },
      {
        feature: "RAM", 
        values: {
          "iPhone 15 Pro": "8GB",
          "Samsung Galaxy S24 Ultra": "12GB"
        }
      },
      {
        feature: "Main Camera",
        values: {
          "iPhone 15 Pro": "48MP", 
          "Samsung Galaxy S24 Ultra": "200MP"
        }
      },
      {
        feature: "Battery",
        values: {
          "iPhone 15 Pro": "3,274 mAh",
          "Samsung Galaxy S24 Ultra": "5,000 mAh" 
        }
      },
      {
        feature: "Starting Price",
        values: {
          "iPhone 15 Pro": "$999",
          "Samsung Galaxy S24 Ultra": "$1,299"
        }
      }
    ],
    seoMetadata: {
      metaTitle: "iPhone 15 Pro vs Samsung Galaxy S24 Ultra - Complete Comparison | Tech-Compare",
      metaDescription: "Compare iPhone 15 Pro and Samsung Galaxy S24 Ultra with detailed specs, camera quality, and performance benchmarks. Make an informed smartphone choice.",
      keywords: ["iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "smartphone comparison", "flagship phones", "mobile comparison"]
    },
    media: {
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      ],
      videos: []
    },
    disclaimer: "All product images are copyrighted by their respective vendors and sources. Specifications may vary by region and are subject to change.",
    updatedAt: "2024-01-24T00:00:00Z",
    featured: true
  }
];

export const searchIndex = sampleComparisons.flatMap(comparison => 
  [comparison.title, ...comparison.items.map(item => item.name), comparison.category]
    .filter(Boolean)
    .map(term => ({ term: term.toLowerCase(), comparisonId: comparison.id }))
);

export function searchComparisons(query: string): typeof sampleComparisons {
  const lowercaseQuery = query.toLowerCase();
  return sampleComparisons.filter(comparison => 
    comparison.title.toLowerCase().includes(lowercaseQuery) ||
    comparison.category.toLowerCase().includes(lowercaseQuery) ||
    comparison.items.some(item => item.name.toLowerCase().includes(lowercaseQuery))
  );
}

export function getComparisonsByCategory(categoryId: string): typeof sampleComparisons {
  return sampleComparisons.filter(comparison => comparison.category === categoryId);
}

export function getFeaturedComparisons(): typeof sampleComparisons {
  return sampleComparisons.filter(comparison => comparison.featured);
}

export function getRecentComparisons(limit: number = 10): typeof sampleComparisons {
  return sampleComparisons
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}
