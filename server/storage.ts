import {
  type User,
  type InsertUser,
  type Conversation,
  type InsertConversation,
  type Message,
  type InsertMessage,
  type Session,
  type InsertSession,
  type AutomationRule,
  type InsertAutomationRule,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getConversations(): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined>;

  getMessages(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  getSessions(conversationId?: number): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: number, updates: Partial<Session>): Promise<Session | undefined>;

  getAutomationRules(): Promise<AutomationRule[]>;
  getAutomationRule(id: number): Promise<AutomationRule | undefined>;
  createAutomationRule(rule: InsertAutomationRule): Promise<AutomationRule>;
  updateAutomationRule(id: number, updates: Partial<AutomationRule>): Promise<AutomationRule | undefined>;
  deleteAutomationRule(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private sessions: Map<number, Session>;
  private automationRules: Map<number, AutomationRule>;

  private currentUserId: number;
  private currentConversationId: number;
  private currentMessageId: number;
  private currentSessionId: number;
  private currentAutomationRuleId: number;

  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.sessions = new Map();
    this.automationRules = new Map();

    this.currentUserId = 1;
    this.currentConversationId = 1;
    this.currentMessageId = 1;
    this.currentSessionId = 1;
    this.currentAutomationRuleId = 1;

    this.seedData();
  }

  private seedData() {
    const now = new Date().toISOString();
    const yesterday = new Date(Date.now() - 86400000).toISOString();

    const conv1 = this.createConversationSync({
      phoneNumber: "+27612345678",
      contactName: "John Smith",
      status: "active",
      lastMessageAt: now,
      assignedTo: null,
    });

    const conv2 = this.createConversationSync({
      phoneNumber: "+27698765432",
      contactName: "Sarah Johnson",
      status: "active",
      lastMessageAt: yesterday,
      assignedTo: null,
    });

    this.createMessageSync({
      conversationId: conv1.id,
      content: "Hi, I need help with my order",
      sender: conv1.phoneNumber,
      messageType: "text",
      timestamp: yesterday,
      status: "delivered",
      isFromUser: true,
    });

    this.createMessageSync({
      conversationId: conv1.id,
      content: "Hello! How can I help you today?",
      sender: "bot",
      messageType: "text",
      timestamp: yesterday,
      status: "delivered",
      isFromUser: false,
    });

    this.createMessageSync({
      conversationId: conv1.id,
      content: "I'd like to track my package",
      sender: conv1.phoneNumber,
      messageType: "text",
      timestamp: now,
      status: "delivered",
      isFromUser: true,
    });

    this.createAutomationRuleSync({
      name: "Welcome Message",
      trigger: "new_conversation",
      conditions: null,
      actions: JSON.stringify([{
        type: "send_message",
        content: "Welcome! How can we help you today?"
      }]),
      isActive: true,
    });

    this.createAutomationRuleSync({
      name: "Business Hours Response",
      trigger: "message_received",
      conditions: JSON.stringify({ outside_business_hours: true }),
      actions: JSON.stringify([{
        type: "send_message",
        content: "Thanks for your message. Our team will respond during business hours (9 AM - 5 PM)."
      }]),
      isActive: true,
    });
  }

  private createConversationSync(conversation: InsertConversation): Conversation {
    const id = this.currentConversationId++;
    const conv: Conversation = {
      id,
      phoneNumber: conversation.phoneNumber,
      contactName: conversation.contactName ?? null,
      status: conversation.status ?? "active",
      lastMessageAt: conversation.lastMessageAt ?? null,
      assignedTo: conversation.assignedTo ?? null,
    };
    this.conversations.set(id, conv);
    return conv;
  }

  private createMessageSync(message: InsertMessage): Message {
    const id = this.currentMessageId++;
    const msg: Message = {
      id,
      conversationId: message.conversationId,
      content: message.content,
      sender: message.sender,
      messageType: message.messageType ?? "text",
      timestamp: message.timestamp,
      status: message.status ?? "sent",
      isFromUser: message.isFromUser,
    };
    this.messages.set(id, msg);
    return msg;
  }

  private createAutomationRuleSync(rule: InsertAutomationRule): AutomationRule {
    const id = this.currentAutomationRuleId++;
    const automationRule: AutomationRule = {
      id,
      name: rule.name,
      trigger: rule.trigger,
      conditions: rule.conditions ?? null,
      actions: rule.actions,
      isActive: rule.isActive ?? true,
    };
    this.automationRules.set(id, automationRule);
    return automationRule;
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

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .sort((a, b) => {
        const timeA = new Date(a.lastMessageAt || 0).getTime();
        const timeB = new Date(b.lastMessageAt || 0).getTime();
        return timeB - timeA;
      });
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    return this.createConversationSync(insertConversation);
  }

  async updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;

    const updated = { ...conversation, ...updates };
    this.conversations.set(id, updated);
    return updated;
  }

  async getMessages(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    return this.createMessageSync(insertMessage);
  }

  async getSessions(conversationId?: number): Promise<Session[]> {
    const sessions = Array.from(this.sessions.values());
    if (conversationId) {
      return sessions.filter(s => s.conversationId === conversationId);
    }
    return sessions;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const session: Session = {
      id,
      conversationId: insertSession.conversationId,
      startedAt: insertSession.startedAt,
      endedAt: insertSession.endedAt ?? null,
      sessionType: insertSession.sessionType,
      metadata: insertSession.metadata ?? null,
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: number, updates: Partial<Session>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updated = { ...session, ...updates };
    this.sessions.set(id, updated);
    return updated;
  }

  async getAutomationRules(): Promise<AutomationRule[]> {
    return Array.from(this.automationRules.values());
  }

  async getAutomationRule(id: number): Promise<AutomationRule | undefined> {
    return this.automationRules.get(id);
  }

  async createAutomationRule(insertRule: InsertAutomationRule): Promise<AutomationRule> {
    return this.createAutomationRuleSync(insertRule);
  }

  async updateAutomationRule(id: number, updates: Partial<AutomationRule>): Promise<AutomationRule | undefined> {
    const rule = this.automationRules.get(id);
    if (!rule) return undefined;

    const updated = { ...rule, ...updates };
    this.automationRules.set(id, updated);
    return updated;
  }

  async deleteAutomationRule(id: number): Promise<boolean> {
    return this.automationRules.delete(id);
  }
}

export const storage = new MemStorage();
