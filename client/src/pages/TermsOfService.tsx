import { MessageCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: {updated}</p>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the <strong>kwikChat</strong> platform and services, operated by <strong>Kwik Group (Pty) Ltd</strong> ("we", "us", or "our"), registered in South Africa.
            </p>
            <p className="mt-3">
              By registering for, accessing, or using kwikChat, you agree to be bound by these Terms and our <Link href="/privacy-policy"><span className="text-green-600 underline cursor-pointer">Privacy Policy</span></Link>. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              kwikChat is a WhatsApp Business automation platform that enables businesses to manage customer conversations, set up automated workflows, send and receive WhatsApp messages, and access a centralised conversation dashboard. The platform integrates with the <strong>Meta WhatsApp Business Cloud API</strong>.
            </p>
            <p className="mt-3">
              Our services are provided on a subscription basis as described on our pricing page. Features and pricing may change with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Meta / WhatsApp Platform Compliance</h2>
            <p>
              kwikChat operates as a <strong>Meta Business Partner</strong> and accesses the WhatsApp Business Cloud API under Meta's Platform Terms. By using kwikChat, you agree to comply with the following Meta policies, which are incorporated into these Terms by reference:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">WhatsApp Business Policy</a>
              </li>
              <li>
                <a href="https://www.whatsapp.com/legal/commerce-policy/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">WhatsApp Commerce Policy</a>
              </li>
              <li>
                <a href="https://developers.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Meta Platform Terms</a>
              </li>
              <li>
                <a href="https://www.facebook.com/policies/ads/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Meta Advertising Standards</a>
              </li>
            </ul>
            <p className="mt-4">
              Meta's policies take precedence in the event of any conflict with these Terms with respect to WhatsApp messaging conduct. We may be required to suspend or terminate your access if Meta restricts or revokes our API access due to your violation of their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Acceptable Use</h2>
            <p>You agree to use kwikChat only for lawful business purposes. You may use the platform to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Send automated and manual messages to customers who have opted in to receive them</li>
              <li>Manage inbound customer enquiries and support conversations</li>
              <li>Send transactional notifications (order updates, appointment reminders, delivery alerts)</li>
              <li>Run approved marketing campaigns to opted-in contacts</li>
              <li>Integrate with your existing business tools (CRM, accounting, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Prohibited Uses</h2>
            <p>You must <strong>not</strong> use kwikChat to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Send unsolicited bulk messages (spam) to individuals who have not opted in</li>
              <li>Send messages that violate WhatsApp's policies, including prohibited content categories</li>
              <li>Sell, distribute, or promote illegal goods or services</li>
              <li>Engage in deceptive, fraudulent, or misleading messaging practices</li>
              <li>Impersonate another business, person, or entity</li>
              <li>Harass, abuse, or threaten any individual</li>
              <li>Send content that is hateful, discriminatory, or promotes violence</li>
              <li>Distribute malware, phishing links, or malicious content</li>
              <li>Circumvent, disable, or interfere with security features of the platform</li>
              <li>Resell or sublicense access to the kwikChat platform without our written consent</li>
              <li>Use the platform for any purpose that violates South African law or any applicable law</li>
            </ul>
            <p className="mt-4">
              Violation of these prohibitions may result in immediate suspension or termination of your account without refund, and may be reported to Meta and/or relevant authorities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Customer Consent Obligations</h2>
            <p>
              You are solely responsible for obtaining and maintaining valid consent from your customers before contacting them via WhatsApp. Specifically, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Obtain explicit opt-in consent before sending marketing or promotional messages</li>
              <li>Clearly disclose to customers that they will receive WhatsApp messages from your business</li>
              <li>Provide customers with a simple mechanism to opt out at any time</li>
              <li>Honour all opt-out requests promptly (within 24 hours)</li>
              <li>Maintain records of consent where required by law</li>
            </ul>
            <p className="mt-3">
              kwikChat is not responsible for any claims, fines, or penalties arising from your failure to obtain proper consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Account Registration</h2>
            <p>To use kwikChat, you must:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorised access to your account</li>
              <li>Be a legal entity or individual of at least 18 years of age</li>
            </ul>
            <p className="mt-3">
              You are responsible for all activity that occurs under your account. We reserve the right to refuse registration or cancel accounts at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Fees and Payment</h2>
            <p>
              kwikChat services are provided on a subscription basis. By subscribing, you agree to pay the applicable fees as set out on our pricing page. All fees are:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Quoted in South African Rand (ZAR) and exclusive of VAT unless stated otherwise</li>
              <li>Billed monthly in advance</li>
              <li>Subject to a once-off setup and onboarding fee of R5,000</li>
              <li>Non-refundable except where required by law</li>
            </ul>
            <p className="mt-3">
              Message volumes exceeding your plan's monthly allocation will be charged at the applicable overage rate. We reserve the right to update pricing with 30 days' written notice.
            </p>
            <p className="mt-3">
              Failure to pay may result in suspension of your account. Accounts suspended for non-payment for more than 30 days may be terminated and data deleted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Intellectual Property</h2>
            <p>
              All intellectual property rights in the kwikChat platform, including software, design, trademarks, and content, remain the property of Kwik Group (Pty) Ltd or our licensors. You are granted a limited, non-exclusive, non-transferable licence to use the platform for your internal business purposes during the term of your subscription.
            </p>
            <p className="mt-3">
              You retain ownership of all content, data, and materials you upload or create through the platform. By using kwikChat, you grant us a limited licence to process and store your data solely for the purpose of providing our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Service Availability</h2>
            <p>
              We aim to provide a reliable service but do not guarantee 100% uptime. The platform may experience downtime due to maintenance, updates, or circumstances beyond our control (including Meta API outages). We will endeavour to provide advance notice of scheduled maintenance where possible.
            </p>
            <p className="mt-3">
              kwikChat's availability is also dependent on Meta's WhatsApp Business API infrastructure. Disruptions to Meta's services are outside our control and do not constitute a breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, kwikChat and Kwik Group (Pty) Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, revenue, or business opportunities, arising out of or in connection with your use of the platform.
            </p>
            <p className="mt-3">
              Our total liability to you for any claim arising from these Terms or your use of kwikChat shall not exceed the total fees paid by you in the three (3) months immediately preceding the event giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless kwikChat, Kwik Group (Pty) Ltd, and our officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or in connection with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your use of the platform in violation of these Terms</li>
              <li>Your violation of any Meta or WhatsApp policy</li>
              <li>Your failure to obtain valid customer consent</li>
              <li>Any content you send through the platform</li>
              <li>Your violation of any applicable law or third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">13. Termination</h2>
            <p>
              Either party may terminate the subscription with 30 days' written notice. We may suspend or terminate your account immediately and without notice if you breach these Terms, violate Meta's policies, or if continued service would expose us to legal or regulatory risk.
            </p>
            <p className="mt-3">
              Upon termination, your access to the platform will cease. We will retain your data for 30 days following termination, after which it will be deleted unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">14. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of South Africa. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">15. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email or via the platform at least 14 days before they take effect. Continued use of kwikChat after that date constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">16. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p><strong>Kwik Group (Pty) Ltd</strong> trading as kwikChat</p>
              <p>105 Club Avenue, Waterkloof Heights, Pretoria, 0181</p>
              <p>Email: <a href="mailto:hello@kwikchat.co.za" className="text-green-600 underline">hello@kwikchat.co.za</a></p>
            </div>
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
