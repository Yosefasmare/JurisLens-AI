'use client';

import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What happens when I reach my document limit?",
    answer: "When you reach your monthly document limit, you can either upgrade to a higher plan or wait until your limit resets at the beginning of the next billing cycle."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. Enterprise customers can also pay via invoice."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, our Pro plan comes with a 14-day free trial. No credit card required to start. You can upgrade to Enterprise at any time by contacting our sales team."
  },
  {
    question: "What kind of support do you offer?",
    answer: "Free plan users get email support with a 48-hour response time. Pro users get priority support with a 24-hour response time. Enterprise users get dedicated support with a 4-hour response time and a dedicated account manager."
  }
];

export function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 