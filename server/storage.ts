import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Kombinezon roboczy PROTECT",
        description: "Wytrzymały kombinezon roboczy z bawełny. Idealny do prac przemysłowych i warsztatowych. Wiele kieszeni funkcjonalnych.",
        price: "159.99",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 45,
      },
      {
        name: "Buty robocze BHP S3",
        description: "Bezpieczne buty robocze z metalowym podnoskiem. Antypoślizgowa podeszwa, odporność na przebicie. Norma S3.",
        price: "249.99",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 32,
      },
      {
        name: "Rękawice ochronne ULTRA",
        description: "Rękawice robocze z powłoką lateksową. Doskonała przyczepność i ochrona dłoni. Rozmiar uniwersalny.",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 120,
      },
      {
        name: "Kask ochronny SAFETY",
        description: "Lekki kask budowlany z regulacją. Odporna skorupa ABS, wentylacja, pasek podbródkowy. Certyfikat CE.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 67,
      },
      {
        name: "Kamizelka odblaskowa Premium",
        description: "Kamizelka ostrzegawcza klasa 2. Materiał oddychający, regulowane zapięcia. Zgodna z normami UE.",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1581574919402-5b7d733224d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 88,
      },
      {
        name: "Okulary ochronne VISION",
        description: "Okulary ochronne z poliwęglanu. Ochrona UV, odporne na zarysowania. Regulowane zauszniki.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 95,
      },
      {
        name: "Spodnie robocze MASTER",
        description: "Wzmocnione spodnie robocze z kieszeniami na nakolanniki. Materiał stretch, wysoka wytrzymałość.",
        price: "139.99",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 54,
      },
      {
        name: "Nauszniki ochronne PRO",
        description: "Profesjonalne nauszniki ochronne. Tłumienie 32 dB, miękkie poduszki, regulowany pałąk.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
        category: "ochrona-sluchu",
        stock: 41,
      },
      {
        name: "Kurtka robocza zimowa TERMO",
        description: "Ciepła kurtka robocza z odpinaną podpinką. Wodoodporna, elementy odblaskowe, wiele kieszeni.",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 28,
      },
      {
        name: "Półbuty robocze COMFORT",
        description: "Lekkie półbuty robocze S1P. Kompozytowy podnosek, oddychający materiał, podeszwa antyelektrostatyczna.",
        price: "199.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 37,
      },
      {
        name: "Rękawice skórzane PREMIUM",
        description: "Wytrzymałe rękawice ze skóry bydlęcej. Doskonałe do prac ciężkich, wzmocnione szwy.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 73,
      },
      {
        name: "Maska spawalnicza AUTO",
        description: "Automatyczna maska spawalnicza. Regulacja zaciemnienia, zasilanie słoneczne, lekka konstrukcja.",
        price: "349.99",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 19,
      },
    ];

    sampleProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const order: Order = { ...insertOrder, id, createdAt };
    this.orders.set(id, order);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const storage = new MemStorage();
