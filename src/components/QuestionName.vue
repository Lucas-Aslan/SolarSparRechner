<template>
  <div class="user-input-section" aria-labelledby="solar-configurator-title">
    <v-container class="py-10 px-6" fluid>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="10" lg="8">
          <v-sheet class="input-box" elevation="4">
            <!-- Fortschrittsanzeige -->
            <div class="progress-header d-flex justify-space-between align-center">
              <span class="text-subtitle-1 font-weight-bold" id="solar-configurator-title">
                Solarkonfigurator
              </span>
              <span class="text-body-2 font-weight-medium">20% geschafft</span>
            </div>
            <v-progress-linear
              value="20"
              color="warning"
              height="8"
              rounded
              aria-label="Fortschritt: 20% geschafft"
            ></v-progress-linear>

            <!-- Begrüßung -->
            <h2 class="text-h4 font-weight-bold mt-6">Willkommen bei SolarSparRechner!</h2>
            <p class="text-body-1 mt-2">
              Bevor wir beginnen, wie heißen Sie...?
            </p>

            <!-- Eingabefeld -->
            <v-text-field
              v-model="name"
              label="Vor- und Nachname"
              placeholder="Vor- und Nachname"
              outlined
              dense
              class="input-field"
              :rules="[validateFullName]"
              required
              aria-label="Vor- und Nachname eingeben"
            ></v-text-field>

            <!-- Buttons -->
            <v-row class="mt-6 button-row">
              <v-col cols="6">
                <v-btn
                  text
                  block
                  class="action-button"
                  @click="$emit('back')"
                  aria-label="Zurück zum vorherigen Schritt"
                >
                  <v-icon left>mdi-arrow-left</v-icon> Zurück
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="warning"
                  class="action-button"
                  :disabled="!isFullNameValid"
                  @click="goNext"
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
  </div>
</template>

<script>
export default {
  name: "UserInputComponent",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    isFullNameValid() {
      const nameParts = this.name.trim().split(" ");
      return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
    },
  },
  methods: {
    validateFullName(value) {
      const nameParts = value.trim().split(" ");
      return (
        (nameParts.length >= 2 && nameParts.every(part => part.length > 0)) ||
        "Bitte geben Sie Vor- und Nachname ein."
      );
    },
    goNext() {
      if (this.isFullNameValid) {
        this.$emit("next", this.name);
      }
    },
  },
};
</script>

<style scoped>
/* Hauptbereich */
.user-input-section {
  background-color: #f8fafc;
  color: #012a4a;
  width: 100%;
  padding-top: 50px; 
}

/* Eingabebox */
.input-box {
  background-color: #ffffff; 
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Fortschrittsanzeige */
.progress-header {
  margin-bottom: 8px; 
}

/* Titel */
.text-h4 {
  color: #0c2760;
}

/* Beschreibung */
.text-body-1 {
  color: #555555;
}

/* Eingabefeld */
.input-field {
  font-size: 1rem;
  width: 100%;
}

/* Buttons */
.action-button {
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease; 
}

.action-button:hover {
  transform: scale(1.05);
}

.v-btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed; 
}

/* ----------------------
   Mobile Optimierung
----------------------- */
@media (max-width: 600px) {
  /* Gesamte Box schmaler & kompakter */
  .input-box {
    padding: 16px;
  }

  /* Fortschrittsanzeige kleiner */
  .progress-header {
    font-size: 0.9rem;
  }

  /* Titel & Beschreibung kleiner */
  .text-h4 {
    font-size: 1.4rem;
  }

  .text-body-1 {
    font-size: 0.95rem;
  }

  /* Eingabefeld kompakter */
  .input-field {
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
