import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100/30 to-emerald-50">
      <Link 
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 py-16 pb-32 md:pb-16"
      >
        <h1 className="text-4xl font-bold text-emerald-900 mb-12">Privacy Policy</h1>
        
        <div className="prose prose-emerald max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">1. Introduction</h2>
            <p className="text-emerald-700">
              KANKOT sp. z o. o. ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we handle your personal data when you visit our website and tells you about your privacy rights under the General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">2. Contact Details</h2>
            <div className="text-emerald-700 space-y-2">
              <p>KANKOT sp. z o. o.</p>
              <p>Aleja Grunwaldzka 2</p>
              <p>82-300 Elbląg</p>
              <p>Poland</p>
              <p>Email: <a href="mailto:office@kankot.com" className="text-emerald-500 hover:text-emerald-600">office@kankot.com</a></p>
              <p>KRS: 0001045980</p>
              <p>NIP: 5783162660</p>
              <p>REGON: 525794226</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">3. Personal Data We Collect</h2>
            <p className="text-emerald-700 mb-2">We may collect and process the following data:</p>
            <ul className="list-disc pl-6 text-emerald-700">
              <li>Identity Data (name, title)</li>
              <li>Contact Data (email address, phone number)</li>
              <li>Technical Data (IP address, browser type, device information)</li>
              <li>Usage Data (information about how you use our website)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">4. How We Use Your Data</h2>
            <p className="text-emerald-700 mb-2">We use your personal data for:</p>
            <ul className="list-disc pl-6 text-emerald-700">
              <li>Providing and managing our services</li>
              <li>Communicating with you</li>
              <li>Improving our website and services</li>
              <li>Marketing (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">5. Your Rights</h2>
            <p className="text-emerald-700 mb-2">Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 text-emerald-700">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">6. Cookies</h2>
            <p className="text-emerald-700 mb-2">
              Our website uses cookies to enhance your browsing experience. You can control cookies through your browser settings. We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 text-emerald-700">
              <li>Necessary cookies: Required for the website to function</li>
              <li>Performance cookies: Used by Vercel Speed Insights to measure and improve website performance</li>
              <li>Analytics cookies: Help us understand how visitors use our site</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-emerald-700 mt-4">
              We use Vercel Speed Insights to monitor and improve our website's performance. This service collects anonymous performance metrics such as page load times and web vitals. This data helps us identify and fix performance issues to provide a better user experience. No personally identifiable information is collected through this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">7. Data Security</h2>
            <p className="text-emerald-700">
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. We limit access to your personal data to employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-emerald-700">
              We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">9. Contact Us</h2>
            <p className="text-emerald-700">
              If you have any questions about this privacy policy or our privacy practices, please contact us at{' '}
              <a href="mailto:office@kankot.com" className="text-emerald-500 hover:text-emerald-600">
                office@kankot.com
              </a>
            </p>
          </section>

          <p className="text-sm text-emerald-600 mt-12">Last updated: December 11, 2024</p>
        </div>
      </motion.div>
    </div>
  )
}