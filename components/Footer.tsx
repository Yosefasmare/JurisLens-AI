'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Privacy", href: "/privacy" },
  { name: "pricing", href: "/pricing" }
];

const socialLinks = [
  { name: "Twitter", icon: "🐦", href: "#" },
  { name: "LinkedIn", icon: "💼", href: "#" },
  { name: "GitHub", icon: "👨‍💻", href: "#" }
];

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C] border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]">
              JurisLens AI
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered document summarization for legal professionals and teams.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl hover:text-[#5EF1FF] transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#5EF1FF] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`mailto:yosidev8@gmail.com`} className="text-gray-400 hover:text-[#5EF1FF] transition-colors">
                  yosidev8@gmail.com
                </Link>
              </li>
              <li>
                <Link href="tel:+2517031016698" className="text-gray-400 hover:text-[#5EF1FF] transition-colors">
                  +251 (703) 101-698
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Legal Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} JurisLens AI. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/terms" className="text-gray-400 hover:text-[#5EF1FF] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-[#5EF1FF] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="text-gray-400 hover:text-[#5EF1FF] text-sm transition-colors">
              Legal Disclaimer
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 