<template>
  <div class="media-recognition-section" aria-labelledby="media-title">
    <v-container fluid class="py-8">
      <!-- Überschrift -->
      <v-row class="text-center">
        <v-col cols="12">
          <h2 id="media-title" class="media-title">
            Medial bekannt aus
          </h2>
        </v-col>
      </v-row>

      <!-- Logos in Marquee -->
      <div class="logo-marquee" aria-label="Medienlogos">
        <div class="logo-track">
          <div
            v-for="(logo, index) in logos"
            :key="index"
            class="logo-item"
            role="img"
            :aria-label="logo.alt"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="media-logo"
            />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MediaRecognition",
  data() {
    return {
      logos: [
        { src: require("@/assets/n-tv.webp"), alt: "N-TV Logo" },
        { src: require("@/assets/ZDF.webp"), alt: "ZDF Logo" },
        { src: require("@/assets/N24.webp"), alt: "N24 Logo" },
        { src: require("@/assets/DieWelt.webp"), alt: "Die Welt Logo" },
        { src: require("@/assets/ZeitOnline.webp"), alt: "Zeit Online Logo" },
      ],
    };
  },
};
</script>

<style scoped>
/* Sektion-Styling */
.media-recognition-section {
  background-color: #f9f9f9;
  overflow: hidden;
  position: relative;
  padding: 20px 0;
}

/* Überschrift-Stil */
.media-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #003b65;
  margin-bottom: 20px;
  text-align: center;
}

/* Marquee-Stil (Desktop) */
.logo-marquee {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.logo-track {
  display: flex;
  /* Standard: einmaliges hereingleiten (für Desktop oder größere Bildschirme) */
  animation: slide-in 3s ease-out backwards;
}

.logo-item {
  flex: 0 0 auto;
  margin: 0 1.5rem;
}

/* Logos anpassen */
.media-logo {
  max-width: 120px;
  height: auto;
  opacity: 0.8; 
  transition: opacity 0.3s ease;
}

.media-logo:hover {
  opacity: 1;
}

/* Standard-Animation (Desktop) */
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Mobile-Anpassungen */
@media (max-width: 600px) {
  /* Für mobile Geräte soll der Logo-Track als endlos laufende Marquee animiert werden */
  .logo-track {
    /* Überschreibt die "slide-in"-Animation */
    animation: marquee 10s linear infinite;
  }
}

/* Marquee-Animation für mobile Geräte */
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
