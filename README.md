# MHTechFusion — Company Portfolio

Complete editable source for the MHTechFusion one-page company portfolio, including the latest animated hero. This is a static HTML/CSS/JavaScript website. No npm installation, build step, database, API key or paid hosting service is required to run it.

## Included

- Corporate, responsive company overview and six service areas.
- Nine-stage engineering animation: brainstorming, cost planning, R&D, schematic/PCB design, CAD/enclosure design, firmware, debugging/testing, revisions and product handover.
- Play/pause, previous/next and direct stage controls, with reduced-motion support.
- SmartPTI truck inspection and medical-domain wearable/stimulation project examples.
- Project image enlargement, mobile navigation, contact links and QR codes.
- Downloadable one-page PDF company overview.
- Optional Python source for regenerating the PDF and QR images.

## Make it live with GitHub Pages

1. Extract the ZIP. Open the `mhtechfusion-github-pages` folder inside it.
2. Create a new **public** GitHub repository, for example `mhtechfusion-portfolio`. A public repository works with GitHub Free.
3. Upload the **contents** of this extracted folder and commit them to `main`. Your repository must show `index.html` at its top level, alongside `assets`, `styles.css`, and the other source files. Do not upload only the ZIP or add an extra enclosing folder.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/(root)**, then **Save**.
6. Once deployment finishes, use the website address shown in Pages settings. For a project repository, it normally follows `https://YOUR-USERNAME.github.io/mhtechfusion-portfolio/`.

The included `.nojekyll` file marks the site as plain static content. If your file uploader omits dotfiles, use Git or create an empty `.nojekyll` file in the repository root. Keep all asset filenames and folders unchanged. Publishing may take several minutes.

Future commits to the publishing branch update the website automatically. The GitHub Pages address is a public website address.

Official reference: [Configure a GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Alternatively, push the files using Git

Create an empty repository on GitHub first, without adding a README or license. Open a terminal **inside the extracted folder containing `index.html`**, replace `YOUR-USERNAME` below, then run:

```bash
git init
git add .
git commit -m "Add MHTechFusion company portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mhtechfusion-portfolio.git
git push -u origin main
```

Complete the Pages settings in steps 4–6 above. These commands are for a new repository; use your existing clone for an existing repository.

For later edits:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

## Preview locally

Open `index.html` in a modern browser. For a local server, run the following from the folder containing `index.html`:

```bash
python -m http.server 8000
```

On Windows, `py -m http.server 8000` also works when the Python launcher is installed. Open `http://localhost:8000` and stop the server with Ctrl+C. Python is optional; it is not required on GitHub Pages.

## File guide

| File or folder | Purpose |
| --- | --- |
| `index.html` | Company copy, services, projects, contact details and page structure |
| `styles.css` | Main layout, colors, typography and responsive styles |
| `app.js` | Mobile navigation and project-image dialog |
| `engineering-film.js` | All nine SVG animation scenes, text, timing and controls |
| `engineering-film.css` | Animation styling, transitions and reduced-motion behavior |
| `assets/` | Company mark, project images, QR images and downloadable PDF |
| `assets/qr-destinations.json` | Reference list of QR destinations; not a runtime setting |
| `scripts/create_overview.py` | Optional PDF and QR generation source |
| `scripts/requirements.txt` | Optional Python generator dependencies |
| `scripts/fonts/` | Fonts and their license for portable PDF generation |
| `.nojekyll` | Static publishing marker for GitHub Pages |

The website files are the editable source; there is no separate compiled or minified application to recover.

## Customize and add more projects

Edit the text and links directly in `index.html`. To add a project, copy an existing `<article class="project">` within the `projects` section. Give it a unique `id`, update its title, description, index, tags and image references, and add the new image to `assets/`. Update the section introduction if the number of projects changes.

Each image enlargement button uses `data-image` and `data-title`; update those along with the `<img src>` and `alt` attributes. Keep the header focused on the engineering journey.

Change brand colors in the `:root` variables at the start of `styles.css`. Change animation copy or scenes in the `stages` array in `engineering-film.js`; `duration` controls the time per stage in milliseconds.

The site optionally loads DM Sans and Manrope from Google Fonts. It falls back to local system fonts if unavailable. Project images, the logo, QR images and PDF are included locally.

### Contact, QR codes and social previews

The website QR points to `https://www.mhtechfusion.com/`, and the LinkedIn QR points to `https://www.linkedin.com/company/mhtechfusion/posts/`. They keep those destinations when hosted on GitHub Pages. To point a QR elsewhere, regenerate it and update its matching link and alt text in `index.html`.

The Python generator defines its destinations in `URLS` and writes the JSON reference file. Editing the JSON alone does not regenerate a QR image. The PDF has its own contact copy in the generator; update that source when changing the PDF.

After your final website URL is known, optionally add the following inside `<head>` in `index.html`, replacing the example username/repository or using your custom domain:

```html
<meta property="og:url" content="https://YOUR-USERNAME.github.io/mhtechfusion-portfolio/">
<meta property="og:image" content="https://YOUR-USERNAME.github.io/mhtechfusion-portfolio/assets/company-mark.png">
```

Use absolute URLs for social previews. The export contains no dependency on the previous hosting address. Email buttons open the visitor's email application; this website has no server-side contact-form service.

## Optional: regenerate the PDF and QR images

The finished PDF and QR images are already included. To change and rebuild them, install Python, then run from the project root:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/create_overview.py
```

This overwrites `assets/MHTechFusion_Company_Overview.pdf`, the two QR PNGs and the QR destination JSON file. It is an authoring utility, not a website runtime requirement. The bundled DejaVu font license is in `scripts/fonts/LICENSE.txt`.

## Export details

Prepared on 22 October 2026 from the published portfolio source revision `d814d4a67673eab7ef6155a7db5120cc1375cb89`. The static source was moved to the package root for GitHub Pages, previous-host social URL tags were removed, and the optional PDF generator was made portable. The latest hero animation and existing project assets are included.
