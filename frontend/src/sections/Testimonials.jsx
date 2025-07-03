import React, { useState } from "react";
import Testimonial from "../components/Testimonial";

const testimonials = [
  {
    quote: "Reserva.ai made managing bookings effortless — our team saves hours every week thanks to its intuitive interface.",
    name: "Adem jbara",
    role: "Operations Manager",
    avatarSrc: "/avatars/sara.png",
  },
  {
    quote: "The AI-powered assistant in Reserva.ai answers customer questions instantly, improving our response time and customer satisfaction.",
    name: "kanti",
    role: "Customer Support Lead",
    avatarSrc: "/avatars/omar.png",
  },
  {
    quote: "Integrating Reserva.ai with our existing system was seamless. Now we track reservations and availability all in one place.",
    name: "Firas el gafsi",
    role: "IT Specialist",
    avatarSrc: "/avatars/leila.png",
  },
  {
    quote: "With Reserva.ai’s multilingual support, our diverse customer base gets instant help in their language — it’s a game changer!",
    name: "Youssef benticha",
    role: "Marketing Director",
    avatarSrc: "/avatars/youssef.png",
  },
  {
    quote: "The analytics dashboard gives us real-time insights into booking trends, allowing smarter decisions to grow our business.",
    name: "hamed el oued",
    role: "Business Analyst",
    avatarSrc: "/avatars/amira.png",
  },
  {
    quote: "Our customers love the smooth booking experience with Reserva.ai — it’s boosted our online bookings by 30%.",
    name: "ayoub ben ismain",
    role: "Sales Manager",
    avatarSrc: "/avatars/karim.png",
  },
];

export default function TestimonialSection() {
  const [showAll, setShowAll] = useState(false);

  // Decide how many testimonials to show
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="relative py-8 sm:py-10 lg:py-16" id="testimonials">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-blue-600">
          Some kind words from early customers...
        </h2>
        <p className="mt-4 text-lg tracking-tight text-slate-600">
          We collaborated closely with a select group of early users to ensure Reserva.ai perfectly fits their booking and customer service needs. Here's what they had to say about their experience with the platform.
        </p>
      </div>

      <div className="group mt-16">
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
        >
          {displayedTestimonials.map(({ quote, name, role, avatarSrc }, index) => (
            <li key={index} className="lg:list-item">
              <Testimonial
                quote={quote}
                name={name}
                role={role}
                avatarSrc={avatarSrc}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center text-base font-medium tracking-tight text-blue-700 hover:text-blue-600 cursor-pointer"
          >
            {showAll ? "Show less testimonials" : "Show more testimonials"}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="ml-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <path d="m17 14-5 5-5-5" />
              <path d="M12 18.5V5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Blue Wave SVG */}
      <div className="mt-16 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-24"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#3b82f6" // Tailwind blue-500
            fillOpacity="1"
            d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,112C672,96,768,128,864,138.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
