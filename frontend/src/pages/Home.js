import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart Food Procurement Analytics for Schools
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Optimize your school's cafeteria budget with data-driven
            insights. Compare vendor prices, track orders, and make
            informed purchasing decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/pdfupload" 
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center no-underline"
            >
              Try Demo
            </Link>
            <Link 
              to="/signin" 
              className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors text-center no-underline"
            >
              Home Page
            </Link>
          </div>
        </div>
        <div className="md:w-3/5 mt-12 md:mt-0 mx-auto">
          {/* Dashboard image */}
          <div className="rounded-lg shadow-xl overflow-hidden transform scale-110">
            <img 
              src="/example2.png" 
              alt="Dashboard analytics" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Powerful Features for Smart Procurement
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Everything you need to optimize your school's food procurement process
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Document Digitization</h3>
              <p className="text-gray-600">
                Convert physical procurement documents into searchable digital formats automatically.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Price Analysis</h3>
              <p className="text-gray-600">
                Compare vendor prices across regions and identify cost-saving opportunities.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inventory Optimization</h3>
              <p className="text-gray-600">
                Get smart recommendations for bulk purchasing and inventory management.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Save Time and Money with Smart Analytics
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Reduce Procurement Costs</h3>
                <p className="text-gray-600">Average 15-25% savings on food procurement through data-driven decisions</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Streamline Operations</h3>
                <p className="text-gray-600">Automate document processing and reduce manual work by 80%</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Better Budget Control</h3>
                <p className="text-gray-600">Real-time insights for better budget allocation and planning</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/5 mt-12 md:mt-0 mx-auto">
          {/* Staff with tablet image */}
          <div className="rounded-lg shadow-xl overflow-hidden transform scale-110">
            <img 
              src="/example1.png" 
              alt="Staff using analytics tablet" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
              <p className="text-gray-600">Simply upload your procurement documents and invoices</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Processing</h3>
              <p className="text-gray-600">Our AI extracts and analyzes the data</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">Review detailed analysis and recommendations</p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600">Implement insights to reduce costs</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="bg-blue-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your School's Food Procurement?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of schools already saving money with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/pdfupload" 
              className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors no-underline"
            >
              Try Demo
            </Link>
            <Link 
              to="/signin" 
              className="inline-block px-8 py-3 bg-transparent text-white font-medium rounded-md border border-white hover:bg-blue-700 transition-colors no-underline"
            >
              Home Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;