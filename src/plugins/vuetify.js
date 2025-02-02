// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        primary: "#333333", // Dunkler Hintergrund für Header
        secondary: "#4CAF50", // Grüner Akzent (wie in deinem Screenshot)
        accent: "#FFFFFF", // Weiß für Text und Icons
      },
    },
  },
})