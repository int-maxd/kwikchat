const steps = [
  {
    number: 1,
    title: "Order Your Device",
    description: "Choose the number of tracking devices you need and complete your order online. We'll ship them to you within 2-3 business days.",
    timeframe: "2-3 business days",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    number: 2,
    title: "Activate & Setup",
    description: "Simply turn on your device and follow the quick setup guide. The device will automatically connect to the cellular network.",
    timeframe: "5 minutes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: 3,
    title: "Start Tracking",
    description: "Log into your dashboard from any device and start tracking immediately. Set up geofences, alerts, and view real-time locations.",
    timeframe: "Instant",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">How It Works</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Get Started in 3 Easy Steps</p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 reveal">Start tracking your assets in minutes, not hours. It's that simple.</p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="mt-10 lg:mt-0 reveal" data-testid={`step-${step.number}`}>
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-lg font-bold" data-testid={`text-step-number-${step.number}`}>{step.number}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-medium text-gray-900" data-testid={`text-step-title-${step.number}`}>{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500" data-testid={`text-step-desc-${step.number}`}>
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        <span data-testid={`text-step-time-${step.number}`}>{step.timeframe}</span>
                        {step.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center reveal">
          <a href="#contact">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition" data-testid="button-order-now-steps">
              Order Your Tracker Now
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
