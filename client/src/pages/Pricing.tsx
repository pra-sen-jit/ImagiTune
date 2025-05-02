import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, XIcon } from 'lucide-react';
const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your creative needs.
          </p>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex items-center">
              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${annual ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`} onClick={() => setAnnual(true)}>
                Annual{' '}
                <span className="text-green-500 text-xs font-normal ml-1">
                  Save 20%
                </span>
              </button>
              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!annual ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`} onClick={() => setAnnual(false)}>
                Monthly
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">Free</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For casual exploration
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <Link to="/signup" className="block w-full py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-center text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mb-6">
                  Start for Free
                </Link>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      5 image-to-music conversions per month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Basic customization options
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Standard quality audio (MP3)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon size={20} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">No batch processing</span>
                  </li>
                  <li className="flex items-start">
                    <XIcon size={20} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">
                      Community support only
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-purple-500 dark:border-purple-600 overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">Pro</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For creative professionals
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${annual ? '19' : '24'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <Link to="/signup" className="block w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-center text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors mb-6">
                  Get Started
                </Link>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      100 image-to-music conversions per month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Advanced customization options
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      High quality audio (MP3 & WAV)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Batch processing (up to 10 images)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Email support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For teams and businesses
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${annual ? '79' : '99'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <Link to="/contact" className="block w-full py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-center text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mb-6">
                  Contact Sales
                </Link>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Unlimited image-to-music conversions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Full customization suite
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Studio quality audio (all formats)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Unlimited batch processing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Dedicated support manager
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      API access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Custom integration options
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about our pricing and plans.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade, downgrade, or cancel your plan at any
                time. Changes to your subscription will take effect at the start
                of your next billing cycle.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Do unused conversions roll over to the next month?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, unused image-to-music conversions do not roll over to the
                next month. Your allocation resets at the beginning of each
                billing cycle.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards (Visa, Mastercard, American
                Express), PayPal, and Apple Pay. Enterprise customers can also
                pay by invoice.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, all paid plans come with a 14-day free trial. No credit
                card required until you decide to continue with a paid
                subscription.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Do you offer educational or non-profit discounts?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer special pricing for educational institutions and
                non-profit organizations. Please contact our sales team for more
                information.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your images into music?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start with our free plan or try any paid plan risk-free with our
            14-day trial.
          </p>
          <Link to="/signup" className="inline-block px-8 py-4 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>
      </section>
    </div>;
};
export default Pricing;