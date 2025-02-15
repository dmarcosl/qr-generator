import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      title: 'Generador de Códigos QR',
      description: 'Genera códigos QR personalizados para cualquier URL. Personaliza colores, añade imágenes y más.',
      urlPlaceholder: 'Introduce una URL',
      qrColor: 'Color del QR',
      bgColor: 'Color de fondo',
      logoUpload: 'Logo central',
      border: 'Borde',
      qrText: 'Texto debajo del QR',
      textPlaceholder: 'Texto opcional',
      download: 'Descargar QR',
      showBorder: 'Mostrar borde',
      borderWidth: 'Grosor del borde',
      margin: 'Margen',
    }
  },
  en: {
    translation: {
      title: 'QR Code Generator',
      description: 'Generate custom QR codes for any URL. Customize colors, add images and more.',
      urlPlaceholder: 'Enter a URL',
      qrColor: 'QR Color',
      bgColor: 'Background Color',
      logoUpload: 'Center Logo',
      border: 'Border',
      qrText: 'Text below QR',
      textPlaceholder: 'Optional text',
      download: 'Download QR',
      showBorder: 'Show border',
      borderWidth: 'Border width',
      margin: 'Margin',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 