import Image from "next/image"
import { CheckCircle } from "lucide-react"

import aboutUs from "@/assets/about us.jpeg"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            About Our Company
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building dreams and creating communities for over 15 years with a commitment to quality and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-lg z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-lg z-0"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={aboutUs}
                alt="About Our Company"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Our Vision & Mission</h3>
            <p className="text-gray-600">
              At RealEstate, we believe in creating living spaces that inspire. Our journey began in 2008 with a simple
              vision: to build homes that people would love to live in. Today, we've expanded our horizons to develop
              commercial spaces, townships, and luxury villas across the country.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Quality Construction</h4>
                  <p className="text-gray-600">
                    We use premium materials and advanced techniques to ensure durability and elegance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Innovative Design</h4>
                  <p className="text-gray-600">
                    Our architectural designs blend aesthetics with functionality for modern living.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">Customer Satisfaction</h4>
                  <p className="text-gray-600">
                    We prioritize client needs and provide exceptional service throughout the buying process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

