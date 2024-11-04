
# Application Language Settings

This document outlines the language settings for the application, detailing how localization works and the importance of the Vite configuration base path.

## Localization Files

The application supports multiple languages, and localization is managed through JSON files located in the `/locales` directory. Currently, the following languages are supported:

- **German (`de.json`)**
- **French (`fr.json`)**
- **English (`en.json`)**

### Example: German Localization (`de.json`)

The German localization file includes various translations and structured entries, such as the disclaimer and navigation links. Below is an example of the content within `de.json`:

```json
{
  "loading": "Lade Applikation...",
  "disclaimer": {
    "title": "Disclaimer -Deutsch",
    "text": "Die Informationen, die von diesem Chatbot bereitgestellt werden, dienen ausschließlich zu Informationszwecken. Der Chatbot ist ein automatisiertes System und bietet Antworten basierend auf den eingegebenen Fragen und den verfügbaren Daten.\n\nBitte beachten Sie die folgenden Punkte:\n\nKeine professionelle Beratung: Die Informationen des Chatbots ersetzen keine professionelle Beratung, sei es rechtlicher, medizinischer, finanzieller oder anderer Art. Bei spezifischen Anliegen sollten Sie sich an qualifizierte Fachkräfte wenden.\n\nKeine Gewährleistung: Obwohl wir uns bemühen, genaue und aktuelle Informationen bereitzustellen, können wir keine Gewähr für die Vollständigkeit, Richtigkeit oder Aktualität der bereitgestellten Inhalte übernehmen.\n\nNutzung auf eigenes Risiko: Die Nutzung der Informationen und Antworten, die Sie von diesem Chatbot erhalten, erfolgt auf eigenes Risiko. Wir haften nicht für Verluste oder Schäden, die aus der Nutzung oder dem Vertrauen auf die bereitgestellten Informationen entstehen.\n\nDatenschutz: Bitte beachten Sie, dass persönliche Daten, die Sie in den Chat eingeben, möglicherweise gespeichert oder verarbeitet werden. Lesen Sie unsere Datenschutzrichtlinien, um mehr über den Umgang mit Ihren Daten zu erfahren.\n\nDurch die Nutzung dieses Chatbots stimmen Sie diesen Bedingungen zu.",
    "accept": "Verstanden!"
  },
  "navigation": {
    "title": "Nützliche Links",
    "links": [
      {
        "title": "Über uns - Spitalhygiene",
        "link": "https://infektiologie.insel.ch/de/ueber-uns/spitalhygiene"
      },
      {
        "title": "Hygieneordner",
        "link": "https://qm.insel.ch/hygieneordner/"
      },
      {
        "title": "Kontakt",
        "link": "mailto:spitalhygiene@insel.ch"
      }
    ]
  }
}
```

### Links Structure

The `navigation` object includes a `links` array, which allows for an arbitrary number of entries as long as they are correctly formatted in the JSON. Each link entry should include a `title` and a `link`.

## Vite Configuration Base Path

In Vite, the `base` option in the configuration file specifies the base public path for the application. This is crucial when deploying the app in subdirectories. Here’s an example of how it’s defined in `vite.config.js`:

It must be set to the correct path when deploying the application to a subdirectory. For example, if the application is deployed to `https://example.com/chat/`, the base path should be set to `/chat/`.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Adjust the base path for deployment
export default defineConfig({
  plugins: [react()],
  base: '/chat/', // This sets the base path for your app
});
```

## Generating a New Build
After making changes to the application, you need to generate a new build to deploy the updated version. The build process compiles the application and generates the necessary files for deployment.
To generate a new build of your application, use the following command in your terminal:

```bash
npm run build
```

This command will compile the application and place the build files in the `dist` directory.

### Location of Build Files

After running the build command, you will find the generated files in the `dist` folder of your project. These files need to be deployed to your production server. The key files to include in your deployment are:

- **index.html**: The main HTML file for your application.
- **assets/**: This folder contains the bundled JavaScript, CSS, and any static assets used by your application, including the localization files.

When deploying, ensure that the assets folder and `index.html` are placed in the correct directory on your production server to match the configured base path.
