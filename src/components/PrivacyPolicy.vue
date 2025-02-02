<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <v-container class="py-10">
      <v-row>
        <v-col cols="12">
          <v-card class="privacy-card">
            <v-card-title>Datenschutzerklärung</v-card-title>
            <v-card-text>
              <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften.
              </p>
              <h3>1. Verantwortliche Stelle</h3>
              <p>SonnenSparRechner GmbH</p>
  
              <h3>2. Erhebung und Verarbeitung Ihrer Daten</h3>
              <p>
                Ihre Daten werden nur für die Bereitstellung unserer Dienstleistungen verwendet.
              </p>
  
              <h3>3. Kontakt</h3>
              <p>
                Für Fragen wenden Sie sich bitte an <a href="mailto:datenschutz@sonnenspar.de">datenschutz@sonnenspar.de</a>.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "PrivacyPolicy",
  };
  </script>
  
  <style scoped>
  .privacy-card {
    padding: 20px;
    background: white;
    color: black;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  