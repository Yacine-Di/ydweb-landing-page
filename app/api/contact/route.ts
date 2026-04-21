import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// ============================================
// CONFIGURATION - MODIFIEZ CES VALEURS
// ============================================

// TODO: Ajoutez votre clé API Resend ici ou dans les variables d'environnement
// Créez un compte gratuit sur https://resend.com et récupérez votre clé API
const RESEND_API_KEY = process.env.RESEND_API_KEY // ou remplacez par votre clé directement: "re_xxxxxxxxx"

// TODO: Remplacez par votre adresse email pour recevoir les messages
const YOUR_EMAIL = process.env.CONTACT_EMAIL || "votre-email@exemple.com"

// TODO: Remplacez par votre nom d'entreprise
const BUSINESS_NAME = "DevStudio"

// ============================================

const resend = new Resend(RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validation des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Les champs nom, email et message sont obligatoires." },
        { status: 400 }
      )
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      )
    }

    // Envoi de l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: `${BUSINESS_NAME} <onboarding@resend.dev>`, // Utilisez votre domaine vérifié en production
      to: YOUR_EMAIL,
      replyTo: email,
      subject: `Nouvelle demande de ${name} - ${service || "Contact général"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            Nouvelle demande de contact
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Téléphone:</strong> ${phone}</p>` : ""}
            ${service ? `<p style="margin: 10px 0;"><strong>Service demandé:</strong> ${service}</p>` : ""}
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}
