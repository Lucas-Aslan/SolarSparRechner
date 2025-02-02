<template>
  <div class="independence-section" aria-labelledby="independence-section-title">
    <!-- Slogan -->
    <div class="slogan-container text-center">
      <h1 id="independence-section-title" class="slogan">
        Ihr Weg zu mehr Unabhängigkeit und Ersparnis mit dem
        <span class="highlight">SolarSparRechner</span>!
      </h1>
    </div>

    <!-- CTA-Bereich mit Logos links, Text in der Mitte, Siegel rechts -->
    <v-container class="cta-container text-center">
      <v-row align="center">
        <!-- Linke Spalte mit Logos -->
        <v-col cols="3" md="2" class="d-flex flex-column align-center">
          <img :src="require('@/assets/EE_Logo.webp')" alt="EE Logo" class="logo-image">
          <img :src="require('@/assets/DEN_Logo.webp')" alt="DEN Logo" class="logo-image">
          <img :src="require('@/assets/KFW.webp')" alt="KFW Logo" class="logo-image">
        </v-col>

        <!-- Mittlere Spalte mit Text & Button -->
        <v-col cols="6" md="8">
          <h2 class="cta-heading">Sichern Sie sich Ihre kostenlose Solar-Analyse!</h2>
          <p class="cta-subtext">
            Mehr als <strong>10.000 zufriedene Nutzer</strong> sparen bereits bis zu 40% an Stromkosten.
          </p>

          <!-- Garantien -->
          <p class="cta-guarantee">
            <v-icon color="white">mdi-check-circle</v-icon> 100% kostenlose Berechnung – in nur 2 Minuten!
          </p>

          <!-- Countdown -->
          <p class="cta-countdown">
            <v-icon color="red">mdi-clock-outline</v-icon>
            Aktion endet in: <span>{{ countdown }}</span>
          </p>

          <!-- CTA Button -->
          <div class="cta-button-wrapper">
            <v-btn color="success" large elevation="2" class="cta-button"
              @click="$emit('navigate', 'solarrechner')"
              aria-label="Zum Solarrechner">
              <span class="button-text">
                Jetzt <span class="button-break">Sparpotenzial berechnen</span>
              </span>
            </v-btn>
          </div>
        </v-col>

        <!-- Rechte Spalte mit Siegel -->
        <v-col cols="3" md="2" class="cta-seal-col d-flex justify-center align-center">
          <img :src="require('@/assets/SSP_Siegel.webp')" alt="Top 2024 Siegel" class="siegel-bild">
        </v-col>
      </v-row>
    </v-container>

    <!-- Container für Rechner (unverändert) -->
    <v-container class="py-12 px-6" fluid>
      <v-row class="d-flex justify-center">
        <!-- Solarrechner -->
        <v-col cols="12" md="6">
          <v-card class="info-card text-center" elevation="4">
            <v-icon size="72" color="orange" class="mb-4" aria-hidden="true">mdi-solar-power</v-icon>
            <h2 class="text-h5 font-weight-bold">Solarrechner</h2>
            <p class="text-body-1 mt-2">
              Erfahren Sie, wie viel Sie mit einer Solaranlage sparen können.
            </p>
            <v-btn
              color="primary"
              large
              block
              class="mt-4 custom-btn"
              @click="$emit('navigate', 'solarrechner')"
              aria-label="Zum Solarrechner"
            >
              Zum Solarrechner
            </v-btn>
          </v-card>
        </v-col>

        <!-- Unabhängigkeitsrechner -->
        <v-col cols="12" md="6">
          <v-card class="info-card text-center" elevation="4">
            <v-icon size="72" color="green" class="mb-4" aria-hidden="true">mdi-home-circle</v-icon>
            <h2 class="text-h5 font-weight-bold">Unabhängigkeitsrechner</h2>
            <p class="text-body-1 mt-2">
              Berechnen Sie Ihren Autarkiegrad und Eigenverbrauch.
            </p>
            <v-btn
              color="success"
              large
              block
              class="mt-4 custom-btn"
              @click="$emit('navigate', 'unabhaengigkeitsrechner')"
              aria-label="Zum Unabhängigkeitsrechner"
            >
              Zum Unabhängigkeitsrechner
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "IndependenceCalculatorSection",
  data() {
    return {
      countdown: "12 Stunden, 59 Minuten, 59 Sekunden",
      timeLeft: 12 * 60 * 60 + 59 * 60 + 59, // Startzeit in Sekunden
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          let hours = Math.floor(this.timeLeft / 3600);
          let minutes = Math.floor((this.timeLeft % 3600) / 60);
          let seconds = this.timeLeft % 60;
          this.countdown = `${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
/* Hintergrund */
.independence-section {
  background: 
    linear-gradient(rgba(69, 57, 57, 0.5), rgba(114, 93, 93, 0.5)),
    url("@/assets/TeslaBild.webp") center center / cover no-repeat;
  color: white;
  width: 100%;
  padding-top: 150px; /* Inhalt weiter nach unten schieben */
  padding-bottom: 100px;
}

/* Slogan */
.slogan-container {
  margin-bottom: 50px;
}
.slogan-container h1 {
  font-size: 2.4rem;
  line-height: 1.2;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  margin: 0 20px;
}

/* CTA Bereich */
.cta-container {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  padding: 25px;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

/* CTA Button */
.cta-button-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}
.cta-button {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 35px;
  white-space: nowrap; /* Desktop: kein Umbruch */
}
.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}

/* Zusätzliche Button-Text-Stile */
.button-text {
  display: inline;
}
.button-break {
  display: inline;
}

@media (min-width: 601px) {
  .button-break {
    display: inline; /* Desktop: kein Zeilenumbruch */
  }
}

/* Animationen */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-3px); }
}
@keyframes pop-out {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Garantien */
.cta-guarantee {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
}

/* Countdown */
.cta-countdown {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffeb3b;
  margin-bottom: 15px;
  animation: shake 2s ease-in-out infinite, pop-out 4s ease-in-out infinite;
}

/* Info-Karten */
.info-card {
  background-color: #0c2760;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
}
.text-h5 {
  color: white !important;
}
.text-body-1 {
  color: white !important;
}

/* Logos */
.logo-image {
  max-width: 160px;
  margin-bottom: 10px;
}

/* Siegel Bild */
.siegel-bild {
  width: 280px;
  height: auto;
  transform: scale(1.8);
  position: relative;
  right: 0;
}

/* -----------------------------
 *  Responsive (max-width: 600px)
 * ----------------------------- */
@media (max-width: 600px) {
  .independence-section {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  .slogan-container h1 {
    font-size: 1.8rem;
    line-height: 1.3;
    margin: 0 10px;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
  }

  .cta-container {
    padding: 10px;
    max-width: 90%;
    margin: 0 auto 20px auto;
  }
  .logo-image {
    max-width: 80px;
    margin-bottom: 8px;
  }
  .cta-heading {
    font-size: 1rem;
  }
  .cta-subtext {
    font-size: 0.7rem;
  }
  .cta-guarantee {
    font-size: 0.7rem;
  }
  .cta-countdown {
    font-size: 0.8rem;
  }

  /* Hier wird das Button-Layout angepasst */
  .cta-button {
    font-size: 0.5rem;         /* leicht größere Schrift als 0.7, damit es besser lesbar ist */
    line-height: 1.2;         /* kompakter, damit alles in den Button passt */
    padding: 8px 14px;        /* etwas mehr Padding, damit nichts abgeschnitten wird */
    white-space: normal;      /* erlaubt Zeilenumbrüche */
    display: inline-block;    /* verhindert zu viel Höhe wie bei block */
    width: auto;              /* Verhindert, dass er sich auf 100% ausbreitet, wenn du es nicht willst */
    word-break: break-word;   /* bricht lange Wörter, falls nötig */
  }

  .cta-seal-col {
    justify-content: flex-end;
  }
  .siegel-bild {
    width: 120px;
    transform: scale(1);
  }

  /* Wenn du keinen erzwungenen Umbruch möchtest, kannst du .button-break = inline lassen */
  .button-break {
    display: inline; /* oder block, wenn du wirklich jede zweite Zeile umbrechen willst */
  }
}
</style>
