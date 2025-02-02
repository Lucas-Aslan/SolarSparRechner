<template>
  <v-app>
    <HeaderBar />

    <!-- IndependenceCalculatorSection steuert die Navigation -->
    <IntroComponent/>
    <IndependenceCalculatorSection @navigate="navigateTo" />

    <!-- Dynamische Anzeige der Komponenten basierend auf currentScreen -->
    <div id="solarrechner">
      <SolarIntro v-if="currentScreen === 'solarrechner' && solarStep === 'intro'" @start="showUserInput" />
      <!-- <QuestionName
        v-if="solarStep === 'userinput'"
        @next="showPLZ"
        @back="showIntro"
      />
      <QuestionPLZ
        v-if="solarStep === 'plz'"
        @next="showStromverbrauch"
        @back="showUserInput"
      />
      <QuestionStromverbrauch
        v-if="solarStep === 'stromverbrauch'"
        @next="showDachtyp"
        @back="showPLZ"
      />
      <QuestionDachtyp
        v-if="solarStep === 'dachtyp'"
        @next="showPkw"
        @back="showStromverbrauch"
      />
      <QuestionPkw
        v-if="solarStep === 'pkw'"
        @next="showContact"
        @back="showDachtyp"
      />
      <QuestionContact
        v-if="solarStep === 'contact'"
        @next="showLoadingScreen"
        @back="showPkw"
      /> -->
      <LoadingScreen
        v-if="solarStep === 'loading'"
        @next="showSuccess"
      />
      <SuccessScreen
        v-if="solarStep === 'success'"
        @next="showAnalysis"
      />
      <AnalysisPage v-if="solarStep === 'analysis'" />
    </div>
       <div id="unabhaengigkeitsrechner" v-if="currentScreen === 'unabhaengigkeitsrechner'">
     <URechner />
   </div>
   <div v-if="currentScreen === 'solarrechner'">
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
// import QuestionName from "@/components/QuestionName.vue";
// import QuestionPLZ from "@/components/QuestionPLZ.vue";
// import QuestionStromverbrauch from "@/components/QuestionStromverbrauch.vue";
// import QuestionDachtyp from "@/components/QuestionDachtyp.vue";
// import QuestionPkw from "@/components/QuestionPkw.vue";
// import QuestionContact from "@/components/QuestionContact.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import SuccessScreen from "@/components/SuccessScreen.vue";
import AnalysisPage from "@/components/AnalysisPage.vue";
import SolarFunnel from "@/components/SolarFunnel.vue"; // <-- Hier importieren!
import URechner from "@/components/URechner.vue";
import MediaRecognition from "@/components/MediaRecognition.vue";
// import IntroComponent from "@/components/IntroComponent.vue";
import SolarCalculatorSection from "./components/SolarCalculatorSection.vue";
import ConsultationSection from "@/components/ConsultationSection.vue";
import ArgumentsSection from "@/components/ArgumentsSection.vue";
import FreeConsultationForm from "@/components/FreeConsultationForm.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import MaterialComponent from "./components/MaterialComponent.vue";


export default {
  components: {
    HeaderBar,
    // IntroComponent,
    IndependenceCalculatorSection,
    SolarIntro,
    // QuestionName,
    // QuestionPLZ,
    // QuestionStromverbrauch,
    // QuestionDachtyp,
    // QuestionPkw,
    // QuestionContact,
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
      currentScreen: "", // Startbildschirm
      solarStep: "intro", // Aktueller Schritt des Solarrechners
      showDialog: false, // Dialog-Status für Komponentenanzeige
    };
  },
  methods: {
  navigateTo(page) {
    if (page === "solarrechner") {
      this.currentScreen = "solarrechner"; // Setze den Solarrechner als aktiv
      this.solarStep = "intro"; // Beginne mit dem Intro des Solarrechners
      this.$nextTick(() => {
        const section = document.getElementById(page);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else if (page === "unabhaengigkeitsrechner") {
      this.currentScreen = "unabhaengigkeitsrechner"; // Setze den Unabhängigkeitsrechner als aktiv
      this.$nextTick(() => {
        const section = document.getElementById(page);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else {
      // Allgemeines Scrollen zu einem Ziel
      this.$nextTick(() => {
        const section = document.getElementById(page);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  },
  showUserInput() {
    this.solarStep = "userinput";
  },
  showPLZ() {
    this.solarStep = "plz";
  },
  showStromverbrauch() {
    this.solarStep = "stromverbrauch";
  },
  showDachtyp() {
    this.solarStep = "dachtyp";
  },
  showPkw() {
    this.solarStep = "pkw";
  },
  showContact() {
    this.solarStep = "contact";
  },
  showLoadingScreen() {
    this.solarStep = "loading";
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
.large-button {
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.large-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
</style>
