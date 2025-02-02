<template>
  <div class="solar-disclaimer-section">
    <v-container fluid class="py-10 px-6">
      <!-- Überschrift -->
      <v-row class="mb-4">
        <v-col cols="12">
          <div class="section-heading">
            <div class="section-subtitle">VORTEILE</div>
            <h2 class="section-title">4 Möglichkeiten &amp; Vorteile deiner Solaranlage:</h2>
          </div>
        </v-col>
      </v-row>

      <!-- Alle Karten in einem Row, mit individueller Reihenfolge -->
      <v-row dense>
        <!-- Karte 1 -->
        <v-col 
          cols="12" 
          md="6" 
          order="1" 
          order-md="1"
          class="mb-4"
        >
          <v-sheet elevation="2" rounded="xl" class="info-card">
            <div class="info-card-header" @click="toggle(1)">
              <h3 class="info-card-title">1. Solaranlage mit Stromspeicher</h3>
              <v-icon>
                {{ isOpen1 ? "mdi-minus-circle" : "mdi-plus-circle" }}
              </v-icon>
            </div>
            <v-expand-transition>
              <div v-if="isOpen1" class="info-card-content">
                <p>
                  Der Stromspeicher ermöglicht dir überschüssigen Strom für später zu speichern.
                  Auf diese Weise kann der Strom dann genutzt werden, wenn keine Sonne scheint oder 
                  wenn der Strombedarf höher ist als die von der Solaranlage erzeugte Menge.
                </p>
                <p>
                  Ein Stromspeicher kann die Unabhängigkeit vom öffentlichen Stromnetz erhöhen 
                  und dazu beitragen, die Stromkosten zu reduzieren.
                </p>
              </div>
            </v-expand-transition>
          </v-sheet>
        </v-col>

        <!-- Karte 2 (soll in der mobilen Version als Zweites erscheinen) -->
        <v-col 
          cols="12" 
          md="6" 
          order="2" 
          order-md="3"
          class="mb-4"
        >
          <v-sheet elevation="2" rounded="xl" class="info-card">
            <div class="info-card-header" @click="toggle(2)">
              <h3 class="info-card-title">2. Wallbox für dein Elektroauto</h3>
              <v-icon>
                {{ isOpen2 ? "mdi-minus-circle" : "mdi-plus-circle" }}
              </v-icon>
            </div>
            <v-expand-transition>
              <div v-if="isOpen2" class="info-card-content">
                <p>
                  Eine Wallbox in Kombination mit einer Solaranlage ermöglicht es, den von 
                  der Solaranlage erzeugten Strom direkt für das Elektroauto zu nutzen. 
                  Dadurch kannst du dein E-Auto umweltfreundlich aufladen und gleichzeitig 
                  Geld sparen, weil du weniger Strom vom öffentlichen Netz beziehen musst.
                </p>
              </div>
            </v-expand-transition>
          </v-sheet>
        </v-col>

        <!-- Karte 3 (soll in der mobilen Version als Drittes erscheinen) -->
        <v-col 
          cols="12" 
          md="6" 
          order="3" 
          order-md="2"
          class="mb-4"
        >
          <v-sheet elevation="2" rounded="xl" class="info-card">
            <div class="info-card-header" @click="toggle(3)">
              <h3 class="info-card-title">3. Wärmepumpe für dein Zuhause</h3>
              <v-icon>
                {{ isOpen3 ? "mdi-minus-circle" : "mdi-plus-circle" }}
              </v-icon>
            </div>
            <v-expand-transition>
              <div v-if="isOpen3" class="info-card-content">
                <p>
                  Wenn du deine Solaranlage mit einer <strong>Wärmepumpe</strong> kombinierst, 
                  kannst du den erzeugten Strom nutzen, um zu heizen. Damit verzichtest du 
                  auf fossile Brennstoffe (Öl, Gas, Holz etc.) und sparst Geld, da selbst 
                  erzeugter Solarstrom keine extra Kosten mit sich bringt.
                </p>
                <p>
                  Außerdem kann die Wärmepumpe als Speicher dienen: Sollte die Sonne tagsüber 
                  scheinen, kann sie bereits das Wasser für abends erwärmen und erspart dir 
                  so den teuren Strom aus dem Netz.
                </p>
              </div>
            </v-expand-transition>
          </v-sheet>
        </v-col>

        <!-- Karte 4 -->
        <v-col 
          cols="12" 
          md="6" 
          order="4" 
          order-md="4"
          class="mb-4"
        >
          <v-sheet elevation="2" rounded="xl" class="info-card">
            <div class="info-card-header" @click="toggle(4)">
              <h3 class="info-card-title">4. Förderung &amp; Steuervorteile</h3>
              <v-icon>
                {{ isOpen4 ? "mdi-minus-circle" : "mdi-plus-circle" }}
              </v-icon>
            </div>
            <v-expand-transition>
              <div v-if="isOpen4" class="info-card-content">
                <p>
                  Dank verschiedener Förderprogramme und Steuervergünstigungen kann sich eine 
                  Photovoltaikanlage noch schneller lohnen. Informiere dich über die geltenden 
                  Regelungen in deiner Region.
                </p>
              </div>
            </v-expand-transition>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SolarCalculatorDisclaimer",
  data() {
    return {
      // Standardmäßig alle zugeklappt oder nach Bedarf anpassen:
      isOpen1: true,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
    };
  },
  methods: {
    /**
     * Öffnet oder schließt die jeweilige Karte.
     */
    toggle(cardNumber) {
      switch (cardNumber) {
        case 1:
          this.isOpen1 = !this.isOpen1;
          break;
        case 2:
          this.isOpen2 = !this.isOpen2;
          break;
        case 3:
          this.isOpen3 = !this.isOpen3;
          break;
        case 4:
          this.isOpen4 = !this.isOpen4;
          break;
      }
    },
  },
};
</script>

<style scoped>
.solar-disclaimer-section {
  background-color: #f5f5f5;
  padding-top: 50px;
}

/* Überschrift-Bereich */
.section-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.section-subtitle {
  font-size: 0.875rem;
  color: #9e9e9e;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
  border-left: 4px solid #9e9e9e;
  padding-left: 8px;
}
.section-title {
  color: #5f2d87;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

/* Karten-Design */
.info-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  transition: box-shadow 0.3s;
  margin-bottom: 0;
}
.info-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Header-Bereich in jeder Karte (Titel + Icon) */
.info-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.info-card-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

/* Inhalt, der erst beim Aufklappen erscheint */
.info-card-content {
  margin-top: 12px;
  font-size: 0.95rem;
  color: #333;
}

/* Paragraphen-Abstände */
.info-card-content p + p {
  margin-top: 8px;
}

/* Mobile Responsive Anpassungen */
@media (max-width: 600px) {
  .solar-disclaimer-section {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .section-heading {
    align-items: center;
    text-align: center;
  }
  .section-subtitle {
    font-size: 0.75rem;
    margin-bottom: 4px;
    border-left: none;
    padding-left: 0;
  }
  .section-title {
    font-size: 1.5rem;
  }
  /* Karten anpassen */
  .info-card {
    padding: 12px;
  }
  .info-card-title {
    font-size: 0.95rem;
  }
  .info-card-content {
    font-size: 0.85rem;
  }
}
</style>
