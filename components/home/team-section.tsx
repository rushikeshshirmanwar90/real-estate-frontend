import Image from "next/image"
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

import user1 from "@/assets/team/user-1.jpeg"
import user2 from "@/assets/team/user-2.jpeg"
import user3 from "@/assets/team/user-3.jpeg"
import user4 from "@/assets/team/user-4.jpeg"

export function TeamSection() {
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
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Meet Our Team
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our talented professionals bring expertise, passion, and dedication to every project we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-80">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={member.social.facebook}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={`${member.name}'s Facebook`}
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

