import { Card, CardContent } from '@/components/ui/card';

const integrations = [
  { name: "Xero", icon: "file-invoice-dollar", color: "text-blue-600" },
  { name: "Trello", icon: "trello", color: "text-blue-500", isBrand: true },
  { name: "Salesforce", icon: "cloud", color: "text-blue-700" },
  { name: "Slack", icon: "slack", color: "text-purple-600", isBrand: true },
  { name: "G Workspace", icon: "google", color: "text-red-500", isBrand: true },
  { name: "Microsoft 365", icon: "microsoft", color: "text-blue-800", isBrand: true },
  { name: "Shopify", icon: "shopping-bag", color: "text-green-600" },
  { name: "QuickBooks", icon: "book", color: "text-blue-500" },
  { name: "HubSpot", icon: "chart-pie", color: "text-orange-500" },
  { name: "Asana", icon: "tasks", color: "text-red-400" },
  { name: "Jira", icon: "jira", color: "text-blue-600", isBrand: true },
  { name: "Many More", icon: "ellipsis-h", color: "text-gray-600" }
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Integrations</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Connect Your Favorite Tools</p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 reveal">We integrate with hundreds of popular business applications, including these popular systems:</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {integrations.map((integration, index) => (
              <div key={index} className="col-span-1 flex justify-center py-8 px-8 bg-white rounded-lg shadow reveal">
                <div className="flex flex-col items-center">
                  {integration.isBrand ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-10 w-10 ${integration.color} mb-3`} 
                      fill="currentColor" 
                      viewBox="0 0 496 512"
                    >
                      {integration.icon === "trello" && <path d="M392 32H104C46.6 32 0 78.6 0 136v240c0 57.4 46.6 104 104 104h288c57.4 0 104-46.6 104-104V136c0-57.4-46.6-104-104-104zM192 328c0 13.3-10.7 24-24 24H96c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24h72c13.3 0 24 10.7 24 24v144zm192-40c0 13.3-10.7 24-24 24h-72c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24h72c13.3 0 24 10.7 24 24v104z"/>}
                      {integration.icon === "slack" && <path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z"/>}
                      {integration.icon === "google" && <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>}
                      {integration.icon === "microsoft" && <path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/>}
                      {integration.icon === "jira" && <path d="M490 241.7C417.1 169 320.6 71.8 248.5 0 83 164.9 6 241.7 6 241.7c-7.9 7.9-7.9 20.7 0 28.7C138.8 402.7 67.8 331.9 248.5 512c379.4-378 15.7-16.7 241.5-241.7 8-7.9 8-20.7 0-28.6zm-241.5 90l-76-75.7 76-75.7 76 75.7-76 75.7z"/>}
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-10 w-10 ${integration.color} mb-3`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      {integration.icon === "file-invoice-dollar" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z M15 8h-3v2.5m0 0v2m0-2h3" />
                      )}
                      {integration.icon === "cloud" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      )}
                      {integration.icon === "shopping-bag" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      )}
                      {integration.icon === "book" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      )}
                      {integration.icon === "chart-pie" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M4.5 9.5a6.5 6.5 0 119 9" />
                      )}
                      {integration.icon === "tasks" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      )}
                      {integration.icon === "ellipsis-h" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      )}
                    </svg>
                  )}
                  <span className="text-lg font-medium">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center reveal">
            <p className="text-lg text-gray-600">Don't see your tool? <a href="#contact" className="font-medium text-primary hover:text-primary-500">Contact us</a> — we can integrate with virtually any system that has an API.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
