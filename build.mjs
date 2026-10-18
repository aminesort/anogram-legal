// Bouwt de pagina's uit de docs van de app: node build.mjs
import { marked } from 'marked';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const css = `:root{--bg:#0B0B0F;--card:#15141B;--border:#26252E;--text:#F2F1F6;--sec:#A9A7B4;--accent:#B8A6FF}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:Geist,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.65}
main{max-width:760px;margin:0 auto;padding:40px 16px 80px}a{color:var(--accent)}
h1{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:52px;line-height:1.05;margin:24px 0 8px}
h2{font-size:21px;margin-top:40px}p,li{color:var(--sec)}strong{color:var(--text)}
table{width:100%;border-collapse:collapse;font-size:14px;display:block;overflow-x:auto}td,th{border:1px solid var(--border);padding:8px 10px;text-align:left;vertical-align:top;color:var(--sec)}th{color:var(--text);background:var(--card)}
nav{display:flex;gap:18px;align-items:center;font-size:15px}nav img{width:36px;height:36px;border-radius:9px}nav .sp{flex:1}
.card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:22px 24px;margin-top:20px}`;

const page = (title, body, root) => `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="icon" href="${root}icon.png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Instrument+Serif&display=swap"><style>${css}</style></head>
<body><main><nav><a href="${root}"><img src="${root}icon.png" alt="AnoGram"></a><span class="sp"></span><a href="${root}privacy/">Privacy</a><a href="${root}voorwaarden/">Voorwaarden</a><a href="${root}#support">Support</a></nav>
${body}</main></body></html>`;

for (const [dir, file, title] of [
  ['privacy', 'privacybeleid.md', 'Privacybeleid · AnoGram'],
  ['voorwaarden', 'gebruiksvoorwaarden.md', 'Gebruiksvoorwaarden · AnoGram'],
]) {
  mkdirSync(dir, { recursive: true });
  const md = readFileSync(new URL(`../anogram/docs/${file}`, import.meta.url), 'utf8');
  writeFileSync(`${dir}/index.html`, page(title, marked.parse(md), '../'));
}

writeFileSync(
  'index.html',
  page(
    'AnoGram',
    `<h1>Praat vrijuit.<br><em style="color:var(--accent)">Zonder je naam.</em></h1>
<p>AnoGram is een chatapp voor gesprekken die niet aan je naam vastzitten. Maak een room met een code, chat en bel met contacten, en stuur foto's en video's die verdwijnen.</p>
<div class="card" id="support"><h2 style="margin-top:0">Support</h2>
<p>Vragen, een probleem of iets melden? Mail naar <a href="mailto:amine12hammi@gmail.com">amine12hammi@gmail.com</a>. We reageren meestal binnen een paar werkdagen.</p>
<p><strong>Account verwijderen:</strong> in de app via Instellingen → Account verwijderen.<br>
<strong>Iemand melden of blokkeren:</strong> houd een bericht ingedrukt, of open in een chat het menu → Leden.</p></div>
<div class="card"><p style="margin:0"><a href="privacy/">Privacybeleid</a> · <a href="voorwaarden/">Gebruiksvoorwaarden</a></p></div>`,
    './',
  ),
);
console.log('klaar');
