import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import dashboardImage from '@assets/generated_images/Tracking_dashboard_with_geofences_5fe718ee.png';

export default function ConsultationCTA() {
  return (
    <section id="pricing" className="bg-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl reveal">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-white/80 reveal">
              No hidden fees, no contracts. Just reliable tracking at an affordable price.
            </p>
            
            <div className="mt-8 reveal">
              <Card className="p-6 sm:p-8 bg-white">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900" data-testid="text-price">R79</span>
                  <span className="ml-2 text-2xl font-medium text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-gray-500">per device</p>
                
                <ul className="mt-6 space-y-4">
                  {[
                    "Real-time GPS tracking",
                    "Unlimited geofencing",
                    "30-day battery life",
                    "Mobile & web dashboard",
                    "Location history & alerts",
                    "24/7 customer support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start" data-testid={`pricing-feature-${index}`}>
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 reveal">
              <a href="#contact">
                <Button variant="secondary" className="w-full sm:w-auto text-primary bg-white hover:bg-gray-100" data-testid="button-get-started-pricing">
                  Get Started Today
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </a>
              <a href="#features">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90" data-testid="button-view-features">
                  View Features
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-1 reveal">
            <img 
              src={dashboardImage}
              alt="KwikTrak tracking dashboard with geofences" 
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
              data-testid="img-dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
