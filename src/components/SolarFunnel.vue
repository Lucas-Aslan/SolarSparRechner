<template>
  <div>
    <!-- Schritt 1: Name -->
    <QuestionName
      v-if="currentStep === 'name'"
      @next="handleNameNext"
      @back="handleBack"
    />

    <!-- Schritt 2: PLZ -->
    <QuestionPLZ
      v-else-if="currentStep === 'plz'"
      @next="handlePLZNext"
      @back="handleBack"
    />

    <!-- Schritt 3: Stromverbrauch -->
    <QuestionStromverbrauch
      v-else-if="currentStep === 'stromverbrauch'"
      @next="handleStromNext"
      @back="handleBack"
    />

    <!-- Schritt 4: Dachtyp -->
    <QuestionDachtyp
      v-else-if="currentStep === 'dachtyp'"
      @next="handleDachtypNext"
      @back="handleBack"
    />

    <!-- Schritt 5: PKW -->
    <QuestionPkw
      v-else-if="currentStep === 'pkw'"
      @next="handlePkwNext"
      @back="handleBack"
    />

    <!-- Schritt 6: E-Mail + Telefon -->
    <QuestionContact
      v-else-if="currentStep === 'contact'"
      @next="handleContactNext"
      @back="handleBack"
    />

    <!-- NEU: Schritt 7: LoadingScreen -->
    <LoadingScreen
      v-else-if="currentStep === 'loading'"
      @next="handleLoadingDone"
    />

    <!-- NEU: Schritt 8: SuccessScreen -->
    <SuccessScreen
      v-else-if="currentStep === 'success'"
      @next="handleSuccessDone"
    />

    <!-- Schritt 9: AnalysisPage -->
    <AnalysisPage
      v-else-if="currentStep === 'analysis'"
      :funnelData="funnelData"
      @sendMail="handleSendMail"
      @back="handleBack"
    />
  </div>
</template>

<script>
import axios from 'axios';
import QuestionName from "@/components/QuestionName.vue";
import QuestionPLZ from "@/components/QuestionPLZ.vue";
import QuestionStromverbrauch from "@/components/QuestionStromverbrauch.vue";
import QuestionDachtyp from "@/components/QuestionDachtyp.vue";
import QuestionPkw from "@/components/QuestionPkw.vue";
import QuestionContact from "@/components/QuestionContact.vue";

// Lade- und Erfolgsbildschirme
import LoadingScreen from "@/components/LoadingScreen.vue";
import SuccessScreen from "@/components/SuccessScreen.vue";

import AnalysisPage from "@/components/AnalysisPage.vue";

export default {
  name: "SolarFunnel",
  components: {
    QuestionName,
    QuestionPLZ,
    QuestionStromverbrauch,
    QuestionDachtyp,
    QuestionPkw,
    QuestionContact,
    LoadingScreen,
    SuccessScreen,
    AnalysisPage
  },
  data() {
    return {
      currentStep: 'name',
      funnelData: {
        fullName: "",
        plz: "",
        stromverbrauch: null,
        dachtyp: "",
        pkw: null,
        email: "",
        phoneNumber: ""
      }
    };
  },
  methods: {
    // Rücknavigation
    handleBack() {
      if (this.currentStep === 'plz') {
        this.currentStep = 'name';
      } else if (this.currentStep === 'stromverbrauch') {
        this.currentStep = 'plz';
      } else if (this.currentStep === 'dachtyp') {
        this.currentStep = 'stromverbrauch';
      } else if (this.currentStep === 'pkw') {
        this.currentStep = 'dachtyp';
      } else if (this.currentStep === 'contact') {
        this.currentStep = 'pkw';
      } else if (this.currentStep === 'loading') {
        this.currentStep = 'contact';
      } else if (this.currentStep === 'success') {
        this.currentStep = 'loading';
      } else if (this.currentStep === 'analysis') {
        this.currentStep = 'success';
      }
    },

    // Schritt 1: Name
    handleNameNext(nameValue) {
      this.funnelData.fullName = nameValue;
      this.currentStep = 'plz';
    },

    // Schritt 2: PLZ
    handlePLZNext(plzValue) {
      this.funnelData.plz = plzValue;
      this.currentStep = 'stromverbrauch';
    },

    // Schritt 3: Stromverbrauch
    handleStromNext(stromValue) {
      this.funnelData.stromverbrauch = stromValue;
      this.currentStep = 'dachtyp';
    },

    // Schritt 4: Dachtyp
    handleDachtypNext(dachValue) {
      this.funnelData.dachtyp = dachValue;
      this.currentStep = 'pkw';
    },

    // Schritt 5: PKW
    handlePkwNext(pkwValue) {
      this.funnelData.pkw = pkwValue;
      this.currentStep = 'contact';
    },

    // Schritt 6: Kontakt
    handleContactNext(contactData) {
      this.funnelData.email = contactData.email;
      this.funnelData.phoneNumber = contactData.phoneNumber;
      // => Statt direkt zu analysis => erst Loading
      this.currentStep = 'loading';
    },

    // Schritt 7: Loading -> Warte 5 Sek, dann next => success
    // In LoadingScreen.vue wirfst Du ein setTimeout => this.$emit('next')
    handleLoadingDone() {
      // Nach dem Timeout wechselt man zu success
      this.currentStep = 'success';
    },

    // Schritt 8: Success -> Warte 5 Sek, dann next => analysis
    handleSuccessDone() {
      this.currentStep = 'analysis';
    },

    // Schritt 9: In AnalysisPage => handleSendMail
    async handleSendMail() {
      try {
        const response = await axios.post(
          "http://159.69.243.29:3000/api/submitFunnel",
          this.funnelData
        );
        if (response.status === 200) {
          alert("Daten erfolgreich verschickt!");
        } else {
          alert("Fehler beim Versenden der Daten.");
        }
      } catch (error) {
        console.error("Fehler beim Senden der Daten:", error);
        alert("Fehler beim Senden der Daten.");
      }
    }
  }
};
</script>

<style scoped>
/* Dein Funnel-Layout etc. */
</style>
