import { Card, CardContent } from '@/components/ui/card';
import deviceImage from '@assets/generated_images/Compact_GPS_tracking_device_a161b0d1.png';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Real-Time GPS Tracking",
    description: "Track your assets in real-time anywhere in South Africa with cellular coverage. View location history and movement patterns instantly."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Geofencing Alerts",
    description: "Create virtual boundaries and receive instant notifications when your device enters or exits designated areas."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Month-Long Battery",
    description: "Advanced power management ensures up to 30 days of continuous tracking on a single charge. Never worry about daily charging."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: "Independent Cellular",
    description: "Built-in cellular connectivity means no need for Bluetooth pairing or smartphone apps. Works independently anywhere with cell service."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure & Reliable",
    description: "Enterprise-grade encryption keeps your location data private and secure. Reliable tracking you can count on 24/7."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Dashboard",
    description: "Access your tracking dashboard from any device. View live locations, set alerts, and review history on the go."
  }
];

export default function Services() {
  return (
    <section id="features" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0">
            <div className="text-left">
              <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Features</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Advanced Tracking Technology</p>
              <p className="max-w-xl mt-5 text-xl text-gray-500 reveal">Everything you need to track your valuable assets with confidence.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex reveal" data-testid={`feature-${index}`}>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 tracking-tight" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500" data-testid={`text-feature-desc-${index}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative reveal">
            <img 
              src={deviceImage}
              alt="KwikTrak GPS tracking device" 
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
              data-testid="img-tracking-device"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
