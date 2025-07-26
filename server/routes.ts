import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all comparisons
  app.get("/api/comparisons", async (_req, res) => {
    try {
      const comparisons = await storage.getAllComparisons();
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comparisons" });
    }
  });

  // Get comparison by ID
  app.get("/api/comparisons/:id", async (req, res) => {
    try {
      const comparison = await storage.getComparisonById(req.params.id);
      if (!comparison) {
        return res.status(404).json({ error: "Comparison not found" });
      }
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comparison" });
    }
  });

  // Get featured comparisons
  app.get("/api/comparisons/featured", async (_req, res) => {
    try {
      const comparisons = await storage.getFeaturedComparisons();
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured comparisons" });
    }
  });

  // Get recent comparisons
  app.get("/api/comparisons/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const comparisons = await storage.getRecentComparisons(limit);
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent comparisons" });
    }
  });

  // Get comparisons by category
  app.get("/api/categories/:categoryId/comparisons", async (req, res) => {
    try {
      const comparisons = await storage.getComparisonsByCategory(req.params.categoryId);
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category comparisons" });
    }
  });

  // Search comparisons
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const results = await storage.searchComparisons(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
