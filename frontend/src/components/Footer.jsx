import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (


    <footer className="mt-16 bg-navy-dark text-slate-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <GraduationCap className="h-6 w-6 text-gold" />
            <span className="font-display text-lg font-bold">Sri Vidya E.M | T.M High School</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Shaping bright futures through knowledge and values since 1998.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/events" className="hover:text-gold">Events</Link></li>
            <li><Link to="/achievements" className="hover:text-gold">Achievements</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Reach Us</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Sri Vidya E.M & T.M High School, Vidyanagar, Penumuru, Andhra Pradesh</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> info@school.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sri Vidya E.M | T.M High School. All rights reserved.
      </div>
    </footer>
  );
}