import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

import img1 from "@/assets/blogs/img1.jpeg"
import img2 from "@/assets/blogs/img2.jpeg"
import img3 from "@/assets/blogs/img3.jpeg"

export function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Locations for Real Estate Investment in 2023",
      excerpt:
        "Discover the most promising locations for real estate investment this year, with insights on market trends and growth potential.",
      image: img1,
      date: "June 15, 2023",
      author: "Rajesh Sharma",
      category: "Investment",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Home for Your Family",
      excerpt:
        "A comprehensive guide to selecting a family home that meets your needs, budget, and lifestyle preferences.",
      image: img2,
      date: "July 22, 2023",
      author: "Priya Patel",
      category: "Buying Guide",
    },
    {
      id: 3,
      title: "Sustainable Architecture: The Future of Real Estate",
      excerpt:
        "Exploring eco-friendly building practices and how sustainable architecture is shaping the future of real estate development.",
      image: img3,
      date: "August 10, 2023",
      author: "Ananya Desai",
      category: "Architecture",
    },
  ]

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Latest from Our Blog
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and news from the real estate industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <User size={14} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-md border-2 border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition-colors"
          >
            View All Articles <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

