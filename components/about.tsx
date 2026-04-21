"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const guarantees = [
  "Site livre en 2 a 4 semaines",
  "Paiement en plusieurs fois possible",
  "Modifications incluses pendant 1 mois",
  "Formation a la prise en main",
  "Support technique reactif",
  "Pas de frais caches",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <span className="text-6xl">{"</>"}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Pourquoi travailler avec moi ?</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Je comprends les besoins des artisans et petites entreprises parce que j&apos;ai grandi 
                dans une famille d&apos;entrepreneurs. Je sais que vous n&apos;avez pas de temps a perdre 
                avec des explications techniques compliquees.
              </p>
              <p>
                Mon approche est simple : je vous pose les bonnes questions, je cree votre site, 
                et je vous explique comment l&apos;utiliser. Vous restez concentre sur votre metier 
                pendant que je m&apos;occupe de votre presence en ligne.
              </p>
              <p>
                Je ne suis pas une grosse agence avec des tarifs exorbitants. Je travaille seul, 
                ce qui me permet de proposer des prix justes tout en etant disponible et reactif.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Mes engagements</h3>
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
  )
}
