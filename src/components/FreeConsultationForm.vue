<template>
  <div class="free-consultation-section">
    <v-container fluid>
      <!-- Überschrift und Beschreibung -->
      <v-row>
        <v-col cols="12">
          <h2 class="section-title">Frage jetzt dein kostenloses Beratungsgespräch an</h2>
          <p class="section-description">
            Nutze die Gelegenheit für eine unverbindliche Beratung durch unsere Experten.
            Wir beantworten deine Fragen rund um Photovoltaik, Stromspeicher und mehr!
          </p>
        </v-col>
      </v-row>

      <!-- Formular -->
      <v-row class="mt-8">
        <v-col cols="12">
          <div class="form-wrapper">
            <!-- WICHTIG: @submit.prevent="submitForm" -->
            <form @submit.prevent="submitForm" aria-labelledby="consultation-form-title">
              <v-form ref="consultationForm" v-model="formValid" @submit.prevent="submitForm" aria-labelledby="consultation-form-title">
                <fieldset>
                  <legend id="consultation-form-title">Beratungsgespräch anfragen</legend>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="firstName"
                        name="firstName"
                        label="Vorname"
                        outlined
                        dense
                        required
                        aria-required="true"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="lastName"
                        name="lastName"
                        label="Nachname"
                        outlined
                        dense
                        required
                        aria-required="true"
                      />
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="email"
                    name="email"
                    label="E-Mail-Adresse"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                    required
                    aria-required="true"
                  />

                  <v-text-field
                    v-model="phone"
                    name="phone"
                    label="Telefonnummer"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                    required
                    aria-required="true"
                  />

                  <!-- Empfehlungscode -->
                  <v-btn text small class="mt-1 purple--text" @click="toggleReferral">
                    + Hast du einen Empfehlungscode?
                  </v-btn>
                  <v-expand-transition>
                    <div v-if="showReferral" class="mb-3">
                      <v-text-field
                        v-model="referralCode"
                        name="referralCode"
                        label="Empfehlungscode"
                        outlined
                        dense
                      />
                    </div>
                  </v-expand-transition>

                  <!-- Checkboxen für Services -->
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-checkbox
                        v-model="selectedServices"
                        name="services[]"
                        label="Photovoltaik + Stromspeicher"
                        value="pv"
                        hide-details
                        dense
                      />
                      <v-checkbox
                        v-model="selectedServices"
                        name="services[]"
                        label="Stromspeicher nachrüsten/austauschen"
                        value="speicher"
                        hide-details
                        dense
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-checkbox
                        v-model="selectedServices"
                        name="services[]"
                        label="Wärmepumpe"
                        value="wp"
                        hide-details
                        dense
                      />
                      <v-checkbox
                        v-model="selectedServices"
                        name="services[]"
                        label="Wallbox"
                        value="wallbox"
                        hide-details
                        dense
                      />
                    </v-col>
                  </v-row>

                  <!-- Adresse -->
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="street"
                        name="street"
                        label="Straße"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="houseNumber"
                        name="houseNumber"
                        label="Hausnummer"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="postalCode"
                        name="postalCode"
                        label="Postleitzahl"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="city"
                        name="city"
                        label="Stadt"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>

                  <!-- Absende-Button -->
                  <v-btn
                    type="submit"
                    class="mt-4 submit-btn"
                    large
                    block
                    aria-label="Formular absenden"
                  >
                    Absenden
                    <v-icon right>mdi-send</v-icon>
                  </v-btn>

                  <!-- Datenschutzhinweis -->
                  <p class="privacy-hint mt-3">
                    Mit dem Klick auf den Button, bestätige ich, dass ich die
                    <a href="#!" class="purple--text">Datenschutzerklärung</a>
                    zur Kenntnis genommen habe. Ich stimme zu, dass meine Angaben
                    zur Erstellung eines kostenlosen Angebots
                    elektronisch erhoben und gespeichert werden.
                  </p>
                </fieldset>
              </v-form>
            </form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FreeConsultationForm',
  data() {
    return {
      formValid: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      referralCode: '',
      selectedServices: [],
      street: '',
      houseNumber: '',
      postalCode: '',
      city: '',
      showReferral: false,
    };
  },
  methods: {
    toggleReferral() {
      this.showReferral = !this.showReferral;
    },
    async submitForm() {
      try {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          referralCode: this.referralCode,
          selectedServices: this.selectedServices,
          street: this.street,
          houseNumber: this.houseNumber,
          postalCode: this.postalCode,
          city: this.city,
        };

        const response = await axios.post(
          'http://159.69.243.29:3000/api/submitForm',
          formData
        );

        if (response.status === 200) {
          alert('Formular erfolgreich versendet!');
          this.resetFields();
        } else {
          alert('Fehler beim Versenden des Formulars.');
        }
      } catch (error) {
        console.error('submitForm Error:', error);
        alert('Es ist ein Fehler aufgetreten.');
      }
    },
    resetFields() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.referralCode = '';
      this.selectedServices = [];
      this.street = '';
      this.houseNumber = '';
      this.postalCode = '';
      this.city = '';
      this.showReferral = false;
    },
  },
};
</script>

<style scoped>
.free-consultation-section {
  padding: 30px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0c2760;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.form-wrapper {
  max-width: 600px;
  margin: auto;
}

.submit-btn {
  background-color: #0c2760;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.privacy-hint {
  font-size: 0.9rem;
  color: #777;
}

.purple--text {
  color: #0c2760;
}

/* Mobile Responsive Anpassungen */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .section-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .form-wrapper {
    padding: 0 15px;
  }
  .submit-btn {
    font-size: 0.9rem;
    padding: 10px 0;
  }
  .privacy-hint {
    font-size: 0.8rem;
  }
}
</style>
