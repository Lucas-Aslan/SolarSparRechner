import { createStore } from 'vuex';
import savings from './savings';

export default createStore({
  modules: {
    savings,
  },
});

