<template>
  <v-container class="py-10 d-flex justify-center align-center" fluid>
    <v-col cols="12" md="8" lg="6" class="text-center">
      <v-sheet class="success-box" elevation="2">
        <v-icon size="64" color="warning" class="mb-4">mdi-check-circle</v-icon>
        <h2 class="text-h5 font-weight-bold">
          Herzlichen Glückwunsch!
        </h2>
        <p class="text-body-1 mt-4">
          Ihr Dach ist ideal für eine Solaranlage geeignet
        </p>
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "SuccessScreen",
  mounted() {
    // Automatische Weiterleitung nach 3 Sekunden
    setTimeout(() => {
      this.$emit("next");
    }, 3000); // 3000 ms = 3 Sekunden
  },
};
</script>

<style scoped>
.success-box {
  background-color: #f8fafc; /* Heller Hintergrund */
  color: #012a4a; /* Hauptfarbe für Text */
  border-radius: 12px;
  padding: 48px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.v-icon {
  border-radius: 50%;
  background-color: rgba(255, 193, 7, 0.2); /* Heller Hintergrund um das Icon */
  padding: 16px;
}
</style>
