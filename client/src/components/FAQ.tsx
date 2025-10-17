const faqs = [
  {
    question: "How does the tracking device work?",
    answer: "KwikTrak uses GPS and cellular technology to pinpoint the exact location of your assets. The device connects to the cellular network independently (no smartphone needed) and transmits location data to our secure servers, which you can access through our web or mobile dashboard."
  },
  {
    question: "Do I need a smartphone to use KwikTrak?",
    answer: "No! Unlike Bluetooth trackers (like AirTags), KwikTrak has its own cellular connection and works completely independently. You can view your tracker's location from any device with internet access - smartphone, tablet, or computer."
  },
  {
    question: "How long does the battery last?",
    answer: "Our devices feature advanced power management and can last up to 30 days on a single charge with normal use. You'll receive low battery alerts so you always know when it's time to recharge."
  },
  {
    question: "What is the coverage area?",
    answer: "KwikTrak works anywhere in South Africa where there is cellular network coverage. This includes all major cities, towns, and most rural areas with cell service."
  },
  {
    question: "Can I track multiple devices?",
    answer: "Yes! You can track unlimited devices from a single dashboard. Each device costs R79/month. Perfect for fleet management, multiple assets, or family vehicles."
  },
  {
    question: "What happens if the device is stolen?",
    answer: "The device continues to transmit its location as long as it has power. You'll be able to track its movements in real-time and share this information with authorities. The device is also small and discreet, making it difficult to find."
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
              <div key={index} className="bg-gray-50 rounded-lg p-6" data-testid={`faq-${index}`}>
                <dt className="text-lg font-medium text-gray-900" data-testid={`text-faq-question-${index}`}>
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-600" data-testid={`text-faq-answer-${index}`}>
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
