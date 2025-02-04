<template>
  <v-footer class="footer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <p>&copy; 2025 SolarSparRechner. Alle Rechte vorbehalten.</p>
          <p>
            <a href="#" @click.prevent="toggleLegalNotice">Impressum</a> |
            <a href="#" @click.prevent="togglePrivacyPolicy">Datenschutz</a>
          </p>
        </v-col>
      </v-row>

      <!-- Impressum Bereich -->
      <v-expand-transition>
        <div v-if="showLegalNotice" class="legal-section">
          <h3>Impressum</h3>
          <p><strong>Firmenname:</strong> Solarrex GmbH</p>
          <p><strong>Adresse:</strong> Oberstraße 47, 52349 Düren</p>
          <p><strong>E-Mail:</strong> info@solarrex.de</p>

          <h4>Vertreten durch:</h4>
          <p>Liza Dulger</p>

          <h4>USt-ID:</h4>
          <p>DE449624973</p>

          <h4>Steuernummer:</h4>
          <p>207/5737/2539</p>

          <h4>Verantwortlich für den Inhalt:</h4>
          <p>nach § 55 Abs. 2 RStV</p>

          <h4>Haftung für Inhalte:</h4>
          <p>Die Inhalte wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.</p>

          <v-btn color="primary" class="close-btn" @click="toggleLegalNotice">Schließen</v-btn>
        </div>
      </v-expand-transition>

      <!-- Datenschutz Bereich -->
      <v-expand-transition>
        <div v-if="showPrivacyPolicy" class="legal-section">
          <h3>Datenschutzerklärung</h3>
          <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich.</p>

          <h4>1. Verantwortliche Stelle</h4>
          <p>Solarrex GmbH</p>

          <h4>2. Erhebung und Verarbeitung Ihrer Daten</h4>
          <p>Ihre Daten werden nur für die Bereitstellung unserer Dienstleistungen verwendet.</p>

          <h4>3. Kontakt</h4>
          <p>Für Fragen wenden Sie sich bitte an <a href="mailto:info@solarrex.de">info@solarrex.de</a>.</p>

          <v-btn color="primary" class="close-btn" @click="togglePrivacyPolicy">Schließen</v-btn>
        </div>
      </v-expand-transition>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      showLegalNotice: false,
      showPrivacyPolicy: false,
    };
  },
  methods: {
    toggleLegalNotice() {
      this.showLegalNotice = !this.showLegalNotice;
      this.showPrivacyPolicy = false; // Schließt Datenschutz, falls offen
    },
    togglePrivacyPolicy() {
      this.showPrivacyPolicy = !this.showPrivacyPolicy;
      this.showLegalNotice = false; // Schließt Impressum, falls offen
    },
  },
};
</script>

<style scoped>
.footer {
  background: #012a4a;
  color: white;
  padding: 20px 0;
}

.footer a {
  color: #ffcc00;
  text-decoration: none;
  cursor: pointer;
}

.footer a:hover {
  text-decoration: underline;
}

.legal-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  color: white;
  text-align: left;
}

h3 {
  color: #ffcc00;
  margin-bottom: 10px;
}

h4 {
  color: #ffdd44;
  margin-top: 10px;
  margin-bottom: 5px;
}

p {
  font-size: 14px;
  margin-bottom: 8px;
}

.close-btn {
  margin-top: 10px;
}
</style>
