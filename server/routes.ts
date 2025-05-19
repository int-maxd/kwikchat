import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendConsultationRequestEmail, sendCustomerConfirmationEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for submitting consultation requests
  app.post("/api/consultation-requests", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      
      // Add timestamp
      const consultationRequest = {
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Store the consultation request
      const result = await storage.createConsultationRequest(consultationRequest);
      
      // Send email notifications
      try {
        // Send notification to business
        await sendConsultationRequestEmail(result);
        
        // Send confirmation to customer
        await sendCustomerConfirmationEmail(result);
      } catch (emailError) {
        // Log email errors but don't fail the request
        console.error("Error sending email notifications:", emailError);
      }
      
      // Return success response
      res.status(201).json({
        message: "Consultation request received",
        id: result.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error processing consultation request:", error);
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "ok",
      emailConfig: {
        mailgunApiConfigured: !!process.env.MAILGUN_API_KEY,
        mailgunDomainConfigured: !!process.env.MAILGUN_DOMAIN
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
