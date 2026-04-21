"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  Smartphone,
  Search,
  Clock,
  Shield,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Site Vitrine",
    description:
      "Un site professionnel qui présente votre activité, vos services et vos coordonnées. Vos clients vous trouvent en quelques clics.",
  },
  {
    icon: Clock,
    title: "Site rapide",
    description:
      "Un site qui se charge vite, c'est un visiteur qui reste. Je m'assure que votre site soit performant pour ne perdre aucun client potentiel.",
  },
  {
    icon: Search,
    title: "Visible sur Google",
    description:
      "Votre site est optimisé pour apparaitre dans les résultats de recherche. Quand quelqu'un cherche votre métier dans votre ville, il vous trouve.",
  },
  {
    icon: Smartphone,
    title: "Adapte à tous les écrans",
    description:
      "Votre site s'affiche parfaitement sur téléphone, tablette et ordinateur. 70% des recherches se font sur mobile aujourd'hui.",
  },
  {
    icon: Shield,
    title: "Sécurisé et fiable",
    description:
      "Site sécurisé avec le cadenas HTTPS qui rassure vos visiteurs. Hébergement professionnel pour un site toujours accessible.",
  },
  {
    icon: Headphones,
    title: "Accompagnement inclus",
    description:
      "Je vous explique simplement le fonctionnement de votre site et je reste disponible après la mise en ligne pour toute modification ou assistance.",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ce que je vous propose
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un site internet cle en main, adapte a votre activite. Je
            m&apos;occupe de tout, vous n&apos;avez rien a faire.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="border-border/50 hover:border-primary/50 transition-colors group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
