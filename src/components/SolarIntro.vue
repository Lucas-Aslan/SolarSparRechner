<template>
  <v-container class="py-10" fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="intro-box" elevation="2">
          <!-- Fortschrittsanzeige -->
          <div class="progress-header d-flex justify-space-between align-center">
            <span class="text-subtitle-1 font-weight-bold">Solarrechner</span>
            <span class="text-body-2 font-weight-medium">Start</span>
          </div>
          <v-progress-linear 
            :value="Start" 
            :color="progressColor" 
            height="8" 
            rounded>
          </v-progress-linear>

          <!-- Hauptinhalt -->
          <v-row class="mt-6 align-center">
            <!-- Textbereich -->
            <v-col cols="12" md="6">
              <h2 class="text-h5 font-weight-bold">
                Entdecken Sie das Potenzial <span class="highlight">Ihrer Solaranlage!</span>
              </h2>
              <p class="text-body-1 mt-4">
                Erfahren Sie in wenigen Minuten, wie viel Sie mit einer Solaranlage auf Ihrem Dach sparen können.
              </p>
              <ul class="benefits-list">
                <li>
                  <v-icon color="success" left>mdi-check-circle</v-icon>
                  Kostenlos und unverbindlich
                </li>
                <li>
                  <v-icon color="success" left>mdi-check-circle</v-icon>
                  Individuelle Analyse
                </li>
                <li>
                  <v-icon color="success" left>mdi-check-circle</v-icon>
                  0€ Anzahlung
                </li>
              </ul>
              <v-btn
                block
                color="warning"
                class="mt-6"
                large
                @click="startConfiguration"
              >
                Jetzt Loslegen
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
              <div class="mt-2 text-caption">
                <v-icon left size="18">mdi-clock-outline</v-icon> Dauert nur 2 Minuten
              </div>
            </v-col>

            <!-- Bildbereich (Nur auf Desktop sichtbar) -->
            <v-col cols="12" md="6" class="d-none d-md-flex justify-center align-center text-center">
              <v-img
                src="@/assets/Laptop_Design.webp"
                alt="Laptop mit Solar-Konfiguration"
                class="laptop-image"
              ></v-img>
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
      progressColor: 'warning',
      Start: 50, // Fortschritt
    };
  },
  methods: {
    startConfiguration() {
      this.$emit("start");
    },
  },
};
</script>

<style scoped>
.intro-box {
  background-color: #012a4a;
  color: white;
  border-radius: 12px;
  padding: 0 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.progress-header {
  margin-bottom: 8px;
}

.highlight {
  color: #ffc107;
}

.benefits-list {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

/* Laptop Bild */
.laptop-image {
  width: 100%;
  height: auto;
  max-width: 750px;
  object-fit: contain;
}

/* ----------------------
   Mobile Responsive
----------------------- */
@media (max-width: 600px) {
  /* Box-Padding anpassen */
  .intro-box {
    padding: 16px;
  }
  
  /* Textgrößen leicht reduzieren */
  .text-h5 {
    font-size: 1.2rem;
  }
  .text-body-1 {
    font-size: 1rem;
  }
  .benefits-list li {
    font-size: 0.9rem;
  }

  /* Laptop-Bild komplett ausblenden */
  .laptop-image {
    display: none !important;
  }
}
</style>
