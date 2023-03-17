import { defineComponent} from 'vue'
import { RouterView } from 'vue-router';
import './App.scss';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
       <div class="root-header-container">
          <div class="iconfont icon-logo"></div>
          <span class="logo-text">XLC</span>
       </div>
       <div class="root-content-container">
        <RouterView></RouterView>
       </div>
      </>
    )
  }
})
