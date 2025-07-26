import { type Comparison, type Category, type SearchResult } from "@shared/schema";

export interface IStorage {
  // Comparison operations
  getAllComparisons(): Promise<Comparison[]>;
  getComparisonById(id: string): Promise<Comparison | undefined>;
  getComparisonsByCategory(categoryId: string): Promise<Comparison[]>;
  getFeaturedComparisons(): Promise<Comparison[]>;
  getRecentComparisons(limit?: number): Promise<Comparison[]>;
  searchComparisons(query: string): Promise<SearchResult[]>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
}

export class MemStorage implements IStorage {
  private comparisons: Map<string, Comparison>;
  private categories: Map<string, Category>;

  constructor() {
    this.comparisons = new Map();
    this.categories = new Map();
    this.initializeData();
  }

  private async initializeData() {
    // Initialize categories
    const categories: Category[] = [
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

    categories.forEach(category => {
      this.categories.set(category.id, category);
    });

    // Initialize sample comparisons
    const comparisons: Comparison[] = [
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
      },
      {
        id: "notion-vs-asana-vs-monday",
        title: "Notion vs Asana vs Monday.com",
        category: "software",
        categoryPath: "Software > Project Management",
        introduction: "Comprehensive comparison of leading project management and productivity platforms for teams. Analyze features, pricing, and usability to choose the best tool for your workflow.",
        items: [
          {
            name: "Notion",
            description: "All-in-one workspace for notes, tasks, and collaboration",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
            specs: {
              pricing: "Free - $16/user/month",
              storage: "Unlimited",
              teamSize: "Unlimited",
              integrations: "50+",
              mobileApp: "Yes"
            }
          },
          {
            name: "Asana",
            description: "Project management tool for team coordination and task tracking",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
            specs: {
              pricing: "Free - $24.99/user/month",
              storage: "100GB - Unlimited",
              teamSize: "15 - Unlimited",
              integrations: "200+",
              mobileApp: "Yes"
            }
          },
          {
            name: "Monday.com",
            description: "Visual project management platform with customizable workflows",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
            specs: {
              pricing: "$8 - $16/user/month",
              storage: "5GB - 1TB",
              teamSize: "3 - Unlimited",
              integrations: "200+",
              mobileApp: "Yes"
            }
          }
        ],
        comparisonTable: [
          {
            feature: "Starting Price",
            values: {
              "Notion": "Free",
              "Asana": "Free",
              "Monday.com": "$8/user/month"
            }
          },
          {
            feature: "Storage",
            values: {
              "Notion": "Unlimited",
              "Asana": "100GB",
              "Monday.com": "5GB"
            }
          },
          {
            feature: "Integrations",
            values: {
              "Notion": "50+",
              "Asana": "200+",
              "Monday.com": "200+"
            }
          }
        ],
        seoMetadata: {
          metaTitle: "Notion vs Asana vs Monday.com - Project Management Tool Comparison | Tech-Compare",
          metaDescription: "Compare Notion, Asana, and Monday.com project management platforms. Features, pricing, and team collaboration tools analysis.",
          keywords: ["Notion", "Asana", "Monday.com", "project management", "productivity tools", "team collaboration"]
        },
        updatedAt: "2024-01-17T00:00:00Z",
        featured: true
      },
      {
        id: "kitchenaid-vs-bosch-dishwashers",
        title: "KitchenAid vs Bosch Dishwashers",
        category: "appliances",
        categoryPath: "Home Appliances > Dishwashers",
        introduction: "Energy efficiency, cleaning performance, and value comparison of premium dishwasher brands. Find the perfect dishwasher for your kitchen needs.",
        items: [
          {
            name: "KitchenAid KDTM404KPS",
            description: "Premium dishwasher with ProWash cycle and third rack",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
            specs: {
              capacity: "14 place settings",
              energyRating: "Energy Star",
              noiseLevel: "39 dBA",
              cycles: "6 wash cycles",
              price: "$849"
            }
          },
          {
            name: "Bosch SHPM78W55N",
            description: "German-engineered dishwasher with PrecisionWash technology",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
            specs: {
              capacity: "16 place settings",
              energyRating: "Energy Star",
              noiseLevel: "42 dBA",
              cycles: "8 wash cycles",
              price: "$999"
            }
          }
        ],
        comparisonTable: [
          {
            feature: "Capacity",
            values: {
              "KitchenAid KDTM404KPS": "14 place settings",
              "Bosch SHPM78W55N": "16 place settings"
            }
          },
          {
            feature: "Noise Level",
            values: {
              "KitchenAid KDTM404KPS": "39 dBA",
              "Bosch SHPM78W55N": "42 dBA"
            }
          },
          {
            feature: "Price",
            values: {
              "KitchenAid KDTM404KPS": "$849",
              "Bosch SHPM78W55N": "$999"
            }
          }
        ],
        seoMetadata: {
          metaTitle: "KitchenAid vs Bosch Dishwashers - Performance & Value Comparison | Tech-Compare",
          metaDescription: "Compare KitchenAid and Bosch dishwashers for energy efficiency, cleaning performance, and value. Choose the best dishwasher for your kitchen.",
          keywords: ["KitchenAid dishwasher", "Bosch dishwasher", "dishwasher comparison", "kitchen appliances", "energy efficient"]
        },
        updatedAt: "2024-01-21T00:00:00Z",
        featured: true
      },
      {
        id: "macbook-air-vs-dell-xps-13",
        title: "MacBook Air vs Dell XPS 13",
        category: "electronics",
        categoryPath: "Consumer Electronics > Laptops",
        introduction: "Premium ultrabook comparison featuring Apple's M-series chip against Intel's latest processors.",
        items: [
          {
            name: "MacBook Air M3",
            description: "Apple's ultra-thin laptop with M3 chip and all-day battery life",
            specs: {
              processor: "Apple M3",
              ram: "8GB - 24GB",
              storage: "256GB - 2TB SSD",
              display: "13.6-inch Liquid Retina",
              price: "$1,099"
            }
          },
          {
            name: "Dell XPS 13",
            description: "Premium Windows ultrabook with Intel processors and InfinityEdge display",
            specs: {
              processor: "Intel Core i5/i7",
              ram: "8GB - 32GB",
              storage: "256GB - 1TB SSD",
              display: "13.4-inch FHD+",
              price: "$999"
            }
          }
        ],
        comparisonTable: [
          {
            feature: "Processor",
            values: {
              "MacBook Air M3": "Apple M3",
              "Dell XPS 13": "Intel Core i5/i7"
            }
          },
          {
            feature: "Starting Price",
            values: {
              "MacBook Air M3": "$1,099",
              "Dell XPS 13": "$999"
            }
          }
        ],
        seoMetadata: {
          metaTitle: "MacBook Air vs Dell XPS 13 - Ultrabook Comparison | Tech-Compare",
          metaDescription: "Compare MacBook Air M3 and Dell XPS 13 ultrabooks. Performance, battery life, and value analysis.",
          keywords: ["MacBook Air", "Dell XPS 13", "ultrabook comparison", "laptop comparison", "M3 chip"]
        },
        updatedAt: "2024-01-19T00:00:00Z",
        featured: false
      },
      {
        id: "tesla-model-3-vs-bmw-i4",
        title: "Tesla Model 3 vs BMW i4",
        category: "automotive",
        categoryPath: "Automotive > Electric Vehicles",
        introduction: "Electric sedan comparison between Tesla's popular Model 3 and BMW's luxury i4.",
        items: [
          {
            name: "Tesla Model 3",
            description: "Popular electric sedan with Autopilot and Supercharger network access",
            specs: {
              range: "272-358 miles",
              acceleration: "3.1-5.8 seconds",
              charging: "Supercharger network",
              price: "$38,990"
            }
          },
          {
            name: "BMW i4",
            description: "Luxury electric sedan with BMW's driving dynamics and premium interior",
            specs: {
              range: "270-324 miles",
              acceleration: "3.7-5.7 seconds",
              charging: "DC fast charging",
              price: "$51,400"
            }
          }
        ],
        comparisonTable: [
          {
            feature: "Range",
            values: {
              "Tesla Model 3": "272-358 miles",
              "BMW i4": "270-324 miles"
            }
          },
          {
            feature: "Starting Price",
            values: {
              "Tesla Model 3": "$38,990",
              "BMW i4": "$51,400"
            }
          }
        ],
        seoMetadata: {
          metaTitle: "Tesla Model 3 vs BMW i4 - Electric Sedan Comparison | Tech-Compare",
          metaDescription: "Compare Tesla Model 3 and BMW i4 electric sedans. Range, performance, and luxury features analysis.",
          keywords: ["Tesla Model 3", "BMW i4", "electric vehicle", "EV comparison", "electric sedan"]
        },
        updatedAt: "2024-01-12T00:00:00Z",
        featured: false
      }
    ];

    comparisons.forEach(comparison => {
      this.comparisons.set(comparison.id, comparison);
    });
  }

