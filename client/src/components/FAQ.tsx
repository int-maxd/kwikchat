const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer: "We work with businesses of all sizes, from solopreneurs to large enterprises. Our solutions are particularly valuable for businesses that use multiple systems and have repetitive manual processes."
  },
  {
    question: "How much does automation typically cost?",
    answer: "The cost varies depending on the complexity of the automation. Simple workflows might start at R500, while more complex enterprise solutions can range from R3,000-R10,000+. We provide detailed quotes after the free consultation."
  },
  {
    question: "How long does it take to implement an automation solution?",
    answer: "Simple automations can be implemented in as little as 1-2 weeks. More complex solutions typically take 3-6 weeks from start to finish. We'll provide a timeline estimate during your consultation."
  },
  {
    question: "Do I need technical skills to use the automation?",
    answer: "No technical skills are required. We design our solutions to be user-friendly and provide comprehensive training. Once set up, most automations run in the background with minimal maintenance."
  },
  {
    question: "What if my system doesn't have an API?",
    answer: "While APIs make integration easier, we can often work with systems that don't have formal APIs. We can use techniques like web scraping, RPA (Robotic Process Automation), or recommend alternative systems. Let's discuss your specific situation during the consultation."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase reveal">FAQs</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl reveal">Frequently Asked Questions</p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto reveal">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <dt className="text-lg font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
