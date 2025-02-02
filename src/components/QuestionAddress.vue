<!-- <template>
  <v-container class="py-10" fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet class="funnel-box" elevation="2">
          <h2 class="text-h5 font-weight-bold">Adresse und Dachfläche</h2>
          <p class="text-body-1 mt-2">
            Geben Sie Ihre Adresse ein und markieren Sie die Dachfläche, um die Fläche zu berechnen.
          </p>
          <!-- Adresseingabe -->
          <v-text-field
            label="Adresse"
            v-model="address"
            outlined
            dense
            placeholder="Geben Sie Ihre Adresse ein"
          ></v-text-field>
          <div id="map" style="width: 100%; height: 500px; margin-top: 20px;"></div>
          <v-row class="mt-4">
            <v-btn color="success" @click="nextStep">Weiter</v-btn>
            <v-btn text @click="goBack">Zurück</v-btn>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddressAndRoofAreaComponent",
  data() {
    return {
      address: "",
      map: null,
      drawingManager: null,
      allOverlays: [],
      area: 0,
    };
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.52, lng: 13.405 }, // Beispielkoordinaten
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        overviewMapControl: false,
        fullscreenControl: false,
        rotateControl: false,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      });

      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: {
          fillColor: "#85c192",
          strokeColor: "#85c192",
          fillOpacity: 0.5,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });
      this.drawingManager.setMap(this.map);

      google.maps.event.addListener(
        this.drawingManager,
        "overlaycomplete",
        (event) => {
          this.allOverlays.push(event);
          const newShape = event.overlay;
          newShape.type = event.type;

          google.maps.event.addListener(newShape.getPath(), "set_at", () => {
            this.updateArea();
          });
          google.maps.event.addListener(newShape.getPath(), "insert_at", () => {
            this.updateArea();
          });
        }
      );
    },
    updateArea() {
      this.area = 0;
      this.allOverlays.forEach((overlay) => {
        this.area += google.maps.geometry.spherical.computeArea(
          overlay.overlay.getPath()
        );
      });
      console.log(`Fläche: ${this.area.toFixed(2)} m²`);
    },
    nextStep() {
      this.$emit("next");
    },
    goBack() {
      this.$emit("back");
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.funnel-box {
  background-color: #f8fafc;
  color: #012a4a;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style> -->
