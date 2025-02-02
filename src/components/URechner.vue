<template>
  <!-- Großer Container mit dunklem Hintergrund -->
  <v-container fluid class="py-6" style="background-color: white; min-height: 100vh;">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Kasten/Sheet mit leichtem Schatten -->
        <v-sheet elevation="2" rounded="lg" class="p-6" style="background-color: #424242;">
          <!-- Titel -->
          <div class="mb-6 text-center">
            <h1 class="text-h5" style="color: #8BC34A;">
              Unabhängigkeitsrechner
            </h1>
          </div>

          <!-- Slider Controls -->
          <v-row class="mb-8" dense>
            <!-- Jahresstromverbrauch -->
            <v-col cols="12" md="4">
              <div class="d-inline-flex align-center mb-2">
                <span class="text-white mr-2">Jahresstromverbrauch</span>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <!-- Info-Icon als Tooltip-Trigger -->
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="white"
                      class="cursor-pointer"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <span>Jährlicher Stromverbrauch des Haushalts</span>
                </v-tooltip>
              </div>
              <v-slider
                v-model="jahresverbrauch"
                color="green"
                :min="1000"
                :max="15000"
                :step="100"
              ></v-slider>
              <div class="text-white text-right">
                {{ jahresverbrauch }} kWh
              </div>
            </v-col>

            <!-- Photovoltaikleistung -->
            <v-col cols="12" md="4">
              <div class="d-inline-flex align-center mb-2">
                <span class="text-white mr-2">Photovoltaikleistung</span>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="white"
                      class="cursor-pointer"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <span>Installierte Leistung der PV-Anlage</span>
                </v-tooltip>
              </div>
              <v-slider
                v-model="pvLeistung"
                color="green"
                :min="1"
                :max="30"
                :step="0.5"
              ></v-slider>
              <div class="text-white text-right">
                {{ pvLeistung.toFixed(1) }} kW
              </div>
            </v-col>

            <!-- Nutzbare Speicherkapazität -->
            <v-col cols="12" md="4">
              <div class="d-inline-flex align-center mb-2">
                <span class="text-white mr-2">Nutzbare Speicherkapazität</span>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="white"
                      class="cursor-pointer"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <span>Nutzbare Kapazität des Batteriespeichers</span>
                </v-tooltip>
              </div>
              <v-slider
                v-model="speicherKapazitaet"
                color="green"
                :min="0"
                :max="20"
                :step="0.5"
              ></v-slider>
              <div class="text-white text-right">
                {{ speicherKapazitaet.toFixed(1) }} kWh
              </div>
            </v-col>
          </v-row>

          <!-- Charts -->
          <v-row>
            <!-- Autarkiegrad -->
            <v-col cols="12" md="6" class="text-center my-4">
              <h2 class="text-h6" style="color: #ffffff; margin-bottom: 24px;">
                Autarkiegrad
              </h2>
              <div style="width: 250px; height: 250px; margin: 0 auto; position: relative;">
                <svg viewBox="0 0 120 120" style="transform: rotate(-90deg); width: 100%; height: 100%;">
                  <!-- Netzbezug -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="netzbezugFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceAutarkie"
                    stroke-dashoffset="0"
                    @mouseenter="activeAutarkieSegment = 'netzbezug'"
                    @mouseleave="activeAutarkieSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Netzbezug: {{ netzbezugProzent }} %</title>
                  </circle>

                  <!-- Batterieentladung -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="batterieFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceAutarkie"
                    :stroke-dashoffset="batterieentladungOffset"
                    @mouseenter="activeAutarkieSegment = 'batterieentladung'"
                    @mouseleave="activeAutarkieSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Batterieentladung: {{ batterieentladungProzent }} %</title>
                  </circle>

                  <!-- Direktverbrauch -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="direktFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceAutarkie"
                    :stroke-dashoffset="direktverbrauchOffset"
                    @mouseenter="activeAutarkieSegment = 'direktverbrauch'"
                    @mouseleave="activeAutarkieSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Direktverbrauch: {{ direktverbrauchProzent }} %</title>
                  </circle>

                  <!-- Innenkreis -->
                  <circle cx="60" cy="60" r="44" fill="#2A2A2A" />
                  <!-- Prozentzahl -->
                  <text
                    x="60"
                    y="60"
                    font-size="20"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="white"
                    transform="rotate(90, 60, 60)"
                  >
                    {{ autarkiegrad }}%
                  </text>
                </svg>

                <!-- Hover-Overlay (optional) -->
                <div
                  v-if="activeAutarkieSegment"
                  class="position-absolute text-center px-3 py-2 rounded-lg"
                  style="
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.9);
                    min-width: 120px;
                    z-index: 10;
                  "
                >
                  <div style="color: #333; font-weight: 600;">
                    {{ getSegmentName(activeAutarkieSegment) }}:
                    {{ getSegmentValue(activeAutarkieSegment, 'autarkie') }}%
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Eigenverbrauchsanteil -->
            <v-col cols="12" md="6" class="text-center my-4">
              <h2 class="text-h6" style="color: #ffffff; margin-bottom: 24px;">
                Eigenverbrauchsanteil
              </h2>
              <div style="width: 250px; height: 250px; margin: 0 auto; position: relative;">
                <svg viewBox="0 0 120 120" style="transform: rotate(-90deg); width: 100%; height: 100%;">
                  <!-- Netzeinspeisung -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="netzeinspeisungFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceEigen"
                    stroke-dashoffset="0"
                    @mouseenter="activeEigenverbrauchSegment = 'netzeinspeisung'"
                    @mouseleave="activeEigenverbrauchSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Netzeinspeisung: {{ netzeinspeisungProzent }} %</title>
                  </circle>

                  <!-- Batterieladung -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="batterieFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceEigen"
                    :stroke-dashoffset="batterieladungOffset"
                    @mouseenter="activeEigenverbrauchSegment = 'batterieladung'"
                    @mouseleave="activeEigenverbrauchSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Batterieladung: {{ batterieladungProzent }} %</title>
                  </circle>

                  <!-- Direktverbrauch -->
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    :stroke="direktFarbe"
                    stroke-width="12"
                    :stroke-dasharray="circumferenceEigen"
                    :stroke-dashoffset="direktverbrauchOffsetEigen"
                    @mouseenter="activeEigenverbrauchSegment = 'direktverbrauch_eigen'"
                    @mouseleave="activeEigenverbrauchSegment = null"
                    style="cursor: pointer; pointer-events: all; transition: 0.3s;"
                  >
                    <title>Direktverbrauch: {{ direktverbrauchProzentEigen }} %</title>
                  </circle>

                  <!-- Innenkreis -->
                  <circle cx="60" cy="60" r="44" fill="#2A2A2A" />
                  <!-- Prozentzahl -->
                  <text
                    x="60"
                    y="60"
                    font-size="20"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="white"
                    transform="rotate(90, 60, 60)"
                  >
                    {{ eigenverbrauchsanteil }}%
                  </text>
                </svg>

                <!-- Hover-Overlay (optional) -->
                <div
                  v-if="activeEigenverbrauchSegment"
                  class="position-absolute text-center px-3 py-2 rounded-lg"
                  style="
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.9);
                    min-width: 120px;
                    z-index: 10;
                  "
                >
                  <div style="color: #333; font-weight: 600;">
                    {{ getSegmentName(activeEigenverbrauchSegment) }}:
                    {{ getSegmentValue(activeEigenverbrauchSegment, 'eigen') }}%
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/**
 * Vue 3 + Vuetify 3
 */
