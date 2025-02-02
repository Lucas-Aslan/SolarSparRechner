<template>
  <v-container class="py-10" fluid aria-labelledby="fahrleistung-title">
    <!-- Inhalt -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold" id="fahrleistung-title">
              Fahrleistung Konfigurator
            </span>
            <span class="text-body-2 font-weight-medium">100% geschafft</span>
          </div>
          <v-progress-linear
            value="100"
            color="warning"
            height="8"
            rounded
            aria-label="Fortschritt: 100% geschafft"
          ></v-progress-linear>

          <!-- Überschrift und Beschreibung -->
          <h2 class="text-h5 font-weight-bold mt-6">PKW Fahrleistung</h2>
          <p class="text-body-1 mt-2">
            Wie viele Kilometer werden jährlich mit den PKWs Ihres Haushalts zurückgelegt?
          </p>

          <!-- Auswahloptionen -->
          <v-row class="mt-4" dense>
            <v-col
              cols="12"
              sm="6"
              md="3"
              v-for="(option, index) in options"
              :key="index"
              aria-label="Fahrleistungsoption"
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
                  <p class="text-caption">{{ option.description }}</p>
                  <v-text-field
                    v-if="option.value === 'custom'"
                    v-model="customValue"
                    placeholder="km"
                    dense
                    outlined
                    class="custom-input mt-2"
                    aria-label="Benutzerdefinierte Kilometerzahl eingeben"
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Kein Auto Checkbox -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-checkbox
                v-model="noCar"
                label="Kein Auto berücksichtigen"
                class="no-car-checkbox"
                @change="handleNoCarChange"
                aria-label="Kein Auto berücksichtigen"
              ></v-checkbox>
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
                :disabled="!isNextEnabled"
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
      selectedOption: null,
      customValue: "",
      noCar: false,
      options: [
        { value: "7000", label: "7.000 km", description: "(1 Auto, gering)", icon: "mdi-car", color: "#012a4a" },
        { value: "12000", label: "12.000 km", description: "(1 Auto, normal)", icon: "mdi-car", color: "#012a4a" },
        { value: "20000", label: "20.000 km", description: "(1 Auto, viel)", icon: "mdi-car", color: "#012a4a" },
        { value: "custom", label: "", description: "Benutzerdefiniert", icon: "mdi-pencil", color: "#012a4a" },
      ],
    };
  },
  computed: {
    isNextEnabled() {
      return this.noCar || this.selectedOption || this.customValue.trim() !== "";
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.noCar = false;
      if (option !== "custom") this.customValue = "";
    },
    handleNoCarChange() {
      if (this.noCar) {
        this.selectedOption = null;
        this.customValue = "";
      }
    },
    emitNext() {
      const selected = this.noCar
        ? 0
        : this.selectedOption === "custom"
        ? parseInt(this.customValue)
        : parseInt(this.selectedOption);
      this.$store.commit("savings/setFahrleistung", selected || 0);
      this.$emit("next", selected);
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
  height: 150px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.choice-card:hover {
  border-color: #ffcc00; 
}

.selected-card {
  border-color: #ffc107 !important; 
  background-color: rgba(255, 193, 7, 0.1);
}

.custom-input {
  margin-top: 16px;
  width: 80%;
}

.no-car-checkbox {
  margin-top: 16px; 
}

.next-btn {
  background: linear-gradient(90deg, #ffc107, #f57c00);
  color: white !important;
}

.next-btn:hover {
  background: linear-gradient(90deg, #f57c00, #ffc107);
}

.next-btn:disabled {
  background: #e0e0e0 !important;
  color: #9e9e9e !important;
  cursor: not-allowed;
}
</style>
