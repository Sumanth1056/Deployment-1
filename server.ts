import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data Store (In-memory for this demo)
  let lessons = [
    {
      id: "1",
      title: "Introduction to Renewable Energy",
      category: "Energy",
      description: "Learn the basics of solar, wind, and hydro power and why they are crucial for a sustainable future.",
      content: "# Solar Energy\nSolar power is the most abundant energy source on Earth...\n\n### Benefits\n- Renewable\n- Low Maintenance\n- Reduces Electricity Bills",
      difficulty: "Beginner",
      duration: "15 mins",
      progress: 0
    },
    {
      id: "2",
      title: "Mastering Composting",
      category: "Waste",
      description: "A comprehensive guide to starting your own compost bin at home, reducing landfill waste.",
      content: "# Composting 101\nComposting is nature's way of recycling...\n\n### What to Compost\n- Fruit scraps\n- Paper\n- Coffee grounds",
      difficulty: "Intermediate",
      duration: "20 mins",
      progress: 0
    },
    {
      id: "3",
      title: "Sustainable Fashion Choices",
      category: "Lifestyle",
      description: "How to build a capsule wardrobe and choose eco-friendly materials when shopping for clothes.",
      content: "# Slow Fashion\nFast fashion is one of the biggest polluters...\n\n### Tips\n- Buy second hand\n- Choose natural fibers\n- Quality over quantity",
      difficulty: "Beginner",
      duration: "10 mins",
      progress: 0
    }
  ];

  let userProgress = [
    { lessonId: "1", completed: false, score: 0 },
    { lessonId: "2", completed: false, score: 0 },
    { lessonId: "3", completed: false, score: 0 }
  ];

  let projects = [
    {
      id: "p1",
      title: "Zero Waste Weekend",
      description: "Try to generate zero waste for an entire weekend. Log your experience and tips.",
      participants: 124,
      category: "Waste"
    },
    {
      id: "p2",
      title: "Local Food Challenge",
      description: "Eat only locally sourced food (within 50 miles) for a whole week.",
      participants: 89,
      category: "Food"
    }
  ];

  // API Routes
  app.get("/api/lessons", (req, res) => {
    res.json(lessons);
  });

  app.get("/api/projects", (req, res) => {
    res.json(projects);
  });

  app.get("/api/progress", (req, res) => {
    res.json(userProgress);
  });

  app.post("/api/progress/update", (req, res) => {
    const { lessonId, completed } = req.body;
    const item = userProgress.find(p => p.lessonId === lessonId);
    if (item) {
      item.completed = completed;
    }
    res.json({ success: true, userProgress });
  });

  // Admin Routes
  app.post("/api/admin/lessons", (req, res) => {
    const newLesson = { ...req.body, id: String(lessons.length + 1) };
    lessons.push(newLesson);
    res.status(201).json(newLesson);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
