<template>
  <v-container class="py-10" fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="info-box" elevation="2">
          <v-row>
            <v-col>
              <h1 class="text-h6 font-weight-bold">
                Ihre <span class="highlight">Individuelle</span> Analyse
              </h1>
              <p class="text-body-2">
                Erfahren Sie mehr über die für Sie empfohlene Photovoltaikanlage, Ihre monatliche Ersparnis und langfristige Vorteile.
              </p>
            </v-col>
          </v-row>

          <v-row class="mt-6" dense>
            <v-col cols="6">
              <v-card class="info-card text-center" elevation="1">
                <v-icon
                  class="independence-icon"
                  color="yellow"
                  size="48"
                  aria-label="Empfohlene PV-Leistung"
                >
                  mdi-chart-donut
                </v-icon>
                <h2 class="text-h4 font-weight-bold mt-3">{{ photovoltaikLeistung }} kWp</h2>
                <p class="text-subtitle-2">
                  Empfohlene PV-Leistung für Ihre Solaranlage
                </p>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card class="info-card text-center justify-center align-center" elevation="1">
                <div>
                  <v-icon color="green" size="50" aria-label="Ersparnis">mdi-arrow-down-bold</v-icon>
                  <h2 class="text-h4 font-weight-bold text-success mt-3">
                    {{ monatlicheErsparnis.toFixed(2) }} €
                  </h2>
                  <p class="text-subtitle-2">Erwartete Ersparnis pro Monat</p>
                  <p class="text-subtitle-2">
                    Ersparnis in 20 Jahren: <b>{{ ersparnisIn20Jahren.toFixed(2) }} €</b>
                  </p>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-6" dense>
            <v-col cols="12" md="6">
              <v-card class="consultation-card d-flex" style="height: 100%;">
                <div class="consultation-left">
                  <v-icon
                    color="yellow"
                    size="36"
                    class="mr-2"
                    aria-label="Profi-Check"
                  >
                    mdi-shield-check
                  </v-icon>
                  <span class="font-weight-bold text-white text-h6">Solarrex • Profi Check</span>
                  <p class="text-white text-subtitle-2 mt-2">
                    Nach Ihrem Beratungsgespräch prüfen unsere Experten vor Ort alle Details für ein präzises Angebot.
                  </p>
                  <ul class="text-white text-subtitle-2">
                    <li class="d-flex align-center">
                      <v-icon color="green" size="20" class="mr-2" aria-hidden="true">
                        mdi-check-circle
                      </v-icon>
                      Kostenlos und unverbindlich
                    </li>
                    <li class="d-flex align-center">
                      <v-icon color="green" size="20" class="mr-2" aria-hidden="true">
                        mdi-check-circle
                      </v-icon>
                      Detaillierte Ersparnisberechnung
                    </li>
                    <li class="d-flex align-center">
                      <v-icon color="green" size="20" class="mr-2" aria-hidden="true">
                        mdi-check-circle
                      </v-icon>
                      Individuelles Angebot
                    </li>
                  </ul>
                  <v-btn color="warning" large block class="mt-4 beratung-button" @click="openConfirmationDialog">
                    Beratungsgespräch sichern
                  </v-btn>
                </div>
                <div class="consultation-right text-center d-flex align-center justify-center">
                  <div>
                    <div class="circle-badge mb-3">
                      <span class="circle-text">Im Wert von</span>
                      <h2 class="circle-value">300 €</h2>
                    </div>
                    <v-img
                      src="@/assets/person.webp"
                      alt="Experte für Solarberatung"
                      class="consultation-image mt-2"
                      lazy-src="@/assets/person.webp"
                    />
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card class="info-card" style="height: 100%;">
                <v-img
                  src="@/assets/products.webp"
                  alt="Solar Produkte"
                  class="full-width-image"
                  height="150px"
                  lazy-src="@/assets/products.webp"
                ></v-img>
                <div class="mt-4">
                  <p class="text-subtitle-2 font-weight-bold">Monatliche Rate</p>
                  <div class="d-flex align-center justify-between">
                    <p class="blur-box mr-4">
                      <span>ca. zensiert €/Monat</span>
                    </p>
                    <v-btn
                      color="warning"
                      class="btn-orange"
                      @click="openConfirmationDialog"
                    >
                      Jetzt Angebot erhalten!
                    </v-btn>
                  </div>
                  <p class="text-subtitle-2 font-weight-bold mt-4">Gesamtpreis</p>
                  <div class="d-flex align-center justify-between">
                    <p class="blur-box mr-4">
                      <span>zensiert €</span>
                    </p>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-subtitle-2 font-weight-bold">Erwartete Ersparnis über 25 Jahre</p>
                  <h2 class="text-h4 font-weight-bold text-success">
                    {{ ersparnisIn25Jahren.toFixed(2) }} €
                  </h2>
                </div>
                <v-btn text color="primary" block class="mt-2" @click="openDialog">
                  Komponenten anzeigen
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="showConfirmationDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Vielen Dank!</v-card-title>
        <v-card-text>
          Einer unserer zertifizierten Energieberater wird Sie in den nächsten 48 Stunden kontaktieren.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showConfirmationDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <MaterialComponent v-model="showDialog" />
  </v-container>
