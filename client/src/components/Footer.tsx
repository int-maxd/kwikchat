import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.025em" }}>kwik</span>
                <span className="text-2xl font-bold text-accent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "800", letterSpacing: "-0.025em" }}>FLOW</span>
              </div>
            </div>
            <p className="text-gray-300 text-base">
              Automating business processes to save you time, reduce errors, and boost productivity.
            </p>
            <div className="flex space-x-6">
              {[
                { icon: "linkedin", href: "#" },
                { icon: "twitter", href: "#" },
                { icon: "facebook", href: "#" },
                { icon: "instagram", href: "#" }
              ].map((social) => (
                <a key={social.icon} href={social.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{social.icon}</span>
                  <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === "linkedin" && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social.icon === "twitter" && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.04 10.04 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.481C7.69 8.095 4.067 6.13 1.64 3.161a4.92 4.92 0 001.522 6.574 4.903 4.903 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.59z" />
                    )}
                    {social.icon === "facebook" && (
                      <path d="M22 0H2a2 2 0 00-2 2v20a2 2 0 002 2h11v-9h-3v-4h3V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763V11h4.44l-.773 4H16v9h6a2 2 0 002-2V2a2 2 0 00-2-2" />
                    )}
                    {social.icon === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-white">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "Services", href: "#services" },
                    { name: "Integrations", href: "#integrations" },
                    { name: "Process", href: "#process" },
                    { name: "Testimonials", href: "#testimonials" },
                    { name: "Contact", href: "#contact" }
                  ].map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-white">Company</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "About Us", href: "#" },
                    { name: "Blog", href: "#" },
                    { name: "Careers", href: "#" },
                    { name: "Privacy Policy", href: "#" },
                    { name: "Terms of Service", href: "#" }
                  ].map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-white">Stay Updated</h3>
              <p className="mt-4 text-base text-gray-300">Get the latest automation tips and updates.</p>
              <form className="mt-4 sm:flex">
                <Input
                  type="email"
                  id="email-address"
                  name="email-address"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-md border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <Button type="button" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} KwikFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
