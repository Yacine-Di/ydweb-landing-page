"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border bg-muted/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="text-xl font-bold text-foreground">
              yd<span className="text-primary">web</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Sites internet pour artisans et petites entreprises.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* TODO: Remplacez les liens par vos reseaux sociaux */}
            {[
              {
                href: "https://facebook.com",
                icon: Facebook,
                label: "Facebook",
              },
              {
                href: "https://instagram.com",
                icon: Instagram,
                label: "Instagram",
              },
              {
                href: "https://linkedin.com",
                icon: Linkedin,
                label: "LinkedIn",
              },
            ].map((social) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ydweb. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>
  );
}