import { ref, computed } from 'vue'
import { VIcon } from 'vuetify/components'

// Slider values (reactive)
const jahresverbrauch = ref(6000)
const pvLeistung = ref(10.0)
const speicherKapazitaet = ref(6.0)

// Hover states
const activeAutarkieSegment = ref(null)
const activeEigenverbrauchSegment = ref(null)

// Farben
const direktFarbe = '#FFD700'
const batterieFarbe = '#4CAF50'
const netzbezugFarbe = '#444444'
const netzeinspeisungFarbe = '#CCCCCC'

// Kreisumfang (r=54 => circumference ~339.292)
const circumferenceAutarkie = 339.292
const circumferenceEigen = 339.292

// Beispiel-Rechnungen
const jaehrlicheErzeugung = computed(() => pvLeistung.value * 1000)

// Autarkie
const direkterEigenverbrauch = computed(() =>
  Math.min(jaehrlicheErzeugung.value * 0.3, jahresverbrauch.value * 0.3)
)
const batterieentladung = computed(() =>
  Math.min(speicherKapazitaet.value * 300, jahresverbrauch.value * 0.2)
)

// Autarkiegrad
const autarkiegrad = computed(() => {
  if (jahresverbrauch.value === 0) return 0
  return Math.round(
    ((direkterEigenverbrauch.value + batterieentladung.value) / jahresverbrauch.value) * 100
  )
})

