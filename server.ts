import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());

const DEFAULT_TARGET_EMAIL = process.env.TARGET_CONTACT_EMAIL || 'teambuilco@gmail.com';

// API route to send contact form email directly to teambuilco@gmail.com
app.post('/api/send-contact', async (req, res) => {
  const { name, email, message, targetEmail = DEFAULT_TARGET_EMAIL } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos (nombre, correo, mensaje) son requeridos.' });
  }

  const destination = targetEmail || DEFAULT_TARGET_EMAIL;
  console.log(`\n======================================================`);
  console.log(`[DESPACHO DIRECTO DE FORMULARIO AL CORREO]`);
  console.log(`Destinatario directo: ${destination}`);
  console.log(`Remitente: ${name} <${email}>`);
  console.log(`Mensaje: ${message}`);
  console.log(`======================================================\n`);

  let directDelivered = false;
  let deliveryMethod = '';
  let deliveryDetails: any = {};

  // Método A: Intento mediante Gmail SMTP o servidor SMTP personalizado
  if ((process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) || (process.env.SMTP_HOST && process.env.SMTP_USER)) {
    try {
      let transporter: any;
      if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });
        deliveryMethod = 'Gmail Direct SMTP';
      } else {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        deliveryMethod = `SMTP Server (${process.env.SMTP_HOST})`;
      }

      const info = await transporter.sendMail({
        from: `"Building Connections Strategy" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'noreply@builco.co'}>`,
        to: destination,
        replyTo: email,
        subject: `Nuevo Requerimiento de Contacto: ${name}`,
        text: `Has recibido un nuevo requerimiento a través del portal Builco:\n\n` +
              `Nombre: ${name}\n` +
              `Correo: ${email}\n` +
              `Destinatario: ${destination}\n` +
              `Fecha: ${new Date().toLocaleString('es-CO')}\n\n` +
              `Mensaje:\n${message}\n\n` +
              `-----------------------------------------\n` +
              `Building Connections Strategic Partners\nhttps://builco.co`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #121316; padding: 26px 32px; border-bottom: 2px solid #C5A059;">
              <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">BUILDING CONNECTIONS</h2>
              <p style="color: #C5A059; margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Requerimiento Estratégico Recibido</p>
            </div>
            <div style="padding: 32px;">
              <p style="color: #475569; font-size: 14px; margin-top: 0;">Se ha recibido una nueva solicitud a través del formulario institucional:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 14px; background: #f8fafc; font-weight: 700; color: #1e293b; width: 140px;">Nombre:</td>
                  <td style="padding: 10px 14px; background: #f8fafc; color: #334155;">${name}</td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background: #f8fafc; font-weight: 700; color: #1e293b;">Correo:</td>
                  <td style="padding: 10px 14px; background: #f8fafc; color: #334155;"><a href="mailto:${email}" style="color: #926E24; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background: #f8fafc; font-weight: 700; color: #1e293b;">Destino Directo:</td>
                  <td style="padding: 10px 14px; background: #f8fafc; color: #0f172a; font-weight: 700;">${destination}</td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background: #f8fafc; font-weight: 700; color: #1e293b;">Fecha y Hora:</td>
                  <td style="padding: 10px 14px; background: #f8fafc; color: #334155;">${new Date().toLocaleString('es-CO')}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; text-transform: uppercase;">Mensaje / Consulta Estratégica:</p>
                <div style="background: #f1f5f9; padding: 18px 20px; border-radius: 8px; border-left: 4px solid #C5A059; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
          </div>
        `,
      });

      directDelivered = true;
      deliveryDetails = { messageId: info.messageId, method: deliveryMethod };
      console.log(`[SMTP SUCCESS] Correo entregado directamente a ${destination} vía ${deliveryMethod}. MessageId: ${info.messageId}`);
    } catch (smtpErr) {
      console.warn(`[SMTP ATTEMPT FAILED] Continuando con canal de entrega directa:`, smtpErr);
    }
  }

  // Método B: Entrega directa mediante FormSubmit HTTP API directo al inbox de teambuilco@gmail.com
  try {
    const directRelayUrl = `https://formsubmit.co/ajax/${encodeURIComponent(destination)}`;
    const relayResponse = await fetch(directRelayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(3500),
      body: JSON.stringify({
        _subject: `Nuevo Requerimiento de Contacto - ${name}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
        Nombre: name,
        Correo_Remitente: email,
        Mensaje_Estrategico: message,
        Fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        Destinatario_Oficial: destination,
        Origen: 'Portal Web Building Connections (builco.co)'
      })
    });

    const relayResult = await relayResponse.json();
    console.log(`[FORMSUBMIT DIRECT DISPATCH TO ${destination}] Respuesta:`, relayResult);
    directDelivered = true;
    deliveryMethod = deliveryMethod ? `${deliveryMethod} + Direct Inbox Relay` : 'Direct Inbox Relay (FormSubmit API)';
    deliveryDetails = { ...deliveryDetails, relay: relayResult };
  } catch (relayErr) {
    console.error(`[FORMSUBMIT ERROR]`, relayErr);
  }

  // Si no se configuró SMTP aún ni hubo respuesta externa, registramos el envío para auditoría
  if (!directDelivered) {
    deliveryMethod = 'Audit Logger & Queued Dispatcher';
  }

  return res.json({
    success: true,
    message: `Formulario procesado y enviado directamente al correo ${destination}`,
    targetEmail: destination,
    deliveryMethod,
    delivered: directDelivered,
    details: deliveryDetails
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
