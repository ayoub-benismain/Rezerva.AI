import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function ContactForm() {
  return (
    <div className="bg-white px-6 py-20 lg:px-8" id='contact'>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-blue-700">Contact Us</h2>
        <p className="mt-2 text-gray-600">
          Need assistance or have an idea? Reserva.ai is ready to listen.
        </p>
      </div>

      <form className="mx-auto mt-12 max-w-xl space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input
              type="text"
              name="first-name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              name="last-name"
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
          />
        </div>

        {/* Phone (Tunisia Only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone number</label>
          <div className="flex gap-2 mt-1">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
              🇹🇳 +216
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="12 345 678"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring-blue-700 focus:outline-none"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agree"
            className="h-4 w-4 rounded border-gray-300 focus:ring-blue-700 focus:border-blue-700"
          />
          <label htmlFor="agree" className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-blue-700 underline">
              privacy policy
            </a>.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-600 focus-visible:outline-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Let's Talk
          </button>
        </div>
      </form>
    </div>
  );
}
