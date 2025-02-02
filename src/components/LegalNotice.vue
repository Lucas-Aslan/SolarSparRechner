<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <v-container class="impressum-container">
      <v-sheet elevation="2" class="impressum-sheet">
        <h1>Impressum</h1>
        <p>
          Angaben gemäß § 5 TMG:<br />
          **Dein Firmenname**<br />
          Musterstraße 123<br />
          12345 Musterstadt
        </p>
  
        <h2>Vertreten durch:</h2>
        <p>Max Mustermann</p>
  
        <h2>Kontakt</h2>
        <p>
          Telefon: +49 123 456789<br />
          E-Mail: info@deinefirma.de
        </p>
  
        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789</p>
  
        <h2>Verantwortlich für den Inhalt</h2>
        <p>Max Mustermann</p>
  
        <h2>Haftung für Inhalte</h2>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
  
        <v-btn color="primary" to="/">Zurück zur Startseite</v-btn>
      </v-sheet>
    </v-container>
  </template>
  
  <style scoped>
  .impressum-container {
    padding: 40px;
  }
  
  .impressum-sheet {
    max-width: 800px;
    margin: auto;
    padding: 30px;
    background: white;
    border-radius: 10px;
  }
  
  h1, h2 {
    color: #012a4a;
  }
  
  p {
    margin-bottom: 10px;
  }
  </style>
  