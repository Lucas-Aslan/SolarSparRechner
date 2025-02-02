<template>
  <v-container
    class="py-10 d-flex justify-center align-center"
    fluid
    aria-live="polite"
    aria-busy="true"
  >
    <v-col cols="12" md="8" lg="6" class="text-center">
      <v-sheet class="loading-box" elevation="2">
        <!-- Fortschrittsanzeige -->
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          class="mb-6"
          aria-label="Berechnung läuft..."
        ></v-progress-circular>
        <!-- Titel -->
        <h2 class="text-h5 font-weight-bold">
          Einen Moment bitte, wir berechnen Ihre Solaranlage...
        </h2>
        <!-- Beschreibung -->
        <p class="text-body-1 mt-4">
          Im nächsten Schritt sehen Sie eine erste Schätzung.
        </p>
      </v-sheet>
    </v-col>
  </v-container>
</template>

  
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$emit("next");
    }, 3000);
  },
};
</script>

  
<style scoped>
/* Container-Styling */
.loading-box {
  background-color: #f8fafc;
  color: #012a4a; 
  border-radius: 12px; 
  padding: 48px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

/* Fortschrittsanzeige */
.v-progress-circular {
  margin-bottom: 24px;
}
</style>

  