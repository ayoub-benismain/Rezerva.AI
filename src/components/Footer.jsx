import React from "react";
import logo from "../assets/logo.png"


export default function Footer() {
    return (

        <>
            <footer class="bg-slate-50">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="py-16 flex flex-col items-center">
                        <img src={logo} alt="" className="w-20 h-20" />

                        {/* <!-- Navigation Links --> */}
                        <nav class="mt-10 text-sm" aria-label="quick links">
                            <div class="-my-1 flex justify-center gap-x-6">
                            <a href="#" class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">Home</a>
                            <a href="#services" class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">Services</a>
                            <a href="#testimonials" class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">Testimonials</a>
                            <a href="#contact-us" class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">Contact Us</a>

                            </div>
                        </nav>
                    </div>

                    {/* <!-- Footer Bottom --> */}
                    <div class="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
                    {/* <!-- Social Icons --> */}
                    <div class="flex gap-x-6">
                        {/* <!-- X (Twitter) Icon --> */}
                        <a aria-label="TaxPal on X" href="#" class="group">
                        <svg class="h-6 w-6 fill-slate-500 group-hover:fill-slate-700" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="..."></path>
                        </svg>
                        </a>

                        {/* <!-- GitHub Icon --> */}
                        <a aria-label="TaxPal on GitHub" href="#" class="group">
                        <svg class="h-6 w-6 fill-slate-500 group-hover:fill-slate-700" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="..."></path>
                        </svg>
                        </a>
                    </div>

                    {/* <!-- Copyright --> */}
                    <p class="mt-6 text-sm text-slate-500 sm:mt-0">
                        © 2025 Reserve.ai. All rights reserved.
                    </p>
                    </div>
                </div>
            </footer>

        </>
    ) 
}