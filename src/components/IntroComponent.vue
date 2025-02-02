<template>
  <div class="new-section" aria-labelledby="solar-calculator-title">
    <v-container class="py-10 px-6" fluid>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="10" lg="8">
          <v-sheet class="info-box" elevation="4">
            <!-- Hintergrundbild -->
            <v-img
              src="@/assets/solarbild.jpg"
              alt="Solaranlage auf einem Hausdach"
              class="background-image"
              cover
            ></v-img>

            <!-- Text und Inhalt -->
            <div class="content-overlay">
              <v-icon
                size="72"
                color="warning"
                class="mb-4"
                aria-hidden="true"
              >
                mdi-information-outline
              </v-icon>
              <h1 id="solar-calculator-title" class="text-h4 font-weight-bold">
                Solarrechner für PV Anlagen
              </h1>
              <p class="text-body-1 mt-4">
                Willkommen bei unserem kostenfreien Online-Solarrechner! Mit
                dem <b>SonnenSparRechner</b> können Sie direkt herausfinden,
                welche Solaranlage für Sie geeignet ist und wie viel Sie pro
                Monat sparen können. Nutzen Sie auch unseren
                <b>Unabhängigkeitsrechner</b>, um Ihren Autarkiegrad und
                Eigenverbrauch berechnen zu lassen.
              </p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

  
<style scoped>
/* Hauptbereich */
.new-section {
  background-color: #0c2760; 
  color: white; 
  width: 100%; 
  padding-top: 50px; 
  padding-bottom: 50px; 
}

/* Info-Box */
.info-box {
  position: relative;
  border-radius: 16px; 
  padding: 32px; 
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); 
  text-align: center;
  overflow: hidden;
}

/* Hintergrundbild */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.5; 
  filter: brightness(45%); 
}

/* Text-Overlay */
.content-overlay {
  position: relative;
  z-index: 2;
  color: white;
}

/* Überschrift */
.text-h4 {
  color: #ffffff; 
  font-size: 2rem; 
  margin-bottom: 16px; 
}

/* Beschreibungstext */
.text-body-1 {
  color: #d1d1d1;
  font-size: 1.1rem; 
  margin-bottom: 16px;
  line-height: 1.6; 
}
</style>

