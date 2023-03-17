import { defineComponent} from 'vue'
import './home.scss';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="home-page">vue3</div>
    )
  }
})
