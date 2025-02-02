<template>
  <div class="consultation-section">
    <v-container fluid>
      <v-row align="center" justify="space-between">
        <!-- Linker Bereich: Überschrift/Text -->
        <v-col cols="12" md="8">
          <h2 class="consultation-title">
            Lass dich jetzt von einem unserer regionalen<br />
            Handwerksbetriebe individuell beraten:
          </h2>
          <p class="consultation-description">
            Unsere regionalen Partnerbetriebe stehen dir für eine individuelle Beratung rund um deine Solaranlage zur Verfügung – kompetent, unverbindlich und kostenlos.
          </p>
        </v-col>

        <!-- Rechter Bereich: Button -->
        <v-col cols="12" md="4" class="text-md-right text-center mt-4 mt-md-0">
          <v-btn
            large
            class="consultation-btn"
            @click="scrollToSection('free-consultation-form')"
            aria-label="Unverbindliche Beratung anfragen"
          >
            Jetzt unverbindlich beraten lassen!
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ConsultationSection",
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style scoped>
/* Standard-Styling */
.consultation-section {
  background-color: #0c2760; /* Dunkler Hintergrund */
  border-radius: 16px; /* Abgerundete Ecken */
  margin: 24px 0; /* Außenabstand */
  padding: 50px 0; /* Innenabstand */
  color: #ffffff; /* Weißer Text */
  text-align: left;
}

.consultation-title {
  font-size: 1.8rem; /* Etwas größere Schriftgröße */
  font-weight: 600; /* Halb-fett */
  line-height: 1.4; /* Gute Zeilenhöhe */
  margin-bottom: 16px; /* Abstand unterhalb des Titels */
}

.consultation-description {
  font-size: 1.2rem; /* Lesbare Schriftgröße */
  color: #d0d0d0; /* Leicht hellgrau */
  margin-top: 8px;
  line-height: 1.6;
}

.consultation-btn {
  background-color: #26ba24 !important; /* Türkis für Button */
  color: #ffffff !important;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 18px;
  transition: background-color 0.3s ease;
  padding: 12px 24px;
}

.consultation-btn:hover {
  background-color: #1aa496 !important;
}

/* Mobile Responsive Anpassungen */
@media (max-width: 600px) {
  .consultation-section {
    padding: 30px 15px;  /* Weniger vertikales Padding, etwas horizontaler Abstand */
    text-align: center;  /* Text zentriert für bessere Lesbarkeit */
  }
  .consultation-title {
    font-size: 1.5rem; /* Überschrift etwas kleiner */
    margin-bottom: 12px;
  }
  .consultation-description {
    font-size: 1rem; /* Beschreibung verkleinert */
    margin-top: 8px;
  }
  .consultation-btn {
    font-size: 0.9rem; /* Button-Text verkleinert */
    padding: 10px 20px; /* Reduziertes Padding */
    width: 100%; /* Button nimmt die volle Breite ein */
  }
}
</style>
