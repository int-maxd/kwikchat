import { MessageCircle, Mail, Trash2, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function DataDeletion() {
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

      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-8 h-8 text-red-500" />
          <h1 className="text-4xl font-bold">Data Deletion Instructions</h1>
        </div>
        <p className="text-gray-500 mb-10">How to request deletion of your personal data from kwikChat</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">About This Page</h2>
            <p className="text-blue-800 text-sm">
              This page applies to individuals who have interacted with a business using <strong>kwikChat</strong>, or to business customers of kwikChat. If you connected kwikChat via Facebook Login or Meta's platform, you can also initiate a data deletion request from your Facebook Settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">What Data We Hold</h2>
            <p>Depending on your relationship with kwikChat, we may hold:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Business customers:</strong> Name, email address, phone number, company details, and account data collected during sign-up and onboarding</li>
              <li><strong>End users (customers of businesses using kwikChat):</strong> WhatsApp phone number, message content, and conversation history processed on behalf of the business you contacted</li>
              <li><strong>Website visitors:</strong> Anonymised analytics data via Google Analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Request Data Deletion</h2>

            <div className="grid md:grid-cols-1 gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-bold text-sm">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Send Us an Email</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Email us directly at the address below. Include your full name, the email address or WhatsApp number associated with your data, and a brief description of what you'd like deleted.
                </p>
                <a
                  href="mailto:hello@kwikchat.co.za?subject=Data Deletion Request&body=Hello,%0A%0AI would like to request deletion of my personal data.%0A%0AName:%0AEmail / WhatsApp number:%0AAdditional details:%0A%0AThank you."
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Deletion Request
                </a>
                <p className="text-xs text-gray-400 mt-3">Email: hello@kwikchat.co.za</p>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-bold text-sm">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Via Facebook / Meta Settings</h3>
                </div>
                <p className="text-sm text-gray-600">
                  If you authorised kwikChat through Facebook Login or connected via Meta's platform, you can remove app permissions and request data deletion directly:
                </p>
                <ol className="list-decimal pl-5 mt-3 space-y-1 text-sm text-gray-600">
                  <li>Go to your <strong>Facebook Settings</strong></li>
                  <li>Click <strong>Apps and Websites</strong></li>
                  <li>Find <strong>kwikChat</strong> and click <strong>Remove</strong></li>
                  <li>Select the option to <strong>delete all activity</strong></li>
                </ol>
                <p className="text-sm text-gray-500 mt-3">
                  Or visit:{' '}
                  <a href="https://www.facebook.com/settings?tab=applications" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">
                    facebook.com/settings → Apps and Websites
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Happens After Your Request</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-yellow-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Acknowledgement within 3 business days</p>
                  <p className="text-sm text-gray-600">We will confirm receipt of your request and verify your identity if required.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Deletion completed within 30 days</p>
                  <p className="text-sm text-gray-600">Your personal data will be deleted from our active systems within 30 days. Some data may be retained in backups for a short period before being overwritten.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Confirmation email sent</p>
                  <p className="text-sm text-gray-600">We will send you a confirmation email once the deletion has been completed.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Exceptions</h2>
            <p>We may retain certain information where required by law, for fraud prevention, to resolve disputes, or to enforce our agreements. In such cases, we will inform you of any data we are legally required to retain.</p>
          </section>

          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-sm text-gray-600 mb-3">If you have any questions about this process, please contact:</p>
            <div className="space-y-1 text-sm">
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
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/privacy-policy"><span className="hover:text-green-600 underline cursor-pointer">Privacy Policy</span></Link>
            <Link href="/terms-of-service"><span className="hover:text-green-600 underline cursor-pointer">Terms of Service</span></Link>
            <Link href="/data-deletion"><span className="hover:text-green-600 underline cursor-pointer">Data Deletion</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
