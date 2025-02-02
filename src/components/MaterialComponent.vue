<template>
  <v-dialog v-model="internalDialog" max-width="600px" aria-labelledby="dialog-title">
    <v-card class="dialog-card">
      <!-- Header -->
      <v-card-title class="headline justify-between dialog-header">
        <h2 id="dialog-title" class="text-h6 font-weight-bold">Komponenten</h2>
        <v-btn icon aria-label="Dialog schließen" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Inhalt -->
      <v-card-text>
        <div class="component-list" aria-labelledby="component-list">
          <!-- Rundum-Sorglos-Paket -->
          <div class="component-item styled-box" role="region" aria-labelledby="package-title">
            <v-img
              src="@/assets/rundumSorglosPaket.webp"
              alt="Rundum-Sorglos-Paket"
              class="component-image"
              contain
            ></v-img>
            <h3 id="package-title" class="font-weight-bold mt-1">Rundum-Sorglos-Paket</h3>
            <ul class="text-body-2 text-center">
              <li>Stromzählerausch</li>
              <li>Anmeldung beim Netzbetreiber</li>
              <li>Dachunterkonstruktion</li>
              <li>Zählerschranksanierung (bei Bedarf)</li>
            </ul>
          </div>

          <!-- Hochleistungsmodule -->
          <div class="component-item styled-box" role="region" aria-labelledby="module-title">
            <v-img
              src="@/assets/solar.webp"
              alt="46 Hochleistungsmodule"
              class="component-image"
              contain
            ></v-img>
            <h3 id="module-title" class="font-weight-bold mt-1">Hochleistungsmodule</h3>
            <p class="text-body-2 text-center">
              Premium Technologie mit 25 Jahren Garantie
            </p>
          </div>

          <!-- Wechselrichter -->
          <div class="component-item styled-box" role="region" aria-labelledby="inverter-title">
            <v-img
              src="@/assets/wechselrichter.webp"
              alt="Wechselrichter"
              class="component-image"
              contain
            ></v-img>
            <h3 id="inverter-title" class="font-weight-bold mt-1">Wechselrichter</h3>
            <p class="text-body-2 text-center">Hochwertige Stromumwandlung</p>
          </div>

          <!-- Montageleistung -->
          <div class="component-item styled-box" role="region" aria-labelledby="installation-title">
            <v-img
              src="@/assets/montage.webp"
              alt="Montageleistung"
              class="component-image"
              contain
            ></v-img>
            <h3 id="installation-title" class="font-weight-bold mt-1">Montageleistung</h3>
            <p class="text-body-2 text-center">
              Professionelle Installation inkl. Netzanmeldung
            </p>
          </div>

          <!-- Optional -->
          <h3 class="font-weight-bold mb-2 optional-header">Optional</h3>

          <!-- Wallbox -->
          <div class="component-item styled-box" role="region" aria-labelledby="wallbox-title">
            <v-img
              src="@/assets/wallbox.webp"
              alt="Wallbox"
              class="component-image"
              contain
            ></v-img>
            <h4 id="wallbox-title" class="font-weight-bold mt-1">Wallbox</h4>
            <p class="text-body-2 text-center">inkl. Ladekabel</p>
          </div>

          <!-- Batteriespeicher -->
          <div class="component-item styled-box" role="region" aria-labelledby="battery-title">
            <v-img
              src="@/assets/batteriespeicher.webp"
              alt="Batteriespeicher"
              class="component-image"
              contain
            ></v-img>
            <h4 id="battery-title" class="font-weight-bold mt-1">Batteriespeicher</h4>
            <p class="text-body-2 text-center">
              Langlebige Speicher in verschiedenen Größen
            </p>
          </div>
        </div>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions>
        <v-btn color="primary" text aria-label="Dialog schließen" @click="closeDialog">
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      internalDialog: this.value,
    };
  },
  watch: {
    value(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit("input", val); 
    },
  },
  methods: {
    closeDialog() {
      this.internalDialog = false; 
    },
  },
};
</script>


<style scoped>
.dialog-card {
  background: #f9f9f9; 
  border-radius: 12px; 
  padding: 12px; 
}

.dialog-header {
  background-color: #ececec; 
  padding: 8px; 
}

.component-list {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 16px; 
}

.styled-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.component-image {
  width: 50px; 
  height: 50px; 
}

.optional-header {
  color: #333;
  text-align: center;
  margin-top: 16px;
}
</style>

