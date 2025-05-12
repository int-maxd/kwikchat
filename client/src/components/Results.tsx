const results = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: "20+",
    title: "Hours Saved Weekly",
    description: "Our average client saves over 20 hours per week by automating manual tasks and streamlining workflows."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    stat: "35%",
    title: "Efficiency Increase",
    description: "Clients report an average 35% increase in operational efficiency after implementing our automation solutions."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: "90%",
    title: "Error Reduction",
    description: "Automation eliminates human error in data entry and processing, reducing mistakes by up to 90%."
  }
];

export default function Results() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Results</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Real Business Impact</p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 reveal">See the tangible benefits our clients have experienced through automation.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden reveal">
              <div className="p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {result.icon}
                  </div>
                  <div className="ml-5">
                    <div className="text-3xl font-bold text-gray-900">{result.stat}</div>
                    <div className="text-lg font-medium text-gray-500">{result.title}</div>
                  </div>
                </div>
                <p className="mt-6 text-base text-gray-600">
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
