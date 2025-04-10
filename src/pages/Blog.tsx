
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, ChevronRight, Search } from 'lucide-react';
import blogsData from '@/data/blogs.json';
import { Button } from '@/components/ui/button';

const Blog: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="bg-real-600 text-white py-16">
          <div className="container-custom mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Real Estate Blog</h1>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Stay updated with the latest news, tips, and insights from the world of real estate.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-real-400 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Content */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
                
                <div className="space-y-10">
                  {blogsData.map((blog) => (
                    <article key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <Link to={`/blog/${blog.id}`}>
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-64 object-cover"
                        />
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          {blog.date}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          <Link to={`/blog/${blog.id}`} className="hover:text-real-600 dark:hover:text-real-400 transition-colors">
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5fGVufDB8fDB8fHww" 
                              alt={blog.author}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{blog.author}</span>
                          </div>
                          <Link 
                            to={`/blog/${blog.id}`} 
                            className="inline-flex items-center text-real-600 hover:text-real-700 dark:text-real-400 dark:hover:text-real-300 font-medium text-sm"
                          >
                            Read more
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-real-600 dark:hover:text-real-400">
                        <span>Buying Tips</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">8</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-real-600 dark:hover:text-real-400">
                        <span>Selling Advice</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">5</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-real-600 dark:hover:text-real-400">
                        <span>Market Trends</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">12</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-real-600 dark:hover:text-real-400">
                        <span>Home Improvement</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">7</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-real-600 dark:hover:text-real-400">
                        <span>Investment</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">9</span>
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Popular Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Real Estate', 'Buying', 'Selling', 'Investment', 'Market Trends', 'Home Improvement', 'First-Time Buyers', 'Property Value', 'Sustainability', 'Taxes'].map((tag) => (
                      <a 
                        key={tag} 
                        href="#" 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-real-600 hover:bg-real-50 dark:hover:text-real-400 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Newsletter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Subscribe to Newsletter</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get the latest real estate news and insights delivered to your inbox.
                  </p>
                  <form>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                      <Button className="w-full bg-real-600 hover:bg-real-700">
                        Subscribe
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
