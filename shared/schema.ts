import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull(),
  contactName: text("contact_name"),
  status: text("status").notNull().default("active"),
  lastMessageAt: text("last_message_at"),
  assignedTo: text("assigned_to"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(),
  messageType: text("message_type").notNull().default("text"),
  timestamp: text("timestamp").notNull(),
  status: text("status").notNull().default("sent"),
  isFromUser: boolean("is_from_user").notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  startedAt: text("started_at").notNull(),
  endedAt: text("ended_at"),
  sessionType: text("session_type").notNull(),
  metadata: text("metadata"),
});

export const automationRules = pgTable("automation_rules", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(),
  conditions: text("conditions"),
  actions: text("actions").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  contactName: text("contact_name"),
  email: text("email").notNull(),
  companyName: text("company_name"),
  phone: text("phone"),
  role: text("role"),
  message: text("message"),
  interestedFeatures: text("interested_features").notNull(),
  preferredPlan: text("preferred_plan"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
});

export const insertAutomationRuleSchema = createInsertSchema(automationRules).omit({
  id: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

export type InsertAutomationRule = z.infer<typeof insertAutomationRuleSchema>;
export type AutomationRule = typeof automationRules.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
