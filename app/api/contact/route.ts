import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

// ============================================
// CONFIGURATION - MODIFIEZ CES VALEURS
// ============================================

// TODO: Ajoutez votre clé API Resend ici ou dans les variables d'environnement
// Créez un compte gratuit sur https://resend.com et récupérez votre clé API
const RESEND_API_KEY = process.env.RESEND_API_KEY; // ou remplacez par votre clé directement: "re_xxxxxxxxx"

// TODO: Remplacez par votre adresse email pour recevoir les messages
const YOUR_EMAIL = process.env.CONTACT_EMAIL || "contact@ydweb.fr";

// TODO: Remplacez par votre nom d'entreprise
const BUSINESS_NAME = "ydweb";

// ============================================
const resend = new Resend(RESEND_API_KEY);

// Cache pour limiter les envois par IP
const ipCache = new Map<string, number>();

// Security: Sanitize HTML input

const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  try {
    const body = await request.json();
    // Check if website field is present (bot protection)
    if (body.website) {
      return NextResponse.json({ error: "Spam détecté" }, { status: 400 });
    }

    //Check if IP has sent a request recently
    const now = Date.now();
    const lastTime = ipCache.get(ip);
    if (lastTime && now - lastTime < 60_000) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans 1 minute." },
        { status: 429 },
      );
    }

    ipCache.set(ip, now);

    // Check if form was submitted too quickly (bot protection)
    const { startTime } = body;
    if (startTime) {
      const duration = Date.now() - startTime;

      if (duration < 2000) {
        return NextResponse.json({ error: "Spam détecté" }, { status: 400 });
      }
    }

    const { name, email, phone, service, message } = body;

    const cleanName = name?.trim();
    const cleanEmail = email?.trim();
    const cleanMessage = message?.trim();
    const safeMessage = purify.sanitize(cleanMessage);
    // Validation des champs requis
    if (!cleanName || !cleanEmail || !safeMessage) {
      return NextResponse.json(
        { error: "Les champs nom, email et message sont obligatoires." },
        { status: 400 },
      );
    }

    // Longueurs
    if (cleanName.length > 100) {
      return NextResponse.json({ error: "Nom trop long." }, { status: 400 });
    }

    if (cleanEmail.length > 150) {
      return NextResponse.json({ error: "Email trop long." }, { status: 400 });
    }

    if (safeMessage.length > 2000) {
      return NextResponse.json(
        { error: "Message trop long." },
        { status: 400 },
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 },
      );
    }

    // Envoi de l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: `${BUSINESS_NAME} <contact@ydweb.fr>`, // Utilisez votre domaine vérifié en production
      to: YOUR_EMAIL,
      replyTo: cleanEmail,
      subject: `Nouvelle demande de ${cleanName} - ${service || "Contact général"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            Nouvelle demande de contact
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${cleanName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${cleanEmail}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Téléphone:</strong> ${phone}</p>` : ""}
            ${service ? `<p style="margin: 10px 0;"><strong>Service demandé:</strong> ${service}</p>` : ""}
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6;">${(safeMessage || "").replace(/\n/g, "<br>")}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé.\nNous vous répondrons sous 24h",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR", {
      ip,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 },
    );
  }
}
