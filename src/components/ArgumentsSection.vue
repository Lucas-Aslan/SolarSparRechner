<template>
  <div class="five-arguments-section">
    <v-container fluid class="py-10 px-6">
      <!-- Überschrift -->
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="section-subtitle">DEINE VORTEILE</div>
          <h2 class="section-title">
            5 klare Argumente für eine Solaranlage auf deinem Dach
          </h2>
          <p class="section-description">
            Erfahre, wie eine Photovoltaikanlage nicht nur deine Stromkosten senkt, sondern auch langfristige Vorteile für dein Zuhause bietet.
          </p>
        </v-col>
      </v-row>

      <!-- Argumente -->
      <v-row dense>
        <v-col
          cols="12"
          md="4"
          v-for="(argument, index) in arguments"
          :key="index"
          class="mb-4"
        >
          <v-card elevation="4" class="argument-card">
            <!-- Abgerundetes Bild -->
            <v-img
              :src="argument.image"
              height="200"
              class="argument-img"
              :alt="`Argument ${index + 1}: ${argument.title}`"
              :lazy-src="argument.placeholder"
            ></v-img>
            <!-- Lila Balken -->
            <div class="separator"></div>
            <div class="argument-content">
              <h3 class="argument-title">{{ argument.title }}</h3>
              <p>{{ argument.description }}</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ArgumentsSection",
  data() {
    return {
      arguments: [
        {
          image: require('@/assets/wind-farm.webp'),
          placeholder: require('@/assets/wind-farm.webp'),
          title: "1. Du trägst zukunftssicher zum Klimaschutz bei",
          description:
            "Mit einer Photovoltaikanlage senkst du deine Stromkosten, steigerst deine Unabhängigkeit und setzt auf ein langlebiges System mit jahrzehntelanger Leistungsgarantie – dein Beitrag zum Klimaschutz.",
        },
        {
          image: require('@/assets/paar-berechnet-rechnung.webp'),
          placeholder: require('@/assets/paar-berechnet-rechnung.webp'),
          title: "2. Du senkst deine Stromkosten erheblich",
          description:
            "Mit einer Photovoltaikanlage nutzt du kostenlose Sonnenenergie und reduzierst deine Abhängigkeit vom Stromversorger. Steigende Strompreise? Kein Problem – du produzierst einfach selbst!",
        },
        {
          image: require('@/assets/strompreisentwicklung.webp'),
          placeholder: require('@/assets/strompreisentwicklung.webp'),
          title: "3. Du wirst unabhängiger von der Strompreisentwicklung",
          description:
            "Seit 2000 sind die Strompreise jährlich um durchschnittlich 4,3 % gestiegen – und ein Ende ist nicht in Sicht. Mit einer Solaranlage machst du dich unabhängig von Netzbetreibern und sicherst dir langfristig niedrige Energiekosten.",
        },
        {
          image: require('@/assets/immobilienwert-steigern.webp'),
          placeholder: require('@/assets/immobilienwert-steigern.webp'),
          title: "4. Du steigerst den Wert deiner Immobilie",
          description:
            "Mit einer Photovoltaikanlage reduzierst du deine Stromkosten und steigerst gleichzeitig den Wert deiner Immobilie – eine Investition, die sich doppelt auszahlt!",
        },
        {
          image: require('@/assets/photovoltaik-steuern-sparen.webp'),
          placeholder: require('@/assets/photovoltaik-steuern-sparen.webp'),
          title: "5. Steuerliche Vorteile mit Solaranlagen",
          description:
            "Das EEG bedeutet: Steuerbefreit: 0% Mehrwertsteuer, 0% Einkommenssteuer – für typische Einfamilienhaus-Solaranlagen.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.five-arguments-section {
  background-color: #ffffff;
  padding-top: 50px;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #0c2760;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  border-left: 4px solid #8e44ad;
  padding-left: 8px;
  text-align: left;
}

.section-title {
  color: #5f2d87;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  text-align: left;
  font-family: 'Georgia', serif;
}

.section-description {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
  line-height: 1.6;
}

.argument-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 16px;
  overflow: hidden;
  background-color: #e5e5e5;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.argument-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.argument-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.separator {
  width: 80%;
  height: 3px;
  background-color: #5f2d87;
  margin: 6px auto;
}

.argument-content {
  padding: 16px;
}

.argument-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.argument-content p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

/* Responsive Anpassungen für mobile Geräte */
@media (max-width: 600px) {
  .five-arguments-section {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .section-subtitle {
    text-align: center;
    margin-bottom: 6px;
    font-size: 0.8rem;
    padding-left: 0;
    border-left: none;
  }
  .section-title {
    font-size: 1.8rem;
    text-align: center;
  }
  .section-description {
    font-size: 1rem;
    text-align: center;
  }
  .argument-img {
    height: 150px;
  }
  .separator {
    width: 60%;
    height: 2px;
    margin: 4px auto;
  }
  .argument-content {
    padding: 12px;
  }
  .argument-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
  .argument-content p {
    font-size: 1rem;
    line-height: 1.4;
  }
}
</style>
