"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const guarantees = [
  "Livraison rapide sous 1 à 2 semaines selon le projet",
  "Petites modifications incluses pendant 1 mois après livraison",
  "Support après livraison en cas de besoin",
  "Prix clair et fixé à l’avance, sans surprise",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden xl:overflow-visible">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Desktop mockup */}
              <div className="rounded-xl overflow-hidden border shadow-xl bg-background">
                <Image
                  src="/site-desktop.png"
                  alt="Aperçu du site sur ordinateur"
                  className="w-full max-w-[400px] h-[250px] object-cover"
                  width={400}
                  height={250}
                />
              </div>

              {/* Mobile mockup */}
              <div className="absolute -bottom-6 -right-6 overflow-hidden rounded-lg">
                <Image
                  src="/site-mobile.png"
                  alt="Aperçu du site sur mobile"
                  className="w-[120px] h-[240px] object-cover"
                  width={120}
                  height={240}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl text-center sm:text-4xl font-bold text-foreground">
              Pourquoi travailler avec moi ?
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Je travaille avec des artisans, des indépendants et des petites
                entreprises qui veulent être visibles sur internet sans perdre
                de temps ni se compliquer la vie.
              </p>
              <p>
                Mon objectif est de créer des sites clairs, faciles à utiliser
                et pensés pour générer des demandes de clients (appels, devis,
                contacts).
              </p>
              <p>
                Je vous accompagne du début à la fin : je vous pose les bonnes
                questions, je crée votre site, et je vous montre comment
                l’utiliser simplement au quotidien.
              </p>
              <p>
                Vous pouvez rester concentré sur votre métier, pendant que votre
                site vous aide à trouver de nouveaux clients.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Mes engagements
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {guarantees.map((guarantee) => (
                  <motion.div
                    key={guarantee}
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground text-sm">{guarantee}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
