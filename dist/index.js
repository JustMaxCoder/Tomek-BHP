// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  products;
  orders;
  gallery;
  settings;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.gallery = /* @__PURE__ */ new Map();
    this.settings = /* @__PURE__ */ new Map();
    this.seedData();
    this.seedSettings();
  }
  seedData() {
    const sampleProducts = [
      {
        name: "Kombinezon roboczy PROTECT",
        description: "Wytrzyma\u0142y kombinezon roboczy z bawe\u0142ny. Idealny do prac przemys\u0142owych i warsztatowych. Wiele kieszeni funkcjonalnych.",
        price: "159.99",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 45
      },
      {
        name: "Buty robocze BHP S3",
        description: "Bezpieczne buty robocze z metalowym podnoskiem. Antypo\u015Blizgowa podeszwa, odporno\u015B\u0107 na przebicie. Norma S3.",
        price: "249.99",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 32
      },
      {
        name: "R\u0119kawice ochronne ULTRA",
        description: "R\u0119kawice robocze z pow\u0142ok\u0105 lateksow\u0105. Doskona\u0142a przyczepno\u015B\u0107 i ochrona d\u0142oni. Rozmiar uniwersalny.",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 120
      },
      {
        name: "Kask ochronny SAFETY",
        description: "Lekki kask budowlany z regulacj\u0105. Odporna skorupa ABS, wentylacja, pasek podbr\xF3dkowy. Certyfikat CE.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 67
      },
      {
        name: "Kamizelka odblaskowa Premium",
        description: "Kamizelka ostrzegawcza klasa 2. Materia\u0142 oddychaj\u0105cy, regulowane zapi\u0119cia. Zgodna z normami UE.",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1581574919402-5b7d733224d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 88
      },
      {
        name: "Okulary ochronne VISION",
        description: "Okulary ochronne z poliw\u0119glanu. Ochrona UV, odporne na zarysowania. Regulowane zauszniki.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 95
      },
      {
        name: "Spodnie robocze MASTER",
        description: "Wzmocnione spodnie robocze z kieszeniami na nakolanniki. Materia\u0142 stretch, wysoka wytrzyma\u0142o\u015B\u0107.",
        price: "139.99",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 54
      },
      {
        name: "Nauszniki ochronne PRO",
        description: "Profesjonalne nauszniki ochronne. T\u0142umienie 32 dB, mi\u0119kkie poduszki, regulowany pa\u0142\u0105k.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
        category: "ochrona-sluchu",
        stock: 41
      },
      {
        name: "Kurtka robocza zimowa TERMO",
        description: "Ciep\u0142a kurtka robocza z odpinan\u0105 podpink\u0105. Wodoodporna, elementy odblaskowe, wiele kieszeni.",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 28
      },
      {
        name: "P\xF3\u0142buty robocze COMFORT",
        description: "Lekkie p\xF3\u0142buty robocze S1P. Kompozytowy podnosek, oddychaj\u0105cy materia\u0142, podeszwa antyelektrostatyczna.",
        price: "199.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 37
      },
      {
        name: "R\u0119kawice sk\xF3rzane PREMIUM",
        description: "Wytrzyma\u0142e r\u0119kawice ze sk\xF3ry bydl\u0119cej. Doskona\u0142e do prac ci\u0119\u017Ckich, wzmocnione szwy.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 73
      },
      {
        name: "Maska spawalnicza AUTO",
        description: "Automatyczna maska spawalnicza. Regulacja zaciemnienia, zasilanie s\u0142oneczne, lekka konstrukcja.",
        price: "349.99",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 19
      }
    ];
    sampleProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, {
        ...product,
        id,
        stock: product.stock ?? 0,
        images: [],
        available: true,
        shipping: "standard"
      });
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin ?? false
    };
    this.users.set(id, user);
    return user;
  }
  // Product methods
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = randomUUID();
    const product = {
      ...insertProduct,
      id,
      stock: insertProduct.stock ?? 0,
      images: insertProduct.images ?? [],
      available: insertProduct.available ?? true,
      shipping: insertProduct.shipping ?? "standard"
    };
    this.products.set(id, product);
    return product;
  }
  // Order methods
  async createOrder(insertOrder) {
    const id = randomUUID();
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const order = {
      ...insertOrder,
      id,
      createdAt,
      status: insertOrder.status ?? "pending",
      userId: insertOrder.userId ?? null
    };
    this.orders.set(id, order);
    return order;
  }
  async getAllOrders() {
    return Array.from(this.orders.values());
  }
  // Product update/delete methods
  async updateProduct(id, productUpdate) {
    const existing = this.products.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...productUpdate,
      images: productUpdate.images ?? existing.images,
      available: productUpdate.available ?? existing.available,
      shipping: productUpdate.shipping ?? existing.shipping
    };
    this.products.set(id, updated);
    return updated;
  }
  async deleteProduct(id) {
    this.products.delete(id);
  }
  // Gallery methods
  async getAllGalleryImages() {
    return Array.from(this.gallery.values());
  }
  async createGalleryImage(insertGallery) {
    const id = randomUUID();
    const uploadedAt = (/* @__PURE__ */ new Date()).toISOString();
    const galleryImage = {
      ...insertGallery,
      id,
      uploadedAt
    };
    this.gallery.set(id, galleryImage);
    return galleryImage;
  }
  async deleteGalleryImage(id) {
    this.gallery.delete(id);
  }
  // Settings methods
  async getSetting(key) {
    return Array.from(this.settings.values()).find((s) => s.key === key);
  }
  async setSetting(key, value) {
    const existing = await this.getSetting(key);
    if (existing) {
      existing.value = value;
      this.settings.set(existing.id, existing);
      return existing;
    }
    const id = randomUUID();
    const setting = { id, key, value };
    this.settings.set(id, setting);
    return setting;
  }
  async getAllSettings() {
    return Array.from(this.settings.values());
  }
  seedSettings() {
    const defaultSettings = [
      { key: "siteName", value: "Sklep BHP Perfekt" },
      { key: "bannerShow", value: "true" },
      { key: "bannerText", value: "Promocja! -20% na ca\u0142\u0105 odzie\u017C robocz\u0105!" },
      { key: "bannerLink", value: "/products" }
    ];
    defaultSettings.forEach((setting) => {
      const id = randomUUID();
      this.settings.set(id, { id, ...setting });
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false)
});
var products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  images: text("images").array().default(sql`ARRAY[]::text[]`),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
  available: boolean("available").notNull().default(true),
  shipping: text("shipping").notNull().default("standard")
});
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  items: text("items").notNull(),
  // JSON string of cart items
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull()
});
var gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  uploadedAt: text("uploaded_at").notNull()
});
var settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true
});
var insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  uploadedAt: true
});
var insertSettingsSchema = createInsertSchema(settings).omit({
  id: true
});
var loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
var registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});
var cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  name: z.string(),
  price: z.string(),
  image: z.string()
});

