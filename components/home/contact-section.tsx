"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Phone, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(formData)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
    alert("Thank you for your message. We'll get back to you soon!")
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 12345 67890"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@deshmukbuilders.com", "sales@deshmukbuilders.com"],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Business Park, Sector 15,", "Navi Mumbai, Maharashtra 400614"],
      color: "bg-purple-100 text-purple-600",
    },
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform transition-all duration-700 delay-300 scale-x-0 animate-[scaleX_0.7s_0.3s_ease-out_forwards]"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our properties or services? Reach out to us and our team will be happy to assist you.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4 mb-10 lg:mb-0">
            <div
              className={`h-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 transform transition-all duration-1000 hover:shadow-2xl hover:scale-105 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary animate-fade-in">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`flex items-start transform transition-all duration-700 hover:translate-x-2 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{
                      transitionDelay: `${index * 200 + 700}ms`,
                      animationDelay: `${index * 200 + 700}ms`,
                    }}
                  >
                    <div
                      className={`flex-shrink-0 p-3 rounded-full mr-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 ${info.color}`}
                    >
                      <info.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h4>
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-8 transition-all duration-1000 delay-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <h4 className="font-medium text-gray-800 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                    { path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
                    { path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" },
                    {
                      path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                    },
                  ].map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg animate-bounce-slow"
                      style={{ animationDelay: `${socialIndex * 200}ms` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={social.path}></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4">
            <div
              className={`bg-white rounded-xl shadow-lg border border-gray-100 p-8 transform transition-all duration-1000 hover:shadow-2xl ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary animate-fade-in">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {[
                    { name: "name", label: "Your Name *", type: "text", required: true },
                    { name: "email", label: "Email Address *", type: "email", required: true },
                    { name: "phone", label: "Phone Number", type: "tel", required: false },
                  ].map((field, index) => (
                    <div
                      key={field.name}
                      className={`transform transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${index * 150 + 800}ms` }}
                    >
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 transition-all duration-300 hover:border-primary/50 focus:scale-105"
                      />
                    </div>
                  ))}
                  <div
                    className={`transform transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: "1150ms" }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 transition-all duration-300 hover:border-primary/50 focus:scale-105"
                    >
                      <option value="">Select a subject</option>
                      <option value="Property Inquiry">Property Inquiry</option>
                      <option value="Site Visit">Site Visit</option>
                      <option value="Price Quotation">Price Quotation</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div
                  className={`mb-6 transform transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: "1300ms" }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 transition-all duration-300 hover:border-primary/50 focus:scale-105 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-all duration-300 inline-flex items-center transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? "animate-pulse" : "hover:-translate-y-1"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: "1450ms" }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
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
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
