import { users, type User, type InsertUser, type ConsultationRequest, type InsertConsultationRequest } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createConsultationRequest(request: InsertConsultationRequest & { createdAt: string }): Promise<ConsultationRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private consultationRequests: Map<number, ConsultationRequest>;
  currentUserId: number;
  currentConsultationId: number;

  constructor() {
    this.users = new Map();
    this.consultationRequests = new Map();
    this.currentUserId = 1;
    this.currentConsultationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest & { createdAt: string }): Promise<ConsultationRequest> {
    const id = this.currentConsultationId++;
    
    // Handle optional fields with appropriate defaults for a ConsultationRequest
    const request: ConsultationRequest = { 
      id,
      fullName: insertRequest.fullName,
      email: insertRequest.email,
      message: insertRequest.message,
      createdAt: insertRequest.createdAt,
      company: insertRequest.company || null,
      phone: insertRequest.phone || null,
      systems: insertRequest.systems || null
    };
    
    this.consultationRequests.set(id, request);
    console.log("Created consultation request:", request);
    return request;
  }
}

export const storage = new MemStorage();
