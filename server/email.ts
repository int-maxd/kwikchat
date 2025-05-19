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

    // Format the email content with styled HTML
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New KwikFlow Consultation Request</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(to right, #0080ff, #50c878);
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .logo .kwik {
            font-weight: 500;
          }
          .logo .flow {
            font-weight: 800;
          }
          h1 {
            color: #0080ff;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #50c878;
          }
          .label {
            color: #0080ff;
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }
          .value {
            margin: 0 0 10px;
          }
          .footer {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <span class="kwik">kwik</span><span class="flow" style="color: #50c878;">FLOW</span>
            </div>
          </div>
          
          <h1>New Consultation Request</h1>
          
          <div class="section">
            <span class="label">Client Information</span>
            <p class="value"><strong>Name:</strong> ${request.fullName}</p>
            <p class="value"><strong>Email:</strong> ${request.email}</p>
            ${request.company ? `<p class="value"><strong>Company:</strong> ${request.company}</p>` : ""}
            ${request.phone ? `<p class="value"><strong>Phone:</strong> ${request.phone}</p>` : ""}
          </div>
          
          <div class="section">
            <span class="label">Project Details</span>
            ${request.systems ? `<p class="value"><strong>Systems in use:</strong> ${request.systems}</p>` : ""}
            <p class="value"><strong>Description:</strong></p>
            <p class="value">${request.message}</p>
          </div>
          
          <div class="section">
            <span class="label">Additional Information</span>
            <p class="value"><strong>Date Submitted:</strong> ${new Date(request.createdAt).toLocaleString('en-ZA', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Africa/Johannesburg'
            })}</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} KwikFlow. All rights reserved.</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181, South Africa</p>
          </div>
        </div>
      </body>
      </html>
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
    
    // Format the email content with styled HTML
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your KwikFlow Consultation Request</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(to right, #0080ff, #50c878);
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .logo .kwik {
            font-weight: 500;
          }
          .logo .flow {
            font-weight: 800;
          }
          h1 {
            color: #0080ff;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .thank-you-message {
            font-size: 16px;
            background: #f0f9ff;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #0080ff;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #50c878;
          }
          .label {
            color: #0080ff;
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }
          .value {
            margin: 0 0 10px;
          }
          .next-steps {
            background: #f0fff5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #50c878;
          }
          .contact-info {
            margin-top: 20px;
            padding: 15px;
            background: #f5f7fa;
            border-radius: 5px;
          }
          .button {
            display: inline-block;
            background: #50c878;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .footer {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <span class="kwik">kwik</span><span class="flow" style="color: #50c878;">FLOW</span>
            </div>
          </div>
          
          <h1>Thank You for Your Consultation Request</h1>
          
          <div class="thank-you-message">
            <p>Dear ${request.fullName},</p>
            <p>We've received your consultation request and appreciate your interest in KwikFlow's automation services.</p>
          </div>
          
          <div class="next-steps">
            <span class="label">Next Steps</span>
            <p>Our team will review your information and get back to you within one business day to schedule your free consultation.</p>
          </div>
          
          <div class="section">
            <span class="label">Your Request Details</span>
            <p class="value"><strong>Name:</strong> ${request.fullName}</p>
            ${request.company ? `<p class="value"><strong>Company:</strong> ${request.company}</p>` : ""}
            ${request.systems ? `<p class="value"><strong>Systems you're using:</strong> ${request.systems}</p>` : ""}
            <p class="value"><strong>What you'd like to automate:</strong></p>
            <p class="value">${request.message}</p>
          </div>
          
          <div class="contact-info">
            <p>If you have any questions in the meantime, please don't hesitate to contact us:</p>
            <p><strong>Email:</strong> hello@kwikflow.co.za</p>
            <p><strong>Phone:</strong> +27 63 698 3961</p>
          </div>
          
          <div class="signature">
            <p>We look forward to showing you how KwikFlow can streamline your business processes!</p>
            <p>Best regards,<br>The KwikFlow Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} KwikFlow. All rights reserved.</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181, South Africa</p>
          </div>
        </div>
      </body>
      </html>
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
