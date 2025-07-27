# Tech-Compare JSON Format Specification

This document defines the exact JSON structure required for AI-generated comparison content that will be imported into the Tech-Compare system.

## Complete JSON Schema

```json
{
  "title": "Product A vs Product B vs Product C",
  "category": "Electronics > Smartphones",
  "introduction": "A comprehensive comparison of flagship smartphones analyzing performance, camera capabilities, battery life, and overall value proposition.",
  "items": [
    {
      "name": "iPhone 15 Pro",
      "description": "Apple's flagship smartphone featuring the A17 Pro chip, titanium construction, and advanced camera system with computational photography capabilities.",
      "image": "https://example.com/iphone-15-pro.jpg",
      "specifications": {
        "display": "6.1-inch Super Retina XDR",
        "processor": "A17 Pro chip",
        "storage": "128GB/256GB/512GB/1TB",
        "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
        "battery": "Up to 23 hours video playback",
        "price": "$999"
      }
    },
    {
      "name": "Samsung Galaxy S24 Ultra",
      "description": "Samsung's premium smartphone with S Pen integration, advanced AI features, and industry-leading camera zoom capabilities.",
      "image": "https://example.com/galaxy-s24-ultra.jpg",
      "specifications": {
        "display": "6.8-inch Dynamic AMOLED 2X",
        "processor": "Snapdragon 8 Gen 3",
        "storage": "256GB/512GB/1TB",
        "camera": "200MP Main + 50MP Periscope + 10MP Telephoto + 12MP Ultra Wide",
        "battery": "5000mAh with 45W charging",
        "price": "$1,299"
      }
    }
  ],
  "comparison_table": [
    {
      "feature": "Display Size",
      "values": {
        "iPhone 15 Pro": "6.1 inches",
        "Samsung Galaxy S24 Ultra": "6.8 inches"
      }
    },
    {
      "feature": "Starting Price",
      "values": {
        "iPhone 15 Pro": "$999",
        "Samsung Galaxy S24 Ultra": "$1,299"
      }
    },
    {
      "feature": "Camera Resolution",
      "values": {
        "iPhone 15 Pro": "48MP",
        "Samsung Galaxy S24 Ultra": "200MP"
      }
    }
  ],
  "seo_metadata": {
    "meta_title": "iPhone 15 Pro vs Samsung Galaxy S24 Ultra - Complete Comparison 2024 | Tech-Compare",
    "meta_description": "Compare iPhone 15 Pro and Samsung Galaxy S24 Ultra with detailed specs, camera performance, and pricing. Make an informed smartphone choice with our comprehensive analysis.",
    "keywords": ["iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "smartphone comparison", "flagship phones 2024", "Apple vs Samsung"]
  },
  "media": {
    "images": [
      "https://example.com/iphone-15-pro-gallery.jpg",
      "https://example.com/galaxy-s24-ultra-gallery.jpg"
    ],
    "videos": [
      "https://www.youtube.com/embed/video-id-1",
      "https://www.youtube.com/embed/video-id-2"
    ]
  },
  "disclaimer": "All product images are copyrighted by their respective manufacturers. Specifications and pricing may vary by region and are subject to change without notice.",
  "featured": true
}
```

## Field Descriptions

### Required Fields

- **title** (string): The main comparison title that will appear as the page heading
- **category** (string): Hierarchical category path using " > " separator (e.g., "Software > Project Management")
- **introduction** (string): Comprehensive overview paragraph (150-300 words) explaining the comparison's value
- **items** (array): Array of products/services being compared (minimum 2, maximum 5 recommended)
- **comparison_table** (array): Feature-by-feature comparison data
- **seo_metadata** (object): SEO optimization data

### Item Object Structure

Each item in the `items` array must contain:
- **name** (string): Product/service name
- **description** (string): Detailed description (100-200 words)
- **image** (string, optional): High-quality product image URL (recommended: 600x400px minimum)
- **specifications** (object): Key-value pairs of technical specifications

### Comparison Table Structure

Each entry in `comparison_table` array:
- **feature** (string): Feature being compared (e.g., "Display Size", "Price", "Battery Life")
- **values** (object): Key-value mapping where keys match item names exactly

### SEO Metadata Requirements

- **meta_title** (string): 50-60 characters including site name
- **meta_description** (string): 150-160 characters summarizing the comparison
- **keywords** (array): 5-10 relevant search terms

### Optional Fields

- **media** (object): Additional images and YouTube video embeds
- **disclaimer** (string): Legal disclaimer text
- **featured** (boolean): Whether to feature on homepage (default: false)

## AI Prompt Template

Use this prompt template to generate comparison JSON:

```
Generate a comprehensive product comparison in JSON format for: [PRODUCT LIST]

Requirements:
1. Research current specifications, pricing, and features for each product
2. Create 8-12 meaningful comparison features that highlight key differences
3. Write detailed, unbiased descriptions focusing on unique selling points
4. Generate SEO-optimized metadata with relevant keywords
5. Include high-quality image URLs where available
6. Format as valid JSON matching the Tech-Compare schema
7. Ensure all product names in comparison_table values match item names exactly
8. Write introduction that explains why this comparison matters to users
9. Include current pricing and availability information
10. Add appropriate disclaimer about image copyrights and specification accuracy

Category: [CATEGORY PATH]
Focus Areas: [performance/features/value/etc.]

Output only valid JSON without markdown formatting.
```

## Validation Rules

1. **JSON Validity**: Must parse as valid JSON
2. **Required Fields**: All required fields must be present and non-empty
3. **Item Consistency**: comparison_table values keys must match item names exactly
4. **URL Validation**: All URLs must be valid HTTP/HTTPS links
5. **Character Limits**: Meta title ≤60 chars, meta description ≤160 chars
6. **Array Minimums**: At least 2 items, at least 5 comparison features

## Import Process

1. Save JSON content to `/admin/import/` directory
2. Use Admin API POST `/api/admin/import` with authentication token
3. System validates JSON structure and content
4. Creates database entries and generates static HTML page
5. Updates robots.txt and sitemap.xml automatically
6. Logs import activity for review

## Example Categories

- Electronics > Smartphones
- Electronics > Laptops  
- Electronics > Headphones
- Software > Project Management
- Software > Video Editing
- Software > Antivirus
- Home Appliances > Dishwashers
- Home Appliances > Refrigerators
- Automotive > Electric Vehicles
- Automotive > SUVs