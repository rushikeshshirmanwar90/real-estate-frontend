"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What types of properties do you currently offer?",
      answer:
        "We offer a diverse portfolio of residential properties including luxury apartments, villas, row houses, and plotted developments. We also have commercial spaces such as retail shops, office spaces, and mixed-use developments in prime locations.",
    },
    {
      question: "How can I schedule a site visit?",
      answer:
        "You can schedule a site visit by filling out the contact form on our website, calling our sales office, or sending us an email. Our team will get back to you within 24 hours to arrange a convenient time for your visit.",
    },
    {
      question: "What are the payment plans available?",
      answer:
        "We offer flexible payment plans including construction-linked plans, down payment plans with easy installments, and customized payment options. We also facilitate home loans through our banking partners with attractive interest rates.",
    },
    {
      question: "What amenities are included in your residential projects?",
      answer:
        "Our residential projects come with premium amenities such as swimming pools, fitness centers, landscaped gardens, children's play areas, clubhouses, 24/7 security, power backup, and more. Specific amenities vary by project and are detailed on each project page.",
    },
    {
      question: "Do you provide after-sales service?",
      answer:
        "Yes, we have a dedicated customer service team that handles all post-possession requirements. We provide maintenance services, address any construction-related issues under warranty, and assist with documentation and other needs even after you've moved in.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our properties, services, and processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-100 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className={`w-full p-4 text-left flex justify-between items-center ${openIndex === index ? "bg-primary/5" : "bg-white hover:bg-gray-50"}
                transition-colors duration-200`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-primary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}