// server/routes.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
var authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
var adminMiddleware = async (req, res, next) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
var uploadDir = path.join(process.cwd(), "public", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });
var storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${nanoid(6)}${ext}`;
    cb(null, filename);
  }
});
var upload = multer({
  storage: storage_multer,
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      res.json(products2);
    } catch {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  app2.post("/api/products", authMiddleware, adminMiddleware, upload.array("images", 5), async (req, res) => {
    try {
      const files = req.files;
      const images = files ? files.map((f) => `/uploads/${f.filename}`) : [];
      const productData = {
        ...req.body,
        price: Number(req.body.price) || 0,
        stock: Number(req.body.stock) || 0,
        available: req.body.available === "true" || req.body.available === true,
        shipping: req.body.shipping || "standard",
        images: images.length > 0 ? images : []
      };
      const validatedData = insertProductSchema.parse(productData);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app2.put("/api/products/:id", authMiddleware, adminMiddleware, upload.array("images", 5), async (req, res) => {
    try {
      const files = req.files;
      const newImages = files ? files.map((f) => `/uploads/${f.filename}`) : [];
      const existingProduct = await storage.getProduct(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      const images = [...existingProduct.images || [], ...newImages];
      const updateData = {
        ...req.body,
        price: req.body.price !== void 0 ? Number(req.body.price) : void 0,
        stock: req.body.stock !== void 0 ? Number(req.body.stock) : void 0,
        available: req.body.available !== void 0 ? req.body.available === "true" || req.body.available === true : void 0,
        shipping: req.body.shipping,
        images
      };
      const product = await storage.updateProduct(req.params.id, updateData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app2.delete("/api/products/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder({
        ...validatedData,
        status: "pending"
      });
      res.status(201).json(order);
    } catch {
      res.status(400).json({ error: "Invalid order data" });
    }
  });
  app2.get("/api/orders", async (req, res) => {
    try {
      const orders2 = await storage.getAllOrders();
      res.json(orders2);
    } catch {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        isAdmin: false
      });
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin
        },
        token
      });
    } catch {
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const isValidPassword = await bcrypt.compare(
        validatedData.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin
        },
        token
      });
    } catch {
      res.status(400).json({ error: "Invalid login data" });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });
  app2.post("/api/gallery", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const galleryImage = await storage.createGalleryImage({
        filename: file.filename,
        path: `/uploads/${file.filename}`
      });
      res.status(201).json(galleryImage);
    } catch (error) {
      res.status(400).json({ error: "Failed to upload image" });
    }
  });
  app2.delete("/api/gallery/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const image = (await storage.getAllGalleryImages()).find((img) => img.id === req.params.id);
      if (image) {
        const filePath = path.join(uploadDir, path.basename(image.path));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      await storage.deleteGalleryImage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });
  app2.get("/api/settings", async (req, res) => {
    try {
      const settings2 = await storage.getAllSettings();
      res.json(settings2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });
  app2.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });
  app2.put("/api/settings/:key", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: "Value is required" });
      }
      const setting = await storage.setSetting(req.params.key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Failed to update setting" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
var vite_config_default = defineConfig({
  root: path2.resolve(__dirname, "public"),
  // 👈 теперь указываем на public
  plugins: [react()],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "public/src"),
      "@shared": path2.resolve(__dirname, "shared")
    }
  },
  build: {
    outDir: path2.resolve(__dirname, "dist/public"),
    // 👈 билд в dist/public
    emptyOutDir: true
  },
  server: {
    port: 5173
  }
});

// server/vite.ts
import { nanoid as nanoid2 } from "nanoid";
import { fileURLToPath as fileURLToPath2 } from "url";
import mime from "mime-types";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const __filename2 = fileURLToPath2(import.meta.url);
      const __dirname2 = path3.dirname(__filename2);
      const clientTemplate = path3.resolve(
        __dirname2,
        "..",
        "public",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(process.cwd(), "dist/public");
  app2.use(
    "/",
    express.static(distPath, {
      setHeaders: (res, filePath) => {
        const mimeType = mime.lookup(filePath);
        if (mimeType) res.setHeader("Content-Type", mimeType);
      }
    })
  );
  app2.get("*", (_req, res) => {
    res.sendFile(path3.join(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "127.0.0.1"
      // ✅ IPv4, работает на Windowsр
    },
    () => {
      log(`\u2705 Server running at http://127.0.0.1:${port}`);
    }
  );
})();
