"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Plomberie Martin",
    type: "Artisan plombier",
    description: "Site vitrine avec formulaire de demande de devis, galerie de realisations et zone d'intervention. Le client recoit maintenant 5 a 10 demandes par semaine.",
    result: "+40% de nouveaux clients",
    color: "bg-primary/10",
  },
  {
    title: "Salon Elegance",
    type: "Coiffeur",
    description: "Presentation des prestations, tarifs clairs et systeme de prise de rendez-vous en ligne. Les clients peuvent reserver 24h/24.",
    result: "Agenda rempli a 80%",
    color: "bg-accent/10",
  },
  {
    title: "Menuiserie Dubois",
    type: "Artisan menuisier",
    description: "Portfolio de creations sur-mesure avec photos avant/apres. Mise en valeur du savoir-faire et des materiaux utilises.",
    result: "Projets plus importants",
    color: "bg-primary/10",
  },
  {
    title: "Auto-Ecole Conduite Plus",
    type: "Auto-ecole",
    description: "Presentation des formules, tarifs transparents et temoignages d'eleves. Inscription en ligne simplifiee.",
    result: "+60% d'inscriptions",
    color: "bg-accent/10",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ils m&apos;ont fait confiance</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Des professionnels comme vous qui ont booste leur activite grace a leur site internet.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`h-40 ${project.color} flex items-center justify-center`}
                >
                  <div className="text-center px-4">
                    <span className="text-2xl font-bold text-primary">{project.result}</span>
                    <p className="text-sm text-muted-foreground mt-1">Resultat obtenu</p>
                  </div>
                </motion.div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1">{project.type}</Badge>
                    </div>
                  </div>
                  <p className="mt-3 text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center p-8 bg-muted/50 rounded-2xl"
        >
          <p className="text-lg text-foreground font-medium">
            Vous aussi, faites passer votre activite au niveau superieur.
          </p>
          <p className="text-muted-foreground mt-2">
            Chaque projet est unique, parlons du votre.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
