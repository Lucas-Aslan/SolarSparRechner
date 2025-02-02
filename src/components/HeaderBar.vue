<template>
  <!-- NEWS-TICKER -->
  <div class="news-ticker">
    <div class="ticker-content">
      +++ Netzwelt und RedaktionsNetzwerk Deutschland 14./15.01.2025: "Panikkäufe erwartet: Förderung für Balkonkraftwerke und PV-Anlagen vor dem Aus? Wie Betroffene reagieren" +++
    </div>
  </div>
  
  <v-app-bar app color="primary" dark class="header-bar">
    <!-- Linke Seite: Hamburger (nur mobil) und Logo -->
    <div class="header-left d-flex align-center" aria-label="Logo und Menü">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
        aria-label="Menü öffnen"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="logo-title" aria-label="SolarSparRechner Logo und Titel">
        <img :src="require('@/assets/SolarLogo.webp')" alt="Logo" height="40" class="mr-2" />
        <span class="font-weight-bold"></span>
      </v-toolbar-title>
    </div>
    
    <!-- Desktop-Navigation -->
    <nav class="nav-container d-none d-md-flex" aria-label="Hauptnavigation">
      <v-btn
        text
        class="nav-btn"
        @click="scrollToSection('arguments-section')"
        aria-label="Vorteile der Solaranlage ansehen"
      >
        Vorteile
      </v-btn>
      <v-btn
        text
        class="nav-btn"
        @click="scrollToSection('free-consultation-form')"
        aria-label="Kostenloses Beratungsgespräch anfordern"
      >
        Beratung Anfordern
      </v-btn>
    </nav>
    
    <!-- Spacer nur im Desktop-Layout (wird per CSS ausgeblendet) -->
    <v-spacer class="d-none d-md-block"></v-spacer>
    
    <!-- Live Counter -->
    <div class="header-counter" aria-live="polite" aria-label="Anzahl der gestellten Solar-Anfragen">
      <span class="counter-label">
        Bereits
        <span ref="counterEl" class="counter-value">
          {{ formattedDisplayedCount }}
        </span>
        <v-icon small color="green" aria-hidden="true">mdi-arrow-up</v-icon>
      </span>
      <br />
      <span class="counter-subtitle">Solar-Anfragen gestellt</span>
    </div>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    absolute
    app
    class="d-md-none drawer-over"
  >
    <v-list dense>
      <v-list-item @click="scrollToSection('arguments-section'); drawer = false">
        <v-list-item-title>Vorteile</v-list-item-title>
      </v-list-item>
      <v-list-item @click="scrollToSection('free-consultation-form'); drawer = false">
        <v-list-item-title>Beratung Anfordern</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      solarRequestCount: 313972, // Initialwert der Anfragen
      displayedCount: 313972, // Sichtbarer Zählerwert
      intervalId: null,
      animIntervalId: null,
      drawer: false, // Steuerung des mobilen Navigation Drawers
    };
  },
  computed: {
    // Formatiert den Zählerwert mit Tausender-Trennzeichen
    formattedDisplayedCount() {
      return Math.floor(this.displayedCount).toLocaleString("de-DE");
    },
  },
  mounted() {
    // Aktualisiere den Counter alle 5 Sekunden
    this.intervalId = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 50) + 1;
      this.solarRequestCount += randomIncrement;
      this.animateCountUp();
    }, 5000);
  },
  beforeUnmount() {
    // Intervalle bereinigen
    clearInterval(this.intervalId);
    clearInterval(this.animIntervalId);
  },
  methods: {
    // Animation für den Zähler (mit Bounce-Effekt)
    animateCountUp() {
      clearInterval(this.animIntervalId);
      const startValue = this.displayedCount;
      const endValue = this.solarRequestCount;
      const steps = 30;
      const stepTime = 15;
      let currentStep = 0;
      const increment = (endValue - startValue) / steps;
      
      const counterEl = this.$refs.counterEl;
      if (counterEl) {
        counterEl.classList.add("bounce");
      }
      
      this.animIntervalId = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          this.displayedCount = endValue;
          clearInterval(this.animIntervalId);
          setTimeout(() => {
            if (counterEl) counterEl.classList.remove("bounce");
          }, 150);
        } else {
          this.displayedCount += increment;
        }
      }, stepTime);
    },
    // Smooth Scroll zur gewünschten Sektion
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
/* Basis-Styling für die App-Bar */
.header-bar {
  background-color: #0c2760 !important;
  margin-top: 30px;
  padding-left: 16px;
  padding-right: 16px;
  overflow-x: hidden; /* verhindert horizontales Scrollen */
  display: flex;
  align-items: center;
  position: relative;
}

/* Container für Hamburger und Logo */
.header-left {
  display: flex;
  align-items: center;
}

/* Desktop-Navigation */
.nav-container {
  display: flex;
  /* Für Desktop wird die Navigation zentriert */
  /* Absolut positionieren und mittig ausrichten */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-btn {
  font-weight: bold;
  font-size: 1rem;
  color: #b9b9b9 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  margin: 0 8px;
}

.nav-btn:hover {
  color: #ffffff !important;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.nav-btn:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Live Counter Styling */
.header-counter {
  text-align: right;
  white-space: nowrap;
}

/* Counter-Text */
.counter-label {
  font-size: 0.9rem;
  color: #ffffff;
}

.counter-value {
  font-weight: 800;
  color: #4caf50;
  margin: 0 4px;
  display: inline-block;
  transition: transform 0.30s ease-out;
}

.counter-value.bounce {
  transform: scale(2);
}

.counter-subtitle {
  font-size: 0.8rem;
  color: #b9b9b9;
}

/* News-Ticker */
.news-ticker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: #679334;
  z-index: 9999;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.ticker-content {
  white-space: nowrap;
  display: inline-block;
  padding-left: 100%;
  animation: ticker-move 25s linear infinite;
  color: white;
}

@keyframes ticker-move {
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* Mobile-Anpassungen */
@media (max-width: 600px) {
  .header-bar {
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .header-left {
    width: 100%;
    justify-content: center;
  }
  .v-spacer {
    display: none;
  }
  .header-counter {
    width: 100%;
    text-align: left;
    margin-top: 4px;
    padding-left: 16px;
  }
  .counter-label,
  .counter-subtitle {
    font-size: 0.8rem;
  }
}

/* Sicherstellen, dass der mobile Drawer über der Header-Bar liegt */
.drawer-over {
  z-index: 2000 !important;
}
</style>
