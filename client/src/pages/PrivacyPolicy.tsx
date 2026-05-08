import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  const updated = 'May 2026';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold">kwik<span className="text-green-600">CHAT</span></span>
              </div>
            </Link>
            <p className="text-[10px] text-gray-400 pl-10">
              Powered by{' '}
              <a href="https://intentio.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors underline underline-offset-2">
                Intentio Software
              </a>
            </p>
          </div>
          <Link href="/">
            <span className="text-sm font-medium text-green-600 hover:underline cursor-pointer">← Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: {updated}</p>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Kwik Group (Pty) Ltd, trading as <strong>kwikChat</strong> ("we", "us", or "our"), is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp Business automation platform and visit our website at <strong>kwikchat.co.za</strong>.
            </p>
            <p className="mt-3">
              We operate in compliance with the <strong>Protection of Personal Information Act (POPIA)</strong> of South Africa and in accordance with <strong>Meta's Platform Terms</strong> and <strong>WhatsApp Business API policies</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and company name when you submit an interest form or contact us</li>
              <li>Business information you share during onboarding and setup</li>
              <li>Billing and payment information processed securely through our payment providers</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">2.2 WhatsApp Conversation Data</h3>
            <p>When you use kwikChat to manage your WhatsApp Business communications, we process:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>WhatsApp message content sent and received through your registered business number</li>
              <li>Contact phone numbers of individuals who message your business</li>
              <li>Message timestamps, delivery and read statuses</li>
              <li>Media files shared within conversations (images, documents, audio)</li>
              <li>Automated workflow interaction data and session metadata</li>
            </ul>
            <p className="mt-3 text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <strong>Important:</strong> kwikChat accesses WhatsApp messages solely to provide the automation and dashboard services you have contracted for. We do not sell or monetise your conversation data or your customers' data.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">2.3 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, and device information when you visit our website</li>
              <li>Usage analytics via Google Analytics (anonymised)</li>
              <li>Cookies and similar tracking technologies for website functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide, operate, and maintain the kwikChat platform and services</li>
              <li>Process and deliver WhatsApp messages through the Meta WhatsApp Cloud API on your behalf</li>
              <li>Configure and run automated workflows, chatbots, and business rules you set up</li>
              <li>Provide your team with the conversation management dashboard</li>
              <li>Send you service-related communications (onboarding, billing, updates)</li>
              <li>Respond to your support enquiries</li>
              <li>Improve our platform and analyse usage patterns (in aggregated, anonymised form)</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> use your customers' WhatsApp data for advertising, profiling, or any purpose beyond delivering the services described above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Sharing of Information</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Meta / WhatsApp</h3>
            <p>
              kwikChat integrates with the <strong>WhatsApp Business Cloud API</strong>, provided by Meta Platforms, Inc. By using our platform, message data is transmitted through Meta's infrastructure in accordance with{' '}
              <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">WhatsApp's Business Policy</a>{' '}and{' '}
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Meta's Privacy Policy</a>.
              Meta may collect and process certain data in connection with the delivery of messages as described in their policies.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">4.2 Service Providers</h3>
            <p>We may share information with trusted third-party service providers who assist us in operating our platform, including:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Cloud hosting and infrastructure providers</li>
              <li>Email delivery providers (e.g. Mailgun)</li>
              <li>Analytics providers (e.g. Google Analytics)</li>
              <li>Payment processors</li>
            </ul>
            <p className="mt-2">These providers are contractually obligated to protect your data and may only use it to provide services to us.</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">4.3 Legal Requirements</h3>
            <p>We may disclose your information if required by law, court order, or to protect the rights, property, or safety of kwikChat, our clients, or the public.</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">4.4 Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your information becomes subject to a different privacy policy.</p>

            <p className="mt-3 font-medium">We do <strong>not</strong> sell, rent, or trade your personal information or your customers' data to third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. WhatsApp Business API — Your Obligations</h2>
            <p>As a business using kwikChat to communicate with your customers via WhatsApp, you are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Obtaining valid consent from your customers before messaging them via WhatsApp</li>
              <li>Complying with <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">WhatsApp's Business Policy</a> and <a href="https://www.whatsapp.com/legal/commerce-policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Commerce Policy</a></li>
              <li>Providing your customers with a clear and accessible privacy policy that describes how you use their WhatsApp data</li>
              <li>Honouring customer opt-out requests promptly</li>
              <li>Not using the platform to send spam, unsolicited marketing, or prohibited content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide our services. Conversation data is retained for the period specified in your service agreement (default: 12 months) and may be deleted upon written request.</p>
            <p className="mt-3">Some data may be retained longer where required by law or for legitimate business purposes such as dispute resolution and fraud prevention.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Data Security</h2>
            <p>We implement appropriate technical and organisational security measures to protect your information against unauthorised access, alteration, disclosure, or destruction. These include encryption in transit (TLS), access controls, and regular security reviews.</p>
            <p className="mt-3">No method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Your Rights (POPIA)</h2>
            <p>Under the Protection of Personal Information Act (POPIA), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Access</strong> the personal information we hold about you</li>
              <li><strong>Correct</strong> inaccurate or incomplete information</li>
              <li><strong>Request deletion</strong> of your personal information (subject to legal obligations)</li>
              <li><strong>Object</strong> to the processing of your personal information</li>
              <li><strong>Withdraw consent</strong> where processing is based on consent</li>
              <li><strong>Lodge a complaint</strong> with the Information Regulator of South Africa</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href="mailto:hello@kwikchat.co.za" className="text-green-600 underline">hello@kwikchat.co.za</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Cookies</h2>
            <p>Our website uses cookies to enhance your experience. We use:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Essential cookies</strong> — required for the website to function</li>
              <li><strong>Analytics cookies</strong> — Google Analytics (anonymised) to understand how visitors use our site</li>
            </ul>
            <p className="mt-3">You can disable cookies in your browser settings, though some functionality may be affected.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
            <p>kwikChat is a business platform not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date, and where appropriate, by email. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p><strong>Kwik Group (Pty) Ltd</strong> trading as kwikChat</p>
              <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181</p>
              <p>Email: <a href="mailto:hello@kwikchat.co.za" className="text-green-600 underline">hello@kwikchat.co.za</a></p>
            </div>
            <p className="mt-4">
              You may also lodge a complaint with the <strong>Information Regulator of South Africa</strong>:<br />
              <a href="https://www.inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">www.inforegulator.org.za</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t bg-white py-8 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 space-y-2">
          <p>© {new Date().getFullYear()} Kwik Group (Pty) Ltd trading as <span className="text-green-600 font-semibold">kwikChat</span>. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy-policy"><span className="hover:text-green-600 underline cursor-pointer">Privacy Policy</span></Link>
            <Link href="/terms-of-service"><span className="hover:text-green-600 underline cursor-pointer">Terms of Service</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
