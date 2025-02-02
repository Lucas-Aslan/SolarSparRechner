export default {
    namespaced: true,
    state: {
      stromverbrauch: 0, // Stromverbrauch in kWh/Jahr
      fahrleistung: 0,   // Fahrleistung in km/Jahr
    },
    mutations: {
      setStromverbrauch(state, value) {
        state.stromverbrauch = value;
      },
      setFahrleistung(state, value) {
        state.fahrleistung = value;
      },
    },
    getters: {
      monatlicheErsparnis(state) {
        const strompreisProKWh = 0.4; // Beispiel: 0,30 € pro kWh
        const fahrzeugVerbrauchProKm = 0.20; // Beispiel: 15 kWh pro 100 km
        const fahrleistungKosten = state.fahrleistung * fahrzeugVerbrauchProKm * strompreisProKWh;
        const gesamtEinsparung = (state.stromverbrauch + fahrleistungKosten) * strompreisProKWh;
        return gesamtEinsparung / 12; // Pro Monat
      },
      ersparnisIn20Jahren(state, getters) {
        return getters.monatlicheErsparnis * 12 * 20; // In 20 Jahren
      },
      
      photovoltaikLeistung(state) {
        const jahresstromverbrauch = state.stromverbrauch + (state.fahrleistung * 0.15);
        const durchschnittlicheErzeugung = 1000; // kWh/kWp pro Jahr
        
        return Math.round(jahresstromverbrauch / durchschnittlicheErzeugung);
      }
    },
  };
  