"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform transition-all duration-700 delay-300 scale-x-0 animate-[scaleX_0.7s_0.3s_ease-out_forwards]"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our properties, services, and processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 border border-gray-100 rounded-lg shadow-sm overflow-hidden transform transition-all duration-700 hover:shadow-lg hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: `${index * 150 + 500}ms`,
                animationDelay: `${index * 150 + 500}ms`,
              }}
            >
              <button
                className={`w-full p-4 text-left flex justify-between items-center transition-all duration-300 group ${
                  openIndex === index ? "bg-primary/5 shadow-inner" : "bg-white hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {faq.question}
                </span>
                <div className="transform transition-all duration-300 group-hover:scale-110">
                  {openIndex === index ? (
                    <ChevronUp className="text-primary animate-bounce" />
                  ) : (
                    <ChevronDown className="text-primary group-hover:animate-pulse" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 bg-white border-t border-gray-100 animate-fade-in">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-gray-600 mb-4 animate-fade-in">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse-slow"
          >
            Contact Us
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}
