# TechConf 2025 — Event Website

Website statike për konferencën teknologjike TechConf 2025, e hostuar në Azure Storage.

## 🌐 Live Demo
> Këtu vendosim URL e Azure pas deployment. Shembull: `https://STORAGE_ACCOUNT.z1.web.core.windows.net`

## 🛠 Teknologjitë
- HTML5, CSS3, JavaScript (Vanilla — pa framework)
- Azure Storage — Static Website Hosting
- Azure Logic Apps — Mailing list / Newsletter signup (opsional)

## ✨ Karakteristikat
- ⏱ **Countdown timer** në kohë reale (ditë / orë / minuta / sekonda)
- 📅 **Orar interaktiv** me tabs për Ditën 1 dhe Ditën 2
- 🎤 **Seksioni i folësve** me 4 folës dhe rolet e tyre
- 📍 **Informacion për vendin** (adresa, parking, akses)
- 📝 **Formë regjistrimi** me validim dhe 3 lloje biletash (Student / Standard / VIP)
- ❓ **FAQ accordion** me 4 pyetje të shpeshta
- 📧 **Newsletter signup** i lidhur me Azure Logic Apps
- 📱 **Dizajn responsiv** për mobile dhe tablet

## 📁 Struktura e skedarëve
```
event-website/
├── index.html    ← Faqja e vetme (single-page)
├── style.css     ← Të gjitha stilet
├── script.js     ← Countdown, tabs, FAQ, formë, Logic Apps
└── README.md
```

## 🚀 Deployment në Azure Storage

### Hapi 1: Krijo Storage Account
1. Shko te [portal.azure.com](https://portal.azure.com)
2. **Create a resource** → "Storage account"
3. Emri: `techconf2025` · Region: `West Europe` · Plan: `Standard`
4. Kliko **Review + Create** → **Create**

### Hapi 2: Aktivizo Static Website
1. Hap Storage Account → **Static website** (te Data management)
2. Status: **Enabled**
3. Index document name: `index.html`
4. Error document path: `index.html`
5. Kliko **Save** — kopjo **Primary endpoint** URL

### Hapi 3: Ngarko skedarët
1. **Storage browser** → **Blob containers** → **`$web`**
2. **Upload** → zgjidh `index.html`, `style.css`, `script.js`
3. Kliko **Upload**

### Hapi 4: Testo
Hap Primary endpoint URL në browser — website-i duhet të funksionojë plotësisht.

## 📧 Konfigurimi i Azure Logic Apps (Opsional)

### Krijo Logic App
1. **Create a resource** → "Logic App"
2. Emri: `techconf-newsletter` · Plan: **Consumption**
3. **Logic app designer** → Trigger: **"When a HTTP request is received"**
4. JSON Schema:
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" }
  }
}
```
5. **+ New step** → "Send an email (V2)" → lidhu me Outlook/Gmail
6. **Save** → Kopjo **HTTP POST URL**

### Lidhe me website-in
Hap `script.js` dhe zëvendëso:
```javascript
const LOGIC_APP_URL = "VENDOS_URL_KETU";
```
me URL-in e Logic App. Ringarko `script.js` në Azure.

## 👥 Ekipi
| Emri | Detyra |
|------|--------|
| Albena Veseli | Azure Deployment |
| Amela Syla | Testing & QA |
| Anita Cacaj | Logic Apps Integration |
| Dua Gashi | Responsive Design Testing |
| Ardit Hyseni | Documentation |
| Erzana Beqaj | Cross-browser Testing |

## 📄 Licenca
Projekt akademik nga lënda Cloud Computing - FIEK,UP — Detyra 14, Static Website në Azure.
