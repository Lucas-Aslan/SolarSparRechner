<template>
  <v-container class="py-10" fluid aria-labelledby="solar-calculator-title">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold" id="solar-calculator-title">
              Solarrechner
            </span>
            <span class="text-body-2 font-weight-medium">40% geschafft</span>
          </div>
          <v-progress-linear
            value="25"
            color="warning"
            height="8"
            rounded
            aria-label="Fortschritt: 40% geschafft"
          ></v-progress-linear>

          <!-- Hauptinhalt -->
          <v-row class="mt-6">
            <v-col cols="12" md="8">
              <h2 class="text-h5 font-weight-bold">
                Willkommen bei SolarSparRechner!
              </h2>
              <p class="text-body-1 mt-2">
                Bevor wir beginnen, bitte geben Sie Ihre Postleitzahl für eine genaue Berechnung ein.
              </p>
              <v-text-field
                v-model="plz"
                label="Postleitzahl"
                placeholder="12345"
                outlined
                dense
                :rules="[validatePLZ]"
                maxlength="5"
                required
                aria-label="Postleitzahl eingeben"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-img
                alt="Illustration eines Solar-Charakters"
                class="solar-character"
                contain
              ></v-img>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <v-row class="mt-6">
            <v-col cols="6">
              <v-btn
                text
                block
                @click="$emit('back')"
                aria-label="Zurück zum vorherigen Schritt"
              >
                <v-icon left>mdi-arrow-left</v-icon> Zurück
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                class="next-btn"
                :disabled="!plzValid"
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
      plz: "",
    };
  },
  computed: {
    plzValid() {
      return this.validatePLZ(this.plz) === true;
    },
  },
  methods: {
    validatePLZ(value) {
      if (!value) {
        return "Postleitzahl ist erforderlich";
      }
      return /^[0-9]{5}$/.test(value) || "Ungültige Postleitzahl";
    },
    emitNext() {
      this.$emit("next", this.plz);
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

.v-progress-linear {
  margin-top: 8px;
}

.solar-character {
  max-width: 100%;
  margin-top: 16px; 
}

.next-btn {
  background: linear-gradient(90deg, #ffc107, #f57c00);
  color: white !important;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.next-btn:hover {
  background: linear-gradient(90deg, #f57c00, #ffc107);
  transform: scale(1.05);
}

.next-btn:disabled {
  background: #e0e0e0 !important;
  color: #9e9e9e !important;
  cursor: not-allowed;
}
</style>

  