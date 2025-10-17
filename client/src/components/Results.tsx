const results = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    stat: "99.9%",
    title: "Location Accuracy",
    description: "Track your assets with pinpoint accuracy using advanced GPS technology and cellular triangulation."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    stat: "30 Days",
    title: "Battery Life",
    description: "Go a full month without charging. Our advanced power management keeps your tracker running longer."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stat: "100%",
    title: "SA Coverage",
    description: "Track anywhere in South Africa with cellular coverage. No blind spots, no limitations."
  }
];

export default function Results() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Why Choose KwikTrak</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Reliable Tracking You Can Trust</p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 reveal">The numbers speak for themselves - superior performance when it matters most.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden reveal" data-testid={`result-card-${index}`}>
              <div className="p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {result.icon}
                  </div>
                  <div className="ml-5">
                    <div className="text-3xl font-bold text-gray-900" data-testid={`text-result-stat-${index}`}>{result.stat}</div>
                    <div className="text-lg font-medium text-gray-500" data-testid={`text-result-title-${index}`}>{result.title}</div>
                  </div>
                </div>
                <p className="mt-6 text-base text-gray-600" data-testid={`text-result-desc-${index}`}>
                  {result.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
