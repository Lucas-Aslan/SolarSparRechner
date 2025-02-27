<template>
  <v-app>
    <HeaderBar />

    <!-- IndependenceCalculatorSection steuert die Navigation -->
    <IntroComponent/>
    <IndependenceCalculatorSection @navigate="navigateTo" />

    <!-- SolarIntro wird von Anfang an angezeigt -->
    <div id="solarrechner">
      <SolarIntro v-if="currentScreen === 'solarrechner' && solarStep === 'intro'" @start="showUserInput"/>
      <LoadingScreen v-if="solarStep === 'loading'" @next="showSuccess"/>
      <SuccessScreen v-if="solarStep === 'success'" @next="showAnalysis"/>
      <AnalysisPage v-if="solarStep === 'analysis'" />
    </div>

    <div id="unabhaengigkeitsrechner" v-if="currentScreen === 'unabhaengigkeitsrechner'">
      <URechner />
    </div>

    <div v-if="currentScreen === 'solarrechner' && solarStep !== 'intro'">
      <SolarFunnel />
    </div>

    <MaterialComponent v-model:dialog="showDialog" />
    <MediaRecognition/>
    <ArgumentsSection id="arguments-section"/>
    <ConsultationSection />
    <SolarCalculatorSection/>
    <FreeConsultationForm id="free-consultation-form"/>
    <FooterComponent />
  </v-app>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import IndependenceCalculatorSection from "@/components/IndependenceCalculatorSection.vue";
import SolarIntro from "@/components/SolarIntro.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import SuccessScreen from "@/components/SuccessScreen.vue";
import AnalysisPage from "@/components/AnalysisPage.vue";
import SolarFunnel from "@/components/SolarFunnel.vue";
import URechner from "@/components/URechner.vue";
import MediaRecognition from "@/components/MediaRecognition.vue";
import SolarCalculatorSection from "./components/SolarCalculatorSection.vue";
import ConsultationSection from "@/components/ConsultationSection.vue";
import ArgumentsSection from "@/components/ArgumentsSection.vue";
import FreeConsultationForm from "@/components/FreeConsultationForm.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import MaterialComponent from "./components/MaterialComponent.vue";

export default {
  components: {
    HeaderBar,
    IndependenceCalculatorSection,
    SolarIntro,
    LoadingScreen,
    SuccessScreen,
    AnalysisPage,
    SolarFunnel,
    URechner,
    MaterialComponent,
    MediaRecognition,
    ArgumentsSection,
    ConsultationSection,
    SolarCalculatorSection,
    FreeConsultationForm,
    FooterComponent
  },
  data() {
    return {
      currentScreen: "solarrechner", // Startet direkt mit SolarIntro
      solarStep: "intro", // Zeigt sofort SolarIntro.vue
      showDialog: false,
    };
  },
  methods: {
    navigateTo(page) {
      if (page === "solarrechner") {
        this.currentScreen = "solarrechner";
        this.solarStep = "intro";
        this.scrollToSection(page);
      } else if (page === "unabhaengigkeitsrechner") {
        this.currentScreen = "unabhaengigkeitsrechner";
        this.scrollToSection(page);
      } else {
        this.scrollToSection(page);
      }
    },
    scrollToSection(sectionId) {
  this.$nextTick(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 200; // Höhe des Headers oder zusätzlicher Abstand
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionPosition - offset, behavior: "smooth" });
    }
  });
},

    showUserInput() {
      this.solarStep = "userinput";
    },
    showSuccess() {
      this.solarStep = "success";
    },
    showAnalysis() {
      this.solarStep = "analysis";
    },
  },
};
</script>

<style scoped>
#solarrechner {
  scroll-margin-top: 100px; /* Passt den Scroll-Offset an */
}

</style>