</template>



<script>
import axios from "axios";
import { mapGetters } from "vuex";
import MaterialComponent from "./MaterialComponent.vue";

export default {
  components: {
    MaterialComponent,
  },

  props: {
    funnelData: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      showDialog: false,
      showConfirmationDialog: false, // Status für den Dialog
    };
  },
  computed: {
    ...mapGetters("savings", [
      "monatlicheErsparnis",
      "ersparnisIn20Jahren",
      "photovoltaikLeistung",
    ]),
    ersparnisIn25Jahren() {
      return this.monatlicheErsparnis * 12 * 25; // 25 Jahre
    },
  },
  methods: {

        /**
     * Wird aufgerufen, wenn der User auf den Button klickt.
     * Du kannst hier deine funnelData per POST an dein Backend schicken.
     */
     openConfirmationDialog() {
      this.showConfirmationDialog = true;

    //  trackButtonClick(buttonName) {
    //   console.log("User clicked on:", buttonName);

      // Beispielhafter POST-Request an dein Backend
      // Passe die URL an deine IP/Domain + Port an
      axios
        .post("http://159.69.243.29:3000/api/submitFunnel", this.funnelData)
        // .then((response) => {
        //   console.log("Erfolg:", response.data);
        //   alert("Daten erfolgreich versendet!");
        //   // Hier könntest du ggf. navigieren oder Felder leeren
        // })
        .catch((error) => {
          console.error("Fehler:", error);
          alert("Fehler beim Versenden der Daten");
        });
    },
    openDialog() {
      this.showDialog = true; // Öffnet den Dialog
    },
  },
};
</script>


<style scoped>
.info-box {
  background-color: #f8fafc;
  color: #012a4a;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.info-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.full-width-image {
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.small-image {
  width: 48px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.consultation-card {
  display: flex;
  justify-content: space-between; /* Abstand zwischen links und rechts */
  align-items: stretch; /* Höhe anpassen */
  background-color: #012a4a;
  color: white;
  padding: 24px;
  border-radius: 12px;
  gap: 16px; /* Einheitliche Abstände zwischen den Bereichen */
}




.consultation-right {
  flex: 0.4; /* Passt Breite des rechten Bereichs an */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; /* Inhalte gleichmäßig verteilen */
}

.circle-badge {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #012a4a;
  font-weight: bold;
  margin-bottom: 16px;
}

.consultation-image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}


.circle-text {
  font-size: 12px; /* Kleinere Schriftgröße */
  margin: 0;
}

.circle-value {
  font-size: 24px; /* Etwas größere Schrift */
  margin-top: -4px;
}

.consultation-image {
  width: 64px; /* Kleinere Bildgröße */
  height: 64px;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.consultation-left {
  padding-right: 16px; /* Abstand zum rechten Bereich */
}

.consultation-card {
  gap: 12px; /* Abstand zwischen links und rechts */
}



.text-success {
  color: #28a745;
}

.ml-4 {
  margin-left: 16px;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-center {
  text-align: center;
}

.blur-box {
  display: inline-block;
  background-color: rgba(0, 0, 255, 0.2); /* Blau mit Transparenz */
  padding: 4px 8px;
  border-radius: 4px;
  filter: blur(4px); /* Unscharfer Effekt */
  color: transparent; /* Text wird unsichtbar */
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5); /* Text scheint durch */
  transition: filter 0.3s ease, color 0.3s ease;
}

.blur-box:hover {
  filter: blur(0); /* Entfernt Blur beim Hover */
  color: black; /* Zeigt Text beim Hover */
}

.btn-orange {
  background-color: #ff9800 !important; /* Orange */
  color: white !important;
  text-transform: none !important; /* Entfernt Großschreibung */
  font-weight: bold !important;
}

.consultation-left .v-btn {
  padding: 8px 16px !important; /* Weniger Innenabstand */
  font-size: 14px !important; /* Kleinere Schriftgröße */
  min-height: 36px !important; /* Reduzierte Mindesthöhe */
}

.beratung-button {
  padding: 8px 16px !important;
  font-size: 14px !important;
  min-height: 36px !important;
}


</style>
