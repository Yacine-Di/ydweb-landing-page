"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    title: "Site pour artisan local",
    type: "Plombier / artisan",
    description:
      "Un site simple pour présenter les services, montrer les réalisations et recevoir des demandes de devis facilement.",
    result: "Plus de demandes de devis",
    link: "#",
    color: "bg-primary/10",
  },
  {
    title: "Site pour professionnel de service",
    type: "Ambulancier / indépendant",
    description:
      "Présentation claire des services et mise en place d’un système pour être contacté facilement.",
    result: "Plus de prises de contact",
    link: "#",
    color: "bg-accent/10",
  },
  {
    title: "Site vitrine simple",
    type: "Entreprise locale",
    description:
      "Un site propre et rapide pour être visible sur internet et rassurer les clients.",
    result: "Meilleure visibilité locale",
    link: "#",
    color: "bg-primary/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Des sites simples qui apportent des clients
          </h2>
          {/* <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Voici quelques exemples de sites que je peux créer pour vous.
          </p> */}
        </motion.div>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cases.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all h-full group">
                {/* RESULT */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`h-36 ${item.color} flex items-center justify-center`}
                >
                  <div className="text-center px-4">
                    <span className="text-lg font-semibold text-primary">
                      {item.result}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Résultat attendu
                    </p>
                  </div>
                </motion.div>

                {/* CONTENT */}
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <Badge variant="secondary" className="w-fit">
                      {item.type}
                    </Badge>
                  </div>

                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* LINK 
                  <a
                    href={item.link}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Voir un exemple
                    <ExternalLink size={14} />
                  </a>*/}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center p-8 bg-muted/40 rounded-2xl"
        >
          <p className="text-lg font-medium text-foreground">
            Vous avez besoin d’un site simple et efficace ?
          </p>
          <p className="text-muted-foreground mt-2">
            Je vous aide à créer un site qui vous apporte des clients.
          </p>
          {/* CTA BUTTON */}
          <div className="mt-6">
            <Button size="lg" asChild className="group">
              <Link href="#contact">
                Demander un devis gratuit
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
