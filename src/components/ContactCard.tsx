import { useState } from 'react'

export function ContactCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:office@kankot.com?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`

      // Open email client
      window.location.href = mailtoLink

      // Show success notification
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600">Get in touch with our team</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Contact Information */}
        <div className="backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-emerald-100/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Office</h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">ADDRESS</div>
              <p className="text-gray-800">
                Aleja Grunwaldzka 2<br />
                82-300 Elbląg<br />
                Poland
              </p>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">EMAIL</div>
              <a 
                href="mailto:office@kankot.com"
                className="text-gray-800 hover:text-emerald-600 transition-colors"
              >
                office@kankot.com
              </a>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">COMPANY INFO</div>
              <p className="text-gray-800">
                KANKOT sp. z o. o.<br />
                KRS: 0001045980<br />
                NIP: 5783162660<br />
                REGON: 525794226
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100/20">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/80 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/80 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/80 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white font-semibold transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Message sent successfully!
        </div>
      )}
    </div>
  )
}
