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
  body, p, h1 { margin: 0; }
  body { padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  a { text-decoration: none; }

  .serif { font-family: 'Georgia', 'Times New Roman', Times, serif; }
  .sans  { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

  /* ---- tokens (light default) ---- */
  .bg-body      { background-color: #f4f4f5; }
  .bg-card      { background-color: #ffffff; }
  .bg-secondary { background-color: #f4f4f5; }
  .text-fg      { color: #171717; }
  .text-muted   { color: #71717a; }
  .border-c     { border-color: #e4e4e7; }
  .badge-new    { background-color: #ecfdf5; color: #059669 !important; }
  .btn-primary  { background-color: #4f46e5; color: #ffffff !important; }
  .btn-outline  { background-color: transparent; color: #171717 !important; border: 1px solid #e4e4e7; }
  .stripes-bg   { background-color: #e4e4e7; }

  /* ---- dark mode: clientes que respetan prefers-color-scheme ---- */
  @media (prefers-color-scheme: dark) {
    .bg-body      { background-color: #000000 !important; }
    .bg-card      { background-color: #111111 !important; }
    .bg-secondary { background-color: #18181b !important; }
    .text-fg      { color: #ededed !important; }
    .text-muted   { color: #a1a1aa !important; }
    .border-c     { border-color: #27272a !important; }
    .badge-new    { background-color: #052e21 !important; color: #34d399 !important; }
    .btn-outline  { color: #ededed !important; border-color: #27272a !important; }
    .stripes-bg   { background-color: #27272a !important; }
  }

  /* ---- Gmail dark-mode hooks ---- */
  [data-ogsc] .bg-body      { background-color: #000000 !important; }
  [data-ogsc] .bg-card      { background-color: #111111 !important; }
  [data-ogsc] .bg-secondary { background-color: #18181b !important; }
  [data-ogsc] .text-fg      { color: #ededed !important; }
  [data-ogsc] .text-muted   { color: #a1a1aa !important; }
  [data-ogsc] .border-c     { border-color: #27272a !important; }

  /* ---- layout con flexbox ---- */
  .wrap {
    display: flex;
    justify-content: center;
    padding: 40px 16px;
  }
  .container {
    display: flex;
    width: 632px;
    max-width: 632px;
  }
  .stripe {
    flex: 0 0 20px;
    background-image: repeating-linear-gradient(135deg,
      rgba(23,23,23,0.55) 0, rgba(23,23,23,0.55) 3px,
      transparent 3px, transparent 9px);
  }
  @media (prefers-color-scheme: dark) {
    .stripe {
      background-image: repeating-linear-gradient(135deg,
        rgba(237,237,237,0.45) 0, rgba(237,237,237,0.45) 3px,
        transparent 3px, transparent 9px);
    }
  }
  [data-ogsc] .stripe {
    background-image: repeating-linear-gradient(135deg,
      rgba(237,237,237,0.45) 0, rgba(237,237,237,0.45) 3px,
      transparent 3px, transparent 9px) !important;
  }
  .card {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
  .divider { border-top: 1px solid; }

  .section { padding: 28px 44px; }
  .section-header { padding: 36px 44px 24px 44px; }
  .section-info   { padding: 28px 44px 8px 44px; }
  .section-msg    { padding: 8px 44px 32px 44px; }
  .section-footer { padding: 20px 44px 32px 44px; }

  .row { display: flex; }
  .header-row {
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .info-row {
    flex-wrap: wrap;
    gap: 20px;
  }
  .info-col { flex: 1 1 180px; min-width: 0; }

  .actions-row {
    flex-wrap: wrap;
    gap: 10px;
  }

  .footer-row {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 6px 16px;
  }
  .footer-date, .footer-url {
    min-width: 0;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  .footer-url { text-align: right; }

  .eyebrow { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; }

  @media screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .info-row { flex-direction: column; gap: 12px; }
    .stripe { flex-basis: 10px !important; }
    .section-header, .section-info, .section-msg, .section { padding-left:20px !important; padding-right:20px !important; }
    .section-footer { padding-left:20px !important; padding-right:20px !important; }
    .footer-row { flex-direction: column; align-items: flex-start; }
    .footer-url { text-align: left; }
  }
</style>
</head>
<body class="bg-body sans">
  <!-- preheader (oculto, se ve en la vista previa del inbox) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
    Recibí tu mensaje, ${userName} — te respondo a la brevedad &nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;
  </div>

  <div class="wrap bg-body">
    <div class="container">

      <!-- tira decorativa lateral izquierda -->
      <div class="stripe stripes-bg"></div>

      <div class="card bg-card border-c">

        <!-- header -->
        <div class="section-header">
          <div class="row header-row">
            <span class="sans text-muted eyebrow">Portfolio &middot; Confirmación de contacto</span>
            <span class="badge-new sans" style="display:inline-block; font-size:10px; font-weight:600; padding:4px 10px; border-radius:999px; white-space:nowrap;">Recibido</span>
          </div>
          <h1 class="serif text-fg" style="margin-top:14px; font-size:28px; line-height:1.25; font-weight:400;">
            ¡Gracias por escribirme, ${userName}!
          </h1>
          <p class="sans text-muted" style="margin-top:8px; font-size:14px; line-height:1.6;">
            Recibí tu mensaje y te voy a responder a la brevedad. Acá te dejo una copia de lo que enviaste.
          </p>
        </div>

        <div class="divider border-c"></div>

        <!-- datos del remitente -->
        <div class="section-info">
          <div class="row info-row">
            <div class="info-col">
              <span class="sans text-muted eyebrow">Nombre</span><br>
              <span class="serif text-fg" style="font-size:17px;">${userName}</span>
            </div>
            <div class="info-col">
              <span class="sans text-muted eyebrow">Email</span><br>
              <span class="serif text-fg" style="font-size:17px; word-break:break-all;">${userEmail}</span>
            </div>
          </div>
        </div>

        <!-- mensaje -->
        <div class="section-msg">
          <span class="sans text-muted eyebrow">Mensaje</span>
          <div class="bg-secondary border-c" style="margin-top:10px; border:1px solid; border-radius:8px; padding:18px 20px;">
            <p class="sans text-fg" style="font-size:15px; line-height:1.7;">${message}</p>
          </div>
        </div>

        <div class="divider border-c"></div>

        <!-- acciones -->
        <div class="section">
          <div class="row actions-row">
            <a href="${portfolioUrl}" class="btn-primary sans" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">
              Ver portfolio
            </a>
            <a href="mailto:${ownEmail}" class="btn-outline sans border-c" style="display:inline-block; padding:11px 22px; border-radius:999px; font-size:13px; font-weight:600;">
              Escribirme directo
            </a>
          </div>
        </div>

        <div class="divider border-c"></div>

        <!-- footer -->
        <div class="section-footer">
          <div class="row footer-row">
            <span class="sans text-muted footer-date" style="font-size:11px; letter-spacing:0.2px;">Enviado automáticamente &middot; ${date}</span>
            <span class="sans text-muted footer-url" style="font-size:11px; letter-spacing:0.2px;">${portfolioUrl}</span>
          </div>
          <p class="sans text-muted" style="margin-top:16px; font-size:11.5px; line-height:1.6;">
            Este es un correo automático de confirmación, no hace falta que lo respondas.
          </p>
        </div>

      </div>

      <!-- tira decorativa lateral derecha -->
      <div class="stripe stripes-bg"></div>

    </div>
  </div>
</body>
</html>
`;
