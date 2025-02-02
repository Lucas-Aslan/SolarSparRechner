<template>
  <v-container class="py-10" fluid aria-labelledby="funnel-title">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold" id="funnel-title">
              Solarrechner
            </span>
            <span class="text-body-2 font-weight-medium">80% geschafft</span>
          </div>
          <v-progress-linear
            value="50"
            color="warning"
            height="8"
            rounded
            aria-label="Fortschritt: 80% geschafft"
          ></v-progress-linear>

          <!-- Hauptinhalt -->
          <v-row class="mt-6">
            <v-col cols="12">
              <h2 class="text-h5 font-weight-bold">Dachtyp</h2>
              <p class="text-body-1 mt-2">
                Welchen Dachtyp hat Ihr Gebäude? Wählen Sie die Option, die auf Ihr Gebäude zutrifft.
              </p>
            </v-col>
          </v-row>

          <!-- Optionen -->
          <v-row class="mt-4" dense>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(option, index) in options"
              :key="index"
              aria-label="Dachtyp Option"
            >
              <v-card
                outlined
                class="choice-card"
                :class="{ 'selected-card': selectedOption === option.value }"
                @click="selectOption(option.value)"
                role="button"
                :aria-pressed="selectedOption === option.value"
              >
                <v-row class="d-flex align-center justify-center">
                  <v-icon :color="option.color" large>{{ option.icon }}</v-icon>
                </v-row>
                <v-card-text>
                  <h3 class="text-h6 font-weight-bold">{{ option.label }}</h3>
                </v-card-text>
              </v-card>
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
                :disabled="!selectedOption"
                @click="$emit('next', selectedOption)"
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
      selectedOption: null, // Keine Standardoption
      options: [
        { value: "schraeg", label: "Schrägdach", icon: "mdi-home-roof", color: "#012a4a" },
        { value: "flach", label: "Flachdach", icon: "mdi-home-outline", color: "#012a4a" },
        { value: "unsicher", label: "Unsicher", icon: "mdi-help-circle", color: "#012a4a" },
      ],
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
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

.choice-card {
  cursor: pointer; 
  text-align: center;
  transition: 0.3s ease; 
  padding: 16px; 
  border: 1px solid #e0e0e0; 
}

.choice-card:hover {
  border-color: #ffcc00; 
}

.selected-card {
  border-color: #ffc107 !important; 
  background-color: rgba(255, 193, 7, 0.1); 
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

