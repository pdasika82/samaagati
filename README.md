# Srividya Angara Sinha

A responsive artist portfolio for Kuchipudi performer, choreographer, and educator Vidushi Srividya Angara Sinha.

**Website:** https://pdasika82.github.io/samaagati/

## Develop

Requires Node.js 22 or later. No packages or API keys are needed.

```sh
npm run dev
npm run check
npm run build
npm run preview
```

The local server supports `/samaagati/` to match GitHub Pages. The build produces `dist/` and validates local asset links, section anchors, dialog targets, image alternative text, and JavaScript syntax.

## Publish

The `.github/workflows/pages.yml` workflow builds and deploys every push to `main`. Set **Settings → Pages → Source** to **GitHub Actions** in this repository. Publication uses the same Actions-based approach as the Raaga project.

## Update the content

- `index.html`: biography, productions, teaching, press, and contact information.
- `styles.css`: responsive styling and self-hosted fonts.
- `app.js`: mobile navigation, production dialogs, and keyboard-accessible photo gallery.
- `assets/images/`: WebP photographs extracted from the supplied artist documents.
- `assets/documents/`: the artist profile and two production brochures.
- `assets/fonts/`: Cormorant Garamond and DM Sans, with their SIL Open Font Licenses.

The website uses the supplied professional portfolio and production brochures as its editorial source. Press excerpts retain the attributions supplied in the artist profile. The contact address and phone number come from the Samaagati brochure and artist profile. No event calendar, new performance dates, or third-party testimonials have been invented.

Photography, text, and brochures remain the property of their respective rights holders. Inclusion in this public repository does not grant a reuse license. Retain any credits embedded in photographs when replacing or adapting assets.
