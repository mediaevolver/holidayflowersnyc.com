import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get in touch with our plant experts. We're here to help you find the perfect plants for your space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Visit Our Store</p>
                  <p className="text-gray-600">118 W 28th St</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Call Us</p>
                  <a href="tel:+12126754300" className="text-primary-600 hover:text-primary-700 transition-colors">
                    (212) 675-4300
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Us</p>
                  <a href="mailto:holidayfoliage@aol.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                    holidayfoliage@aol.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600">Mon-Sat: 9AM-6PM, Sun: 10AM-5PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plant Care Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Free plant consultation</li>
              <li>• Custom arrangements</li>
              <li>• Plant care guidance</li>
              <li>• Delivery throughout NYC</li>
              <li>• Plant rental services</li>
              <li>• Seasonal flower arrangements</li>
              <li>• Premium orchid collections</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="plant-care">Plant Care Question</option>
                <option value="custom-order">Custom Arrangement</option>
                <option value="delivery">Delivery Question</option>
                <option value="rental">Plant Rental</option>
                <option value="seasonal">Seasonal Arrangements</option>
                <option value="orchids">Orchid Collection</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us about your plant needs..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 