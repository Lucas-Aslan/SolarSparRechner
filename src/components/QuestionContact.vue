<template>
  <v-container class="py-10" fluid aria-labelledby="funnel-title">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold" id="funnel-title">
              Solarkonfigurator
            </span>
            <span class="text-body-2 font-weight-medium">Letzter Schritt</span>
          </div>
          <v-progress-linear
            value="100"
            color="warning"
            height="8"
            rounded
            aria-label="Fortschritt: Letzter Schritt"
          ></v-progress-linear>

          <!-- Hauptinhalt -->
          <v-row class="mt-6">
            <v-col cols="12">
              <h2 class="text-h5 font-weight-bold">Ihre Kontaktdaten</h2>
              <p class="text-body-1 mt-2">
                Bitte geben Sie Ihre E-Mail-Adresse und Telefonnummer für Rückfragen ein.
              </p>
            </v-col>
          </v-row>

          <!-- Eingabefelder -->
          <v-row class="mt-4">
            <!-- E-Mail -->
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
                aria-label="Eingabefeld für die E-Mail-Adresse"
              ></v-text-field>
            </v-col>

            <!-- Telefonnummer -->
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
                aria-label="Eingabefeld für die Telefonnummer"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <v-row class="mt-6">
            <v-col cols="6">
              <v-btn text block @click="$emit('back')" aria-label="Zurück zum vorherigen Schritt">
                <v-icon left>mdi-arrow-left</v-icon> Zurück
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                class="next-btn"
                :disabled="!emailAndPhoneValid"
                @click="emitNext"
                aria-label="Weiter zum nächsten Schritt"
              >
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
export default {
  data() {
    return {
      phoneNumber: "",
      email: "",
    };
  },
  computed: {
    emailAndPhoneValid() {
      return (
        this.validateEmail(this.email) === true &&
        this.validatePhone(this.phoneNumber) === true
      );
    },
  },
  methods: {
    validatePhone(value) {
      return (
        /^\+?[0-9 ]+$/.test(value) || "Ungültige Telefonnummer"
      );
    },
    validateEmail(value) {
      return (
        /^([a-zA-Z0-9._-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
        "Ungültige E-Mail-Adresse"
      );
    },
    emitNext() {
      const contactData = {
        email: this.email,
        phoneNumber: this.phoneNumber,
      };
      this.$emit("next", contactData);
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
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.next-btn:hover {
  transform: scale(1.05);
}

.next-btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e !important;
}
</style>

