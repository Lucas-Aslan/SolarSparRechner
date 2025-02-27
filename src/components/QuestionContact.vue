<template>
  <v-container class="py-10" fluid aria-labelledby="funnel-title">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold" id="funnel-title">Solarkonfigurator</span>
            <span class="text-body-2 font-weight-medium">Letzter Schritt</span>
          </div>
          <v-progress-linear value="100" color="warning" height="8" rounded></v-progress-linear>

          <v-row class="mt-6">
            <v-col cols="12">
              <h2 class="text-h5 font-weight-bold">Ihre Kontaktdaten</h2>
              <p class="text-body-1 mt-2">Bitte geben Sie Ihre E-Mail-Adresse und Telefonnummer für Rückfragen ein.</p>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                label="E-Mail-Adresse"
                placeholder="example@mail.com"
                outlined
                dense
                :rules="[validateEmail]"
                required
                prefix="✉️"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="phoneNumber"
                label="Telefonnummer"
                placeholder="+49 123 456789"
                outlined
                dense
                :rules="[validatePhone]"
                required
                prefix="📞"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-6">
            <v-col cols="6">
              <v-btn text block @click="$emit('back')">
                <v-icon left>mdi-arrow-left</v-icon> Zurück
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block class="next-btn" :disabled="!emailAndPhoneValid" @click="emitNext">
                Weiter <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["funnelData"], // Erhält die bisher gesammelten Daten aus SolarFunnel.vue
  data() {
    return {
      phoneNumber: this.funnelData.phoneNumber || "",
      email: this.funnelData.email || "",
    };
  },
  computed: {
    emailAndPhoneValid() {
      return this.validateEmail(this.email) === true && this.validatePhone(this.phoneNumber) === true;
    },
  },
  methods: {
    validatePhone(value) {
      return /^\+?[0-9 ]+$/.test(value) || "Ungültige Telefonnummer";
    },
    validateEmail(value) {
      return /^([a-zA-Z0-9._-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Ungültige E-Mail-Adresse";
    },
    emitNext() {
      // Vereinige die vorhandenen Funnel-Daten mit den aktuellen Kontaktangaben
      const fullFunnelData = {
        ...this.funnelData,
        email: this.email,
        phoneNumber: this.phoneNumber,
        street: this.funnelData.street || '',
        houseNumber: this.funnelData.houseNumber || '',
        postalCode: this.funnelData.postalCode || '',
        city: this.funnelData.city || '',
      };

      // Sende zuerst an den Funnel-Endpunkt ...
      axios
        .post("http://159.69.243.29:3000/api/submitFunnel", fullFunnelData)
        .then((funnelResponse) => {
          console.log("Funnel Erfolg:", funnelResponse.data);
          // ... und anschließend an den Kontakt-Endpunkt
          return axios.post("http://159.69.243.29:3000/api/submitContact", fullFunnelData);
        })
        .then((contactResponse) => {
          console.log("Contact Erfolg:", contactResponse.data);
          alert("Daten erfolgreich versendet!");
          this.$emit("next", fullFunnelData);
        })
        .catch((error) => {
          console.error("Fehler:", error);
          alert("Fehler beim Versenden der Daten");
        });
    },
  },
};
</script>

<style scoped>
.funnel-box {
  background-color: #f8fafc;
  color: #012a4a;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.progress-header {
  margin-bottom: 8px;
}

.next-btn {
  background: linear-gradient(90deg, #ffc107, #f57c00);
  color: white !important;
  font-weight: bold;
}

.next-btn:hover {
  transform: scale(1.05);
}

.next-btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e !important;
}
</style>
