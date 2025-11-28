import FormData from "form-data";
import Mailgun from "mailgun.js";
import { Lead } from "@shared/schema";

interface ConsultationRequest {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  systems?: string;
  message: string;
  createdAt: string;
}

// Initialize Mailgun client
const mailgun = new Mailgun(FormData);

// Create a function to get a fresh client each time with latest credentials
function getMailgunClient() {
  console.log(
    "Creating Mailgun client with API key:",
    process.env.MAILGUN_API_KEY
      ? `${process.env.MAILGUN_API_KEY.substring(0, 4)}...`
      : "missing"
  );

  return mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
    url: "https://api.eu.mailgun.net" // Use EU endpoint for EU domains
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
  request: ConsultationRequest
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
        <title>New kwikFlow Consultation Request</title>
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
            background: #f9f9f9;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            letter-spacing: -0.025em;
          }
          h1 {
            color: #152434;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #A9D65C;
          }
          .label {
            color: #4A96AD;
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
              <span style="color: #4A96AD; font-weight: 500;">kwik</span><span style="color: #A9D65C; font-weight: 800;">FLOW</span>
            </div>
          </div>
          
          <h1>New Consultation Request</h1>
          
          <div class="section">
            <span class="label">Client Information</span>
            <p class="value"><strong>Name:</strong> ${request.fullName}</p>
            <p class="value"><strong>Email:</strong> ${request.email}</p>
            ${
              request.company
                ? `<p class="value"><strong>Company:</strong> ${request.company}</p>`
                : ""
            }
            ${
              request.phone
                ? `<p class="value"><strong>Phone:</strong> ${request.phone}</p>`
                : ""
            }
          </div>
          
          <div class="section">
            <span class="label">Project Details</span>
            ${
              request.systems
                ? `<p class="value"><strong>Systems in use:</strong> ${request.systems}</p>`
                : ""
            }
            <p class="value"><strong>Description:</strong></p>
            <p class="value">${request.message}</p>
          </div>
          
          <div class="section">
            <span class="label">Additional Information</span>
            <p class="value"><strong>Date Submitted:</strong> ${new Date(
              request.createdAt
            ).toLocaleString("en-ZA", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Africa/Johannesburg"
            })}</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} kwikFlow. All rights reserved.</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181, South Africa</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Set up email data
    const data = {
      from: `kwikFlow <noreply@${domain}>`,
      to: "hello@kwikflow.co.za", // Change this to your notification email
      subject: `New Consultation Request from ${request.fullName}`,
      html: emailContent,
      "h:Reply-To": request.email
    };

    console.log(
      `Sending notification email to hello@kwikflow.co.za with domain: ${domain}`
    );

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
  request: ConsultationRequest
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
        <title>Thank You for Your kwikFlow Consultation Request</title>
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
            background: #f9f9f9;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            letter-spacing: -0.025em;
          }
          h1 {
            color: #152434;
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
            border-left: 4px solid #4A96AD;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #A9D65C;
          }
          .label {
            color: #4A96AD;
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
            border-left: 4px solid #A9D65C;
          }
          .contact-info {
            margin-top: 20px;
            padding: 15px;
            background: #f5f7fa;
            border-radius: 5px;
          }
          .button {
            display: inline-block;
            background: #A9D65C;
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
              <span style="color: #4A96AD; font-weight: 500;">kwik</span><span style="color: #A9D65C; font-weight: 800;">FLOW</span>
            </div>
          </div>
          
          <h1>Thank You for Your Consultation Request</h1>
          
          <div class="thank-you-message">
            <p>Dear ${request.fullName},</p>
            <p>We've received your consultation request and appreciate your interest in kwikFlow's automation services.</p>
          </div>
          
          <div class="next-steps">
            <span class="label">Next Steps</span>
            <p>Our team will review your information and get back to you within one business day to schedule your free consultation.</p>
          </div>
          
          <div class="section">
            <span class="label">Your Request Details</span>
            <p class="value"><strong>Name:</strong> ${request.fullName}</p>
            ${
              request.company
                ? `<p class="value"><strong>Company:</strong> ${request.company}</p>`
                : ""
            }
            ${
              request.systems
                ? `<p class="value"><strong>Systems you're using:</strong> ${request.systems}</p>`
                : ""
            }
            <p class="value"><strong>What you'd like to automate:</strong></p>
            <p class="value">${request.message}</p>
          </div>
          
          <div class="contact-info">
            <p>If you have any questions in the meantime, please don't hesitate to contact us:</p>
            <p><strong>Email:</strong> hello@kwikflow.co.za</p>
            <p><strong>Phone:</strong> +27 63 698 3961</p>
          </div>
          
          <div class="signature">
            <p>We look forward to showing you how kwikFlow can streamline your business processes!</p>
            <p>Best regards,<br>The kwikFlow Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} kwikFlow. All rights reserved.</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181, South Africa</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Set up email data
    const data = {
      from: `kwikFlow <noreply@${domain}>`,
      to: request.email,
      subject: "Thank You for Your Consultation Request",
      html: emailContent
    };

    console.log(
      `Sending confirmation email to ${request.email} with domain: ${domain}`
    );

    // Send the email
    const response = await mg.messages.create(domain, data);
    console.log("Confirmation email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
}

/**
 * Send a notification email about a new lead interest submission
 */
