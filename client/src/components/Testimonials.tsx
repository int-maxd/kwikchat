const testimonials = [
  {
    quote: "kwikFlow automated our entire client onboarding process. What used to take us 2 hours now happens automatically in minutes. Game changer!",
    name: "Sarah Kim",
    title: "Operations Director, CloudTech Solutions",
    initials: "SK"
  },
  {
    quote: "The team at kwikFlow connected our Xero, Trello, and CRM systems. Now data flows automatically between them. No more double entry!",
    name: "James Rodriguez",
    title: "Founder, Bright Horizons Consulting",
    initials: "JR"
  },
  {
    quote: "I was skeptical at first, but after the free consultation, I was convinced. kwikFlow has saved my team countless hours of tedious work.",
    name: "Amelia Peterson",
    title: "CEO, Green Valley Landscaping",
    initials: "AP"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">Testimonials</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">What Our Clients Say</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm reveal">
              <div className="flex items-center mb-6">
                <div className="text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote>
                <p className="text-lg text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{testimonial.initials}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
