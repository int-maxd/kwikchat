import FormData from "form-data";
import Mailgun from "mailgun.js";
import { ConsultationRequest } from "@shared/schema";

// Initialize Mailgun client
const mailgun = new Mailgun(FormData);

// Create a function to get a fresh client each time with latest credentials
function getMailgunClient() {
  console.log("Creating Mailgun client with API key:", 
    process.env.MAILGUN_API_KEY ? `${process.env.MAILGUN_API_KEY.substring(0, 4)}...` : "missing");
  
  return mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
    url: "https://api.eu.mailgun.net", // Use EU endpoint for EU domains
  });
}

function getMailgunDomain() {
  console.log("Using domain:", process.env.MAILGUN_DOMAIN || "missing");
  return process.env.MAILGUN_DOMAIN || "";
}

/**
 * Send a notification email about a new consultation request
 */
export async function sendConsultationRequestEmail(
  request: ConsultationRequest,
) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error("Mailgun credentials not found in environment variables");
    return false;
  }

  try {
    // Get fresh client and domain
    const mg = getMailgunClient();
    const domain = getMailgunDomain();

    // Format the email content
    const emailContent = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${request.fullName}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      ${request.company ? `<p><strong>Company:</strong> ${request.company}</p>` : ""}
      ${request.phone ? `<p><strong>Phone:</strong> ${request.phone}</p>` : ""}
      ${request.systems ? `<p><strong>Systems:</strong> ${request.systems}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${request.message}</p>
      <p><strong>Date:</strong> ${new Date(request.createdAt).toLocaleString()}</p>
    `;

    // Set up email data
    const data = {
      from: `KwikFlow <noreply@${domain}>`,
      to: "hello@kwikflow.co.za", // Change this to your notification email
      subject: `New Consultation Request from ${request.fullName}`,
      html: emailContent,
      "h:Reply-To": request.email,
    };

    console.log(`Sending notification email to hello@kwikflow.co.za with domain: ${domain}`);
    
    // Send the email
    const response = await mg.messages.create(domain, data);
    console.log("Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Send a confirmation email to the customer
 */
export async function sendCustomerConfirmationEmail(
  request: ConsultationRequest,
) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error("Mailgun credentials not found in environment variables");
    return false;
  }

  try {
    // Get fresh client and domain
    const mg = getMailgunClient();
    const domain = getMailgunDomain();
    
    // Format the email content
    const emailContent = `
      <h2>Thank You for Your Consultation Request</h2>
      <p>Dear ${request.fullName},</p>
      <p>We've received your consultation request and appreciate your interest in KwikFlow's automation services.</p>
      <p>Our team will review your information and get back to you within one business day to schedule your free consultation.</p>
      <h3>Your Request Details:</h3>
      <p><strong>Name:</strong> ${request.fullName}</p>
      ${request.company ? `<p><strong>Company:</strong> ${request.company}</p>` : ""}
      ${request.systems ? `<p><strong>Systems you're using:</strong> ${request.systems}</p>` : ""}
      <p><strong>What you'd like to automate:</strong></p>
      <p>${request.message}</p>
      <p>If you have any questions in the meantime, please don't hesitate to contact us at hello@kwikflow.co.za.</p>
      <p>We look forward to showing you how KwikFlow can streamline your business processes!</p>
      <p>Best regards,<br>
      The KwikFlow Team</p>
    `;

    // Set up email data
    const data = {
      from: `KwikFlow <noreply@${domain}>`,
      to: request.email,
      subject: "Thank You for Your Consultation Request",
      html: emailContent,
    };

    console.log(`Sending confirmation email to ${request.email} with domain: ${domain}`);
    
    // Send the email
    const response = await mg.messages.create(domain, data);
    console.log("Confirmation email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
}
