import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertConversationSchema,
  insertMessageSchema,
  insertAutomationRuleSchema,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await storage.getConversation(id);

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      } else {
        console.error("Error creating conversation:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage({
        ...validatedData,
        timestamp: new Date().toISOString(),
      });

      await storage.updateConversation(validatedData.conversationId, {
        lastMessageAt: message.timestamp,
      });

      if (!validatedData.isFromUser && process.env.WHATSAPP_PHONE_ID && process.env.WHATSAPP_TOKEN) {
        try {
          const conversation = await storage.getConversation(validatedData.conversationId);
          if (conversation) {
            await sendWhatsAppMessage(
              conversation.phoneNumber,
              validatedData.content,
              process.env.WHATSAPP_PHONE_ID,
              process.env.WHATSAPP_TOKEN
            );
          }
        } catch (whatsappError) {
          console.error("Error sending WhatsApp message:", whatsappError);
        }
      }

      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      } else {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/automation-rules", async (req, res) => {
    try {
      const rules = await storage.getAutomationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching automation rules:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/automation-rules", async (req, res) => {
    try {
      const validatedData = insertAutomationRuleSchema.parse(req.body);
      const rule = await storage.createAutomationRule(validatedData);
      res.status(201).json(rule);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      } else {
        console.error("Error creating automation rule:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/automation-rules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rule = await storage.updateAutomationRule(id, req.body);

      if (!rule) {
        return res.status(404).json({ message: "Automation rule not found" });
      }

      res.json(rule);
    } catch (error) {
      console.error("Error updating automation rule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/automation-rules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAutomationRule(id);

      if (!deleted) {
        return res.status(404).json({ message: "Automation rule not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting automation rule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/sessions", async (req, res) => {
    try {
      const conversationId = req.query.conversationId
        ? parseInt(req.query.conversationId as string)
        : undefined;
      const sessions = await storage.getSessions(conversationId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const session = await storage.createSession({
        conversationId: req.body.conversationId,
        startedAt: new Date().toISOString(),
        endedAt: null,
        sessionType: req.body.sessionType,
        metadata: req.body.metadata || null,
      });
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.updateSession(id, req.body);

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json(session);
    } catch (error) {
      console.error("Error updating session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/statistics", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      const rules = await storage.getAutomationRules();

      const activeConversations = conversations.filter(c => c.status === "active").length;
      const totalMessages = await Promise.all(
        conversations.map(c => storage.getMessages(c.id))
      ).then(msgs => msgs.reduce((sum, m) => sum + m.length, 0));

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString();

      const messagestoday = await Promise.all(
        conversations.map(c => storage.getMessages(c.id))
      ).then(msgs =>
        msgs.flat().filter(m => m.timestamp >= todayStr).length
      );

      res.json({
        totalConversations: conversations.length,
        activeConversations,
        totalMessages,
        messagesToday: messagestoday,
        activeAutomationRules: rules.filter(r => r.isActive).length,
        totalAutomationRules: rules.length,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/webhook/whatsapp", async (req, res) => {
    try {
      const { entry } = req.body;

      if (!entry || !entry[0]) {
        return res.sendStatus(200);
      }

      const changes = entry[0].changes;
      if (!changes || !changes[0]) {
        return res.sendStatus(200);
      }

      const value = changes[0].value;
      if (!value.messages || !value.messages[0]) {
        return res.sendStatus(200);
      }

      const message = value.messages[0];
      const phoneNumber = message.from;
      const messageText = message.text?.body || "";

      let conversation = (await storage.getConversations()).find(
        c => c.phoneNumber === phoneNumber
      );

      if (!conversation) {
        conversation = await storage.createConversation({
          phoneNumber,
          contactName: value.contacts?.[0]?.profile?.name || null,
          status: "active",
          lastMessageAt: new Date().toISOString(),
          assignedTo: null,
        });
      }

      await storage.createMessage({
        conversationId: conversation.id,
        content: messageText,
        sender: phoneNumber,
        messageType: "text",
        timestamp: new Date().toISOString(),
        status: "received",
        isFromUser: true,
      });

      await storage.updateConversation(conversation.id, {
        lastMessageAt: new Date().toISOString(),
      });

      res.sendStatus(200);
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.sendStatus(200);
    }
  });

  app.get("/api/webhook/whatsapp", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "your_verify_token";

    if (mode === "subscribe" && token === verifyToken) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      whatsappConfig: {
        phoneIdConfigured: !!process.env.WHATSAPP_PHONE_ID,
        tokenConfigured: !!process.env.WHATSAPP_TOKEN,
      },
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function sendWhatsAppMessage(
  to: string,
  message: string,
  phoneNumberId: string,
  accessToken: string
): Promise<void> {
  const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: message },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`WhatsApp API error: ${error}`);
  }
}
