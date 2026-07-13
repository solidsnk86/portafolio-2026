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
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Nuevo mensaje — Portfolio</title>
<style>
  body, table, td, p, h1 { margin:0; padding:0; }
  body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  a { text-decoration:none; }
  table { border-collapse:collapse; }

  .serif { font-family:'Georgia','Times New Roman',Times,serif; }
  .sans  { font-family:-apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }

  /* ---- tokens (light default) ---- */
  .bg-body      { background-color:#f4f4f5; }
  .bg-card      { background-color:#ffffff; }
  .bg-secondary { background-color:#f4f4f5; }
  .text-fg      { color:#171717; }
  .text-muted   { color:#71717a; }
  .border-c     { border-color:#e4e4e7; }
  .badge-new    { background-color:#ecfdf5; color:#059669 !important; }
  .btn-primary  { background-color:#4f46e5; color:#ffffff !important; }
  .btn-outline  { background-color:transparent; color:#171717 !important; border:1px solid #e4e4e7; }
  .stripe-td    {
    background-color:#e4e4e7;
    background-image:repeating-linear-gradient(135deg,
      rgba(23,23,23,0.55) 0, rgba(23,23,23,0.55) 3px,
      transparent 3px, transparent 9px);
  }

  /* ---- dark mode: clientes que respetan prefers-color-scheme ---- */
  @media (prefers-color-scheme: dark) {
    .bg-body      { background-color:#000000 !important; }
    .bg-card      { background-color:#111111 !important; }
    .bg-secondary { background-color:#18181b !important; }
    .text-fg      { color:#ededed !important; }
    .text-muted   { color:#a1a1aa !important; }
    .border-c     { border-color:#27272a !important; }
    .badge-new    { background-color:#052e21 !important; color:#34d399 !important; }
    .btn-outline  { color:#ededed !important; border-color:#27272a !important; }
    .stripe-td    {
      background-color:#27272a !important;
      background-image:repeating-linear-gradient(135deg,
        rgba(237,237,237,0.45) 0, rgba(237,237,237,0.45) 3px,
        transparent 3px, transparent 9px) !important;
    }
  }

  /* ---- Gmail dark-mode hooks ---- */
  [data-ogsc] .bg-body      { background-color:#000000 !important; }
  [data-ogsc] .bg-card      { background-color:#111111 !important; }
  [data-ogsc] .bg-secondary { background-color:#18181b !important; }
  [data-ogsc] .text-fg      { color:#ededed !important; }
  [data-ogsc] .text-muted   { color:#a1a1aa !important; }
  [data-ogsc] .border-c     { border-color:#27272a !important; }
  [data-ogsc] .stripe-td    {
    background-color:#27272a !important;
    background-image:repeating-linear-gradient(135deg,
      rgba(237,237,237,0.45) 0, rgba(237,237,237,0.45) 3px,
      transparent 3px, transparent 9px) !important;
  }

  .eyebrow { font-size:11px; letter-spacing:1.5px; text-transform:uppercase; }

  .section-header { padding:36px 44px 24px 44px; }
  .section-info   { padding:28px 44px 8px 44px; }
  .section-msg    { padding:8px 44px 32px 44px; }
  .section-footer { padding:20px 44px 32px 44px; }
  .section        { padding:28px 44px; }

  /* ---- mobile: tablas -> se apilan a mano, no dependemos de flex-wrap ---- */
  @media screen and (max-width:600px) {
    .container-table { width:100% !important; }
    .stripe-td { width:10px !important; }
    .section-header, .section-info, .section-msg, .section-footer, .section {
      padding-left:20px !important; padding-right:20px !important;
    }
    .stack-col {
      display:block !important;
      width:100% !important;
      text-align:left !important;
      padding-right:0 !important;
      padding-bottom:14px !important;
    }
    .stack-col:last-child { padding-bottom:0 !important; }
    .action-td { display:block !important; width:100% !important; padding:0 0 10px 0 !important; }
    .action-td:last-child { padding-bottom:0 !important; }
  }
</style>
</head>
<body class="bg-body sans" style="margin:0; padding:0;">
  <!-- preheader (oculto, se ve en la vista previa del inbox) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
    Recibí tu mensaje, ${userName} — te respondo a la brevedad &nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;
  </div>

  <table role="presentation" class="bg-body" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" class="container-table" width="632" cellpadding="0" cellspacing="0" border="0">
          <tr>

            <!-- tira decorativa lateral izquierda -->
            <td class="stripe-td" width="20">&nbsp;</td>

            <!-- card -->
            <td class="bg-card border-c" style="border-top:1px solid; border-bottom:1px solid;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- header -->
                <tr>
                  <td class="section-header">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="sans text-muted eyebrow" valign="top">Portfolio &middot; Confirmación de contacto</td>
                        <td align="right" valign="top">
                          <span class="badge-new sans" style="display:inline-block; font-size:10px; font-weight:600; padding:4px 10px; border-radius:999px; white-space:nowrap;">Recibido</span>
                        </td>
                      </tr>
                    </table>
                    <h1 class="serif text-fg" style="margin-top:14px; font-size:28px; line-height:1.25; font-weight:400;">
                      ¡Gracias por escribirme, ${userName}!
                    </h1>
                    <p class="sans text-muted" style="margin-top:8px; font-size:14px; line-height:1.6;">
                      Recibí tu mensaje y te voy a responder a la brevedad. Acá te dejo una copia de lo que enviaste.
                    </p>
                  </td>
                </tr>

                <tr><td class="border-c" style="border-top:1px solid; font-size:0; line-height:0;">&nbsp;</td></tr>

                <!-- datos del remitente -->
                <tr>
                  <td class="section-info">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="stack-col" width="50%" valign="top" style="padding-right:20px;">
                          <span class="sans text-muted eyebrow">Nombre</span><br>
                          <span class="serif text-fg" style="font-size:17px;">${userName}</span>
                        </td>
                        <td class="stack-col" width="50%" valign="top">
                          <span class="sans text-muted eyebrow">Email</span><br>
                          <span class="serif text-fg" style="font-size:17px; word-break:break-all;">${userEmail}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- mensaje -->
                <tr>
                  <td class="section-msg">
                    <span class="sans text-muted eyebrow">Mensaje</span>
                    <table role="presentation" class="bg-secondary border-c" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px; border:1px solid; border-radius:8px;">
                      <tr>
                        <td style="padding:18px 20px;">
                          <p class="sans text-fg" style="font-size:15px; line-height:1.7;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td class="border-c" style="border-top:1px solid; font-size:0; line-height:0;">&nbsp;</td></tr>

                <!-- acciones -->
                <tr>
                  <td class="section">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="action-td" style="padding-right:10px;">
                          <a href="${portfolioUrl}" class="btn-primary sans" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">Ver portfolio</a>
                        </td>
                        <td class="action-td">
                          <a href="mailto:${ownEmail}" class="btn-outline sans border-c" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">Escribirme directo</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td class="border-c" style="border-top:1px solid; font-size:0; line-height:0;">&nbsp;</td></tr>

                <!-- footer -->
                <tr>
                  <td class="section-footer">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="stack-col sans text-muted" valign="top" style="font-size:11px; letter-spacing:0.2px;">Enviado automáticamente &middot; ${date}</td>
                        <td class="stack-col sans text-muted" valign="top" align="right" style="font-size:11px; letter-spacing:0.2px; word-break:break-word;">${portfolioUrl}</td>
                      </tr>
                    </table>
                    <p class="sans text-muted" style="margin-top:16px; font-size:11.5px; line-height:1.6;">
                      Este es un correo automático de confirmación, no hace falta que lo respondas.
                    </p>
                  </td>
                </tr>

              </table>
            </td>

            <!-- tira decorativa lateral derecha -->
            <td class="stripe-td" width="20">&nbsp;</td>

          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
