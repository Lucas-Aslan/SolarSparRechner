<template>
  <v-container class="py-10 px-4" fluid>
    <!-- Inhalt -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold">Stromkonfigurator</span>
            <span class="text-body-2 font-weight-medium">60% geschafft</span>
          </div>
          <v-progress-linear value="60" color="warning" height="8" rounded></v-progress-linear>

          <h2 class="text-h5 font-weight-bold mt-6">Stromverbrauch</h2>
          <p class="text-body-1 mt-2">
            Wie viel Strom verbraucht Ihr Haushalt ungefähr im Jahr?
          </p>

          <!-- Auswahloptionen -->
          <v-row class="mt-4 option-container">
            <v-col
              cols="12"
              sm="6"
              md="3"
              v-for="(option, index) in options"
              :key="index"
            >
              <v-card
                outlined
                class="choice-card"
                :class="{ 'selected-card': selectedOption === option.value }"
                @click="selectOption(option.value)"
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
                    placeholder="kWh"
                    dense
                    outlined
                    class="custom-input mt-2"
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Buttons -->
          <v-row class="mt-6 button-row">
            <v-col cols="6">
              <v-btn text block class="action-button" @click="$emit('back')">
                <v-icon left>mdi-arrow-left</v-icon> Zurück
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                class="next-btn"
                :disabled="!isOptionValid"
                @click="goNext"
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
      selectedOption: "",
      customValue: "",
      options: [
        { value: "2000", label: "2.000 kWh", description: "(1-2 Personen)", icon: "mdi-flash", color: "#012a4a" },
        { value: "4500", label: "4.500 kWh", description: "(3-4 Personen)", icon: "mdi-flash", color: "#012a4a" },
        { value: "6000", label: "6.000 kWh", description: "(5+ Personen)", icon: "mdi-flash", color: "#012a4a" },
        { value: "custom", label: "", description: "Benutzerdefiniert", icon: "mdi-pencil", color: "#012a4a" },
      ],
    };
  },
  computed: {
    isOptionValid() {
      if (this.selectedOption === "custom") {
        return this.customValue.trim() !== "";
      }
      return !!this.selectedOption;
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      if (option !== "custom") this.customValue = "";
    },
    goNext() {
      if (this.isOptionValid) {
        const selected = this.selectedOption === "custom"
          ? parseInt(this.customValue)
          : parseInt(this.selectedOption);

        this.$store.commit("savings/setStromverbrauch", selected);
        this.$emit("next", selected);
      }
    },
  },
};
</script>

<style scoped>
/* Box */
.funnel-box {
  background-color: #f8fafc;
  color: #012a4a;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Fortschrittsanzeige */
.progress-header {
  margin-bottom: 8px;
}

/* Auswahl-Karten */
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
  padding-top: 24px;
}

.choice-card .v-icon {
  margin-bottom: 12px;
}

.choice-card:hover {
  border-color: #ffcc00;
}

.selected-card {
  border-color: #ffc107 !important;
  background-color: rgba(255, 193, 7, 0.1);
}

/* Custom Input */
.custom-input {
  margin-top: 16px;
  width: 100%;
}

/* Buttons */
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

/* ----------------------
   Mobile Optimierung
----------------------- */
@media (max-width: 600px) {
  /* Gesamte Box schmaler & kompakter */
  .funnel-box {
    padding: 16px;
  }

  /* Fortschrittsanzeige kleiner */
  .progress-header {
    font-size: 0.9rem;
  }

  /* Titel & Beschreibung kleiner */
  .text-h5 {
    font-size: 1.3rem;
  }

  .text-body-1 {
    font-size: 1rem;
  }

  /* Auswahl-Karten */
  .option-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .choice-card {
    width: 100%;
    height: auto;
    padding: 12px;
    margin-bottom: 10px;
  }

  .choice-card .v-icon {
    font-size: 2rem;
  }

  /* Eingabefeld */
  .custom-input {
    font-size: 0.9rem;
    padding: 8px;
  }

  /* Buttons enger platzieren */
  .button-row {
    margin-top: 16px;
  }

  .action-button {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
}
</style>