  async getAllComparisons(): Promise<Comparison[]> {
    return Array.from(this.comparisons.values());
  }

  async getComparisonById(id: string): Promise<Comparison | undefined> {
    return this.comparisons.get(id);
  }

  async getComparisonsByCategory(categoryId: string): Promise<Comparison[]> {
    return Array.from(this.comparisons.values()).filter(
      comparison => comparison.category === categoryId
    );
  }

  async getFeaturedComparisons(): Promise<Comparison[]> {
    return Array.from(this.comparisons.values()).filter(
      comparison => comparison.featured
    );
  }

  async getRecentComparisons(limit: number = 10): Promise<Comparison[]> {
    return Array.from(this.comparisons.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  async searchComparisons(query: string): Promise<SearchResult[]> {
    const lowercaseQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    for (const comparison of Array.from(this.comparisons.values())) {
      let relevance = 0;

      // Title match (highest weight)
      if (comparison.title.toLowerCase().includes(lowercaseQuery)) {
        relevance += 10;
      }

      // Category match
      if (comparison.category.toLowerCase().includes(lowercaseQuery) || 
          comparison.categoryPath.toLowerCase().includes(lowercaseQuery)) {
        relevance += 5;
      }

      // Introduction match
      if (comparison.introduction.toLowerCase().includes(lowercaseQuery)) {
        relevance += 3;
      }

      // Item names match
      for (const item of comparison.items) {
        if (item.name.toLowerCase().includes(lowercaseQuery)) {
          relevance += 7;
        }
      }

      if (relevance > 0) {
        results.push({
          id: comparison.id,
          title: comparison.title,
          category: comparison.categoryPath,
          relevance
        });
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }
}

export const storage = new MemStorage();
