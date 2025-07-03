import React from "react";

export default function Testimonial({ quote, name, role, avatarSrc, avatarAlt }) {
  return (
    <figure className="rounded-4xl p-8 shadow-md ring-1 ring-slate-900/5">
      <blockquote>
        <p className="text-lg tracking-tight text-slate-900 before:content-['“'] after:content-['”']">
          {quote}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center">
        <div className="overflow-hidden rounded-full bg-slate-50">
          <img
            alt={avatarAlt || name}
            loading="lazy"
            width="48"
            height="48"
            className="h-12 w-12 object-cover"
            src={avatarSrc}
          />
        </div>
        <div className="ml-4">
          <div className="font-medium tracking-tight text-blue-600">{name}</div>
          <div className="mt-1 text-sm text-slate-600">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