// Prozentwerte (Autarkie)
const direktverbrauchProzent = computed(() => {
  if (jahresverbrauch.value === 0) return 0
  return Math.round((direkterEigenverbrauch.value / jahresverbrauch.value) * 100)
})
const batterieentladungProzent = computed(() => {
  if (jahresverbrauch.value === 0) return 0
  return Math.round((batterieentladung.value / jahresverbrauch.value) * 100)
})
const netzbezugProzent = computed(() => {
  return 100 - direktverbrauchProzent.value - batterieentladungProzent.value
})

// Offsets im Donut (Autarkie)
const direktverbrauchOffset = computed(() => {
  return circumferenceAutarkie * (1 - direktverbrauchProzent.value / 100)
})
const batterieentladungOffset = computed(() => {
  return circumferenceAutarkie * (1 - (direktverbrauchProzent.value + batterieentladungProzent.value) / 100)
})

// Eigenverbrauch
const batterieladung = computed(() =>
  Math.min(speicherKapazitaet.value * 300, jaehrlicheErzeugung.value * 0.2)
)
const eigenverbrauchsanteil = computed(() => {
  if (jaehrlicheErzeugung.value === 0) return 0
  return Math.round(((direkterEigenverbrauch.value + batterieladung.value) / jaehrlicheErzeugung.value) * 100)
})

// Prozentwerte (Eigenverbrauch)
const direktverbrauchProzentEigen = computed(() => {
  if (jaehrlicheErzeugung.value === 0) return 0
  return Math.round((direkterEigenverbrauch.value / jaehrlicheErzeugung.value) * 100)
})
const batterieladungProzent = computed(() => {
  if (jaehrlicheErzeugung.value === 0) return 0
  return Math.round((batterieladung.value / jaehrlicheErzeugung.value) * 100)
})
const netzeinspeisungProzent = computed(() => {
  return 100 - direktverbrauchProzentEigen.value - batterieladungProzent.value
})

// Offsets im Donut (Eigenverbrauch)
const direktverbrauchOffsetEigen = computed(() => {
  return circumferenceEigen * (1 - direktverbrauchProzentEigen.value / 100)
})
const batterieladungOffset = computed(() => {
  return circumferenceEigen * (1 - (direktverbrauchProzentEigen.value + batterieladungProzent.value) / 100)
})

// Für Tooltip-Overlays
function getSegmentName(segment) {
  const names = {
    netzbezug: 'Netzbezug',
    batterieentladung: 'Batterieentladung',
    direktverbrauch: 'Direktverbrauch',
    netzeinspeisung: 'Netzeinspeisung',
    batterieladung: 'Batterieladung',
    direktverbrauch_eigen: 'Direktverbrauch'
  }
  return names[segment] || '???'
}

function getSegmentValue(segment, type) {
  if (type === 'autarkie') {
    const values = {
      netzbezug: netzbezugProzent.value,
      batterieentladung: batterieentladungProzent.value,
      direktverbrauch: direktverbrauchProzent.value
    }
    return values[segment]
  } else if (type === 'eigen') {
    const values = {
      netzeinspeisung: netzeinspeisungProzent.value,
      batterieladung: batterieladungProzent.value,
      direktverbrauch_eigen: direktverbrauchProzentEigen.value
    }
    return values[segment]
  }
  return 0
}
</script>

<style scoped>
/* Optionale Anpassungen für z.B. position-absolute */
.position-absolute {
  position: absolute !important;
}
</style>
