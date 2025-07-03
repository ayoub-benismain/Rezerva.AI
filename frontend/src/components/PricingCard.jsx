import React from "react";
import CheckIcon from '../components/CheckIcon'

function PricingCard({ plan }) {
  return (
    <section
      className={`flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8 ${plan.bgClass}`}
    >
      <h3 className={`mt-5 font-display text-lg ${plan.textColor}`}>
        {plan.name}
      </h3>
      <p className={`mt-2 text-base ${plan.textColor}`}>{plan.description}</p>
      <p
        className={`order-first font-display text-5xl font-light tracking-tight ${plan.textColor}`}
      >
        {plan.price}
      </p>
      <ul
        role="list"
        className={`order-last mt-10 flex flex-col gap-y-3 text-sm ${
          plan.featured ? 'text-white' : 'text-slate-200'
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckIcon />
            <span className="ml-4">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.link}
        aria-label={`Get started with the ${plan.name} plan for ${plan.price}`}
        className={`group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 mt-8 ${
          plan.btnClass
        }`}
      >
        Get started
      </a>
    </section>
  )
}


export default PricingCard;