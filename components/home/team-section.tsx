"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

import user1 from "@/assets/team/user-1.jpeg"
import user2 from "@/assets/team/user-2.jpeg"
import user3 from "@/assets/team/user-3.jpeg"
import user4 from "@/assets/team/user-4.jpeg"

export function TeamSection() {
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

  const team = [
    {
      name: "Rajesh Sharma",
      position: "CEO & Founder",
      image: user1,
      bio: "With over 20 years of experience in real estate development, Rajesh leads our company with vision and expertise.",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
        email: "rajesh@realestate.com",
      },
    },
    {
      name: "Priya Patel",
      position: "Chief Architect",
      image: user2,
      bio: "Award-winning architect with a passion for sustainable design and innovative living spaces.",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
        email: "priya@realestate.com",
      },
    },
    {
      name: "Vikram Singh",
      position: "Sales Director",
      image: user3,
      bio: "Bringing properties and people together with a customer-first approach and market expertise.",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
        email: "vikram@realestate.com",
      },
    },
    {
      name: "Ananya Desai",
      position: "Marketing Manager",
      image: user4,
      bio: "Creative strategist who builds our brand presence and connects our properties with the right audience.",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
        email: "ananya@realestate.com",
      },
    },
  ]

  return (
    <section ref={sectionRef} id="team" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Meet Our Team</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform transition-all duration-700 delay-300 scale-x-0 animate-[scaleX_0.7s_0.3s_ease-out_forwards]"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our talented professionals bring expertise, passion, and dedication to every project we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl overflow-hidden shadow-md group transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 200 + 500}ms`,
                animationDelay: `${index * 200 + 500}ms`,
              }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex space-x-3 justify-center">
                    {[
                      { icon: Linkedin, href: member.social.linkedin },
                      { icon: Twitter, href: member.social.twitter },
                      { icon: Facebook, href: member.social.facebook },
                      { icon: Mail, href: `mailto:${member.social.email}` },
                    ].map((social, socialIndex) => (
                      <a
                        key={socialIndex}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                        style={{ transitionDelay: `${socialIndex * 100}ms` }}
                        aria-label={`${member.name}'s social media`}
                      >
                        <social.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 transform group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-primary/5 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 animate-fade-in">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3 animate-fade-in-delay">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
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
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
