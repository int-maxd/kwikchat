const steps = [
  {
    number: 1,
    title: "Free Consultation",
    description: "We start with a free consultation to understand your business processes and identify automation opportunities.",
    timeframe: "15-30 minutes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    number: 2,
    title: "Custom Proposal",
    description: "We create a tailored proposal outlining the automation solutions we recommend, including timelines and pricing.",
    timeframe: "1-2 business days",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    number: 3,
    title: "Implementation",
    description: "Our team designs and builds the automation workflows, connecting your systems and configuring the logic.",
    timeframe: "1-4 weeks",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    number: 4,
    title: "Testing & Training",
    description: "We thoroughly test all automations and train your team on how to use and maintain the new systems.",
    timeframe: "1-2 weeks",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    number: 5,
    title: "Launch",
    description: "We deploy your automations into production and monitor them closely to ensure everything runs smoothly.",
    timeframe: "1-3 days",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: 6,
    title: "Ongoing Support",
    description: "We provide ongoing support and maintenance to ensure your automations continue to perform optimally.",
    timeframe: "Continuous",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Our Process</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">How kwikFlow Works</p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 reveal">Our streamlined process gets your automation up and running quickly, with minimal disruption to your business.</p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {steps.slice(0, 3).map((step) => (
              <div key={step.number} className="mt-10 lg:mt-0 reveal">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        <span>{step.timeframe}</span>
                        {step.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-12">
            {steps.slice(3).map((step) => (
              <div key={step.number} className="mt-10 lg:mt-0 reveal">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        <span>{step.timeframe}</span>
                        {step.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