export async function sendLeadNotificationEmail(lead: Lead) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error("Mailgun credentials not found in environment variables");
    return false;
  }

  try {
    const mg = getMailgunClient();
    const domain = getMailgunDomain();

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New kwikChat Lead Interest</title>
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
            background: #f0fdf4;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            letter-spacing: -0.025em;
          }
          h1 {
            color: #152434;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #22c55e;
          }
          .label {
            color: #22c55e;
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }
          .value {
            margin: 0 0 10px;
          }
          .features-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }
          .feature-tag {
            background: #dcfce7;
            color: #166534;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
          }
          .plan-badge {
            display: inline-block;
            background: #22c55e;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
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
              <span style="color: #1f2937; font-weight: 700;">kwik</span><span style="color: #22c55e; font-weight: 800;">CHAT</span>
            </div>
          </div>
          
          <h1>New Lead Interest Submission</h1>
          
          <div class="section">
            <span class="label">Contact Information</span>
            <p class="value"><strong>Name:</strong> ${lead.contactName || "Not provided"}</p>
            <p class="value"><strong>Email:</strong> ${lead.email}</p>
            ${lead.companyName ? `<p class="value"><strong>Company:</strong> ${lead.companyName}</p>` : ""}
            ${lead.phone ? `<p class="value"><strong>Phone:</strong> ${lead.phone}</p>` : ""}
            ${lead.role ? `<p class="value"><strong>Role:</strong> ${lead.role}</p>` : ""}
          </div>
          
          <div class="section">
            <span class="label">Interested Features</span>
            <div class="features-list">
              ${lead.interestedFeatures.split(", ").map(feature => `<span class="feature-tag">${feature}</span>`).join("")}
            </div>
          </div>
          
          ${lead.preferredPlan ? `
          <div class="section">
            <span class="label">Preferred Plan</span>
            <span class="plan-badge">${lead.preferredPlan}</span>
          </div>
          ` : ""}
          
          ${lead.message ? `
          <div class="section">
            <span class="label">Additional Information</span>
            <p class="value">${lead.message}</p>
          </div>
          ` : ""}
          
          <div class="section">
            <span class="label">Submission Details</span>
            <p class="value"><strong>Date Submitted:</strong> ${new Date(lead.createdAt).toLocaleString("en-ZA", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Africa/Johannesburg"
            })}</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} kwikChat. All rights reserved.</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = {
      from: `kwikChat <noreply@kwikchat.co.za>`,
      to: "hello@kwikchat.co.za",
      subject: `New kwikChat Lead: ${lead.contactName || lead.email}${lead.companyName ? ` (${lead.companyName})` : ""}`,
      html: emailContent,
      "h:Reply-To": lead.email
    };

    console.log(`Sending lead notification email for: ${lead.email} using domain: ${domain}`);

    const response = await mg.messages.create(domain, data);
    console.log("Lead notification email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending lead notification email:", error);
    return false;
  }
}

/**
 * Send a confirmation email to the lead
 */
export async function sendLeadConfirmationEmail(lead: Lead) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error("Mailgun credentials not found in environment variables");
    return false;
  }

  try {
    const mg = getMailgunClient();
    const domain = getMailgunDomain();

    const greeting = lead.contactName ? `Hi ${lead.contactName}` : (lead.companyName ? `Hi there from ${lead.companyName}` : 'Hi there');
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thanks for Your Interest in kwikChat</title>
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
            background: #f0fdf4;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            letter-spacing: -0.025em;
          }
          h1 {
            color: #152434;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .section {
            background: #f5f7fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #22c55e;
          }
          .label {
            color: #22c55e;
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }
          .value {
            margin: 0 0 10px;
          }
          .features-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
          }
          .feature-tag {
            background: #dcfce7;
            color: #166534;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
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
              <span style="color: #1f2937; font-weight: 700;">kwik</span><span style="color: #22c55e; font-weight: 800;">CHAT</span>
            </div>
          </div>
          
          <h1>Thanks for Your Interest!</h1>
          
          <div class="section">
            <span class="label">Hello${lead.contactName ? `, ${lead.contactName}` : ''}!</span>
            <p class="value">We've received your enquiry${lead.companyName ? ` from ${lead.companyName}` : ''} and will be in touch shortly.</p>
          </div>
          
          <div class="section">
            <span class="label">You're interested in</span>
            <div class="features-list">
              ${lead.interestedFeatures.split(", ").map(feature => `<span class="feature-tag">${feature}</span>`).join("")}
            </div>
          </div>
          
          <div class="section">
            <span class="label">What kwikChat can do for your business</span>
            <p class="value"><strong>Automate your WhatsApp</strong> — from enquiries and onboarding to quotes, orders, and status updates</p>
            <p class="value"><strong>Take over anytime</strong> — jump into any conversation when the personal touch is needed</p>
            <p class="value"><strong>Connect your tools</strong> — integrate with your CRM, accounting, or any external system</p>
            <p class="value" style="margin-bottom: 0;"><strong>Guided setup</strong> — our team handles the technical work so you don't have to</p>
          </div>
          
          <div class="section">
            <span class="label">What happens next?</span>
            <p class="value" style="margin-bottom: 0;">One of our team will reach out within 1 business day to schedule a quick call and understand your needs.</p>
          </div>
          
          <div class="section">
            <span class="label">Questions in the meantime?</span>
            <p class="value" style="margin-bottom: 0;">Just reply to this email or contact us at <strong>hello@kwikchat.co.za</strong></p>
          </div>
          
          <div class="section">
            <p class="value">Looking forward to chatting!</p>
            <p class="value" style="margin-bottom: 0;"><strong>The kwikChat Team</strong></p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Kwik Group (Pty) Ltd trading as kwikChat</p>
            <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = {
      from: `kwikChat <noreply@kwikchat.co.za>`,
      to: lead.email,
      subject: "Thanks for your interest in kwikChat",
      html: emailContent,
      "h:Reply-To": "hello@kwikchat.co.za"
    };

    console.log(`Sending lead confirmation email to: ${lead.email} using domain: ${domain}`);

    const response = await mg.messages.create(domain, data);
    console.log("Lead confirmation email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending lead confirmation email:", error);
    return false;
  }
}
