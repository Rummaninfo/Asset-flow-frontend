import React from "react";

const blogs = [
  {
    id: 1,
    title: "Why Asset Management Matters for Growing Companies",
    excerpt:
      "Learn how structured asset management helps businesses reduce costs, improve accountability, and scale efficiently.",
    date: "August 12, 2025",
    category: "Asset Management",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 2,
    title: "Top 5 Challenges HR Teams Face in Asset Tracking",
    excerpt:
      "Discover common asset tracking problems HR teams face and practical solutions to overcome them.",
    date: "July 28, 2025",
    category: "HR Operations",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  },
  {
    id: 3,
    title: "How Digital Asset Systems Improve Workplace Transparency",
    excerpt:
      "Transparency is key to trust. See how digital asset platforms improve visibility across teams.",
    date: "July 10, 2025",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  },
];

export default function Blog() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-gray-600">
            Insights, tips, and best practices to help you manage company assets
            smarter and faster.
          </p>
        </div>

        {/* Featured Blog */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16 grid grid-cols-1 md:grid-cols-2">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="h-full w-full object-cover"
          />
          <div className="p-8 flex flex-col justify-center">
            <span className="text-sm text-teal-600 font-medium mb-2">
              {blogs[0].category}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {blogs[0].title}
            </h2>
            <p className="text-gray-600 mb-6">{blogs[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{blogs[0].date}</span>
              <button className="text-teal-600 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6 flex flex-col flex-1">
                <span className="text-sm text-teal-600 font-medium mb-2">
                  {blog.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 flex-1">{blog.excerpt}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{blog.date}</span>
                  <button className="text-teal-600 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
