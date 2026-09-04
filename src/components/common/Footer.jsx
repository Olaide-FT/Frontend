import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import { Link } from "react-router-dom";
import NestoraLogo from "./NestoraLogo";

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>
            <Link
              to="/"
              className="font-body text-2xl font-extrabold"
            >
              <NestoraLogo dark />
            </Link>

            <p className="mt-5 max-w-sm font-body text-sm leading-6 text-white/40">
              A modern property platform connecting people
              with places they'll love.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                Instagram,
                Facebook,
                Twitter,
                Linkedin,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-accent hover:text-accent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}

          <div>
            <h3 className="font-body text-sm font-semibold">
              Platform
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/properties"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                Properties
              </Link>

              <Link
                to="/about"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Account */}

          <div>
            <h3 className="font-body text-sm font-semibold">
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/login"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                Create Account
              </Link>

              <Link
                to="/register?role=owner"
                className="block font-body text-sm text-white/40 hover:text-white"
              >
                List a Property
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-body text-sm font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-3 font-body text-sm text-white/40">
              <p>
                nestoraadmin@gmail.com
              </p>

              <p>
                +234 800 000 0000
              </p>

              <p>
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Nestora. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="#"
              className="font-body text-xs text-white/30 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              to="#"
              className="font-body text-xs text-white/30 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;