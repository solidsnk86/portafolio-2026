interface TemplateProps {
  userEmail: string;
  userName?: string;
  ownEmail: string;
  date: Date | string;
  message: string;
  portfolioUrl: string;
}

export const template = ({ userEmail, userName, ownEmail, date, message, portfolioUrl }: TemplateProps) => `
<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Nuevo mensaje — Portfolio</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<style>
  table { border-collapse: collapse; }
  .fallback-font { font-family: Georgia, 'Times New Roman', serif !important; }
</style>
<![endif]-->
<style>
  body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  body { margin:0; padding:0; width:100% !important; height:100% !important; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  table { border-collapse: collapse !important; }
  a { text-decoration: none; }

  .serif { font-family: 'Georgia', 'Times New Roman', Times, serif; }
  .sans  { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

  /* ---- tokens (light default) ---- */
  .bg-body      { background-color: #f4f4f5; }
  .bg-card      { background-color: #ffffff; }
  .bg-secondary { background-color: #f4f4f5; }
  .text-fg      { color: #171717; }
  .text-muted   { color: #71717a; }
  .border-c     { border-color: #e4e4e7 !important; }
  .badge-dark   { background-color: #171717; color: #ffffff !important; }
  .badge-new    { background-color: #ecfdf5; color: #059669 !important; }
  .btn-primary  { background-color: #4f46e5; color: #ffffff !important; }
  .btn-outline  { background-color: transparent; color: #171717 !important; border: 1px solid #e4e4e7; }
  .stripes-td   { background-color: #e4e4e7; }
  .stripe-col   { width: 16px; }
  .divider      { border-top: 1px solid #e4e4e7; }
  .logo-dot     { background-color: #171717; }

  /* ---- dark mode: mail clients that honor prefers-color-scheme ---- */
  @media (prefers-color-scheme: dark) {
    .bg-body      { background-color: #000000 !important; }
    .bg-card      { background-color: #111111 !important; }
    .bg-secondary { background-color: #18181b !important; }
    .text-fg      { color: #ededed !important; }
    .text-muted   { color: #a1a1aa !important; }
    .border-c     { border-color: #27272a !important; }
    .badge-dark   { background-color: #ededed !important; color: #000000 !important; }
    .badge-new    { background-color: #052e21 !important; color: #34d399 !important; }
    .btn-outline  { color: #ededed !important; border: 1px solid #27272a !important; }
    .stripes-td   { background-color: #27272a !important; }
    .divider      { border-top: 1px solid #27272a !important; }
    .logo-dot     { background-color: #ededed !important; }
  }

  /* ---- Gmail forced dark-mode hooks ---- */
  [data-ogsc] .bg-body      { background-color: #000000 !important; }
  [data-ogsc] .bg-card      { background-color: #111111 !important; }
  [data-ogsc] .bg-secondary { background-color: #18181b !important; }
  [data-ogsc] .text-fg      { color: #ededed !important; }
  [data-ogsc] .text-muted   { color: #a1a1aa !important; }
  [data-ogsc] .border-c     { border-color: #27272a !important; }

  @media screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .stack     { display: block !important; width: 100% !important; }
    .px-mobile { padding-left: 20px !important; padding-right: 20px !important; }
    .stripe-col { width: 8px !important; }
  }
</style>
</head>
<body class="bg-body sans" style="margin:0; padding:0;">
  <!-- preheader (oculto, se ve en la vista previa del inbox) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
    Recibí tu mensaje, ${userName} — te respondo a la brevedad &nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="bg-body">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="632" cellpadding="0" cellspacing="0" class="container" style="width:632px; max-width:632px;">
        <tr>
          <!-- tira decorativa lateral izquierda -->
          <td class="stripes-td stripe-col" width="16" style="width:16px; font-size:0; line-height:0;
            background-image: repeating-linear-gradient(135deg,
              rgba(23,23,23,0.12) 0, rgba(23,23,23,0.12) 2px,
              transparent 2px, transparent 6px);">&nbsp;</td>

          <td class="bg-card border-c" style="border-top:1px solid #e4e4e7; border-bottom:1px solid #e4e4e7;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

          <!-- header -->
          <tr>
            <td class="px-mobile" style="padding: 36px 44px 24px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span class="sans text-muted" style="font-size:11px; letter-spacing:2px; text-transform:uppercase;">Portfolio &middot; Confirmación de contacto</span>
                  </td>
                  <td align="right">
                    <span class="badge-new sans" style="display:inline-block; font-size:11px; font-weight:600; padding:4px 10px; border-radius:999px;">Recibido</span>
                  </td>
                </tr>
              </table>
              <h1 class="serif text-fg" style="margin:14px 0 0 0; font-size:28px; line-height:1.25; font-weight:400;">
                ¡Gracias por escribirme, ${userName}!
              </h1>
              <p class="sans text-muted" style="margin:8px 0 0 0; font-size:14px; line-height:1.6;">
                Recibí tu mensaje y te voy a responder a la brevedad. Acá te dejo una copia de lo que enviaste.
              </p>
            </td>
          </tr>

          <tr><td class="divider" style="font-size:0; line-height:0;">&nbsp;</td></tr>

          <!-- datos del remitente -->
          <tr>
            <td class="px-mobile" style="padding: 28px 44px 8px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="stack" width="50%" style="padding-bottom:20px; vertical-align:top;">
                    <span class="sans text-muted" style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase;">Nombre</span><br>
                    <span class="serif text-fg" style="font-size:17px;">${userName}</span>
                  </td>
                  <td class="stack" width="50%" style="padding-bottom:20px; vertical-align:top;">
                    <span class="sans text-muted" style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase;">Email</span><br>
                    <span class="serif text-fg" style="font-size:17px;">${userEmail}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- mensaje -->
          <tr>
            <td class="px-mobile" style="padding: 8px 44px 32px 44px;">
              <span class="sans text-muted" style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase;">Mensaje</span>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="bg-secondary border-c" style="margin-top:10px; border:1px solid #e4e4e7; border-radius:8px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p class="sans text-fg" style="margin:0; font-size:15px; line-height:1.7;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td class="divider" style="font-size:0; line-height:0;">&nbsp;</td></tr>

          <!-- acciones -->
          <tr>
            <td class="px-mobile" style="padding: 28px 44px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="${portfolioUrl}" class="btn-primary sans" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">
                      Ver portfolio
                    </a>
                  </td>
                  <td>
                    <a href="mailto:${ownEmail}" class="btn-outline sans border-c" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">
                      Escribirme directo
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr><td class="divider" style="font-size:0; line-height:0;">&nbsp;</td></tr>
          <tr>
            <td class="px-mobile" style="padding: 20px 44px 32px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span class="sans text-muted" style="font-size:10px;">${date} &middot; enviado automáticamente</span>
                  </td>
                  <td align="right">
                    <span class="sans text-muted" style="font-size:10px;">${portfolioUrl}</span>
                  </td>
                </tr>
              </table>
              <p class="sans text-muted" style="margin:16px 0 0 0; font-size:11px; line-height:1.6;">
                Este es un correo automático de confirmación, no hace falta que lo respondas.
              </p>
            </td>
          </tr>

        </table>
          </td>

          <!-- tira decorativa lateral derecha -->
          <td class="stripes-td stripe-col" width="16" style="width:16px; font-size:0; line-height:0;
            background-image: repeating-linear-gradient(135deg,
              rgba(23,23,23,0.12) 0, rgba(23,23,23,0.12) 2px,
              transparent 2px, transparent 6px);">&nbsp;</td>
        </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
