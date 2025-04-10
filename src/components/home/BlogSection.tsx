
import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogsData from '@/data/blogs.json';

const BlogSection: React.FC = () => {
  // Display only the latest 3 blog posts
  const latestBlogs = blogsData.slice(0, 3);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Latest from Our Blog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Stay updated with the latest news, tips, and insights from the real estate world
            </p>
          </div>
          <Link 
            to="/blog" 
            className="mt-4 md:mt-0 inline-flex items-center text-real-600 hover:text-real-700 dark:text-real-400 dark:hover:text-real-300 font-medium"
          >
            View all articles
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <article 
              key={blog.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/blog/${blog.id}`}>
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {blog.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  <Link to={`/blog/${blog.id}`} className="hover:text-real-600 dark:hover:text-real-400 transition-colors">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link 
                  to={`/blog/${blog.id}`} 
                  className="inline-flex items-center text-real-600 hover:text-real-700 dark:text-real-400 dark:hover:text-real-300 font-medium text-sm"
                >
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
