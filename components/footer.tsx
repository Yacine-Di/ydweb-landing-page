"use client";

import Link from "next/link";
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
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + description */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-foreground">
              yd<span className="text-primary">web</span>
            </Link>

            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Création de sites internet pour artisans et petites entreprises.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link
              href="#services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>

            <Link href="#work" className="hover:text-primary transition-colors">
              Résultats
            </Link>

            <Link
              href="#contact"
              className="hover:text-primary transition-colors"
            >
              Devis
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
            <a
              href="mailto:contact@ydweb.fr"
              className="hover:text-primary transition-colors"
            >
              contact@ydweb.fr
            </a>

            <Link
              href="#contact"
              className="hover:text-primary transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ydweb. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>
  );
}
