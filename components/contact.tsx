"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@ydweb.fr",
  },
  {
    icon: MapPin,
    title: "Zone d'intervention",
    value: "France, Suisse",
  },
  {
    icon: Clock,
    title: "Délai de réponse",
    value: "Sous 24 heures",
  },
];

const services = [
  "Site vitrine",
  "Site avec prise de rendez-vous",
  "Site e-commerce",
  "Refonte de site existant",
  "Autre projet",
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        e.currentTarget.reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Une erreur est survenue");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Impossible d'envoyer le message. Verifiez votre connexion.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Parlons de votre projet
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Devis gratuit et sans engagement. Décrivez-moi votre activité et vos
            besoins, je vous recontacte rapidement avec une proposition adaptée.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {info.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Demande de devis gratuit
                </CardTitle>
                <CardDescription>
                  Remplissez ce formulaire et je vous recontacte sous 24h pour
                  discuter de votre projet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Message envoyé !
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Merci pour votre demande. Je vous recontacte très
                      rapidement.
                    </p>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Votre nom *</FieldLabel>
                          <Input
                            name="name"
                            placeholder="Jean Dupont"
                            required
                          />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Votre email *</FieldLabel>
                          <Input
                            name="email"
                            type="email"
                            placeholder="jean@exemple.com"
                            required
                          />
                        </Field>
                      </FieldGroup>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Telephone</FieldLabel>
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="06 12 34 56 78"
                          />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Type de projet</FieldLabel>
                          <Select name="service">
                            <SelectTrigger>
                              <SelectValue placeholder="Selectionnez..." />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </FieldGroup>
                    </div>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Decrivez votre projet *</FieldLabel>
                        <Textarea
                          name="message"
                          placeholder="Parlez-moi de votre activité, ce que vous attendez de votre site, vos objectifs..."
                          className="min-h-[150px] resize-none"
                          required
                        />
                      </Field>
                    </FieldGroup>

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-destructive text-sm"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errorMessage}
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner className="mr-2" />
                            Envoi en cours...
                          </>
                        ) : (
                          "Envoyer ma demande"
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-xs text-muted-foreground">
                      * Champs obligatoires. Vos informations restent
                      confidentielles.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
