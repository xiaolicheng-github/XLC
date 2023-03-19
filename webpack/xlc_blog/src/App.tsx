import { defineComponent, ref, render} from 'vue'
import { RouterView } from 'vue-router';
import { routes } from './router/index';
import { useRouter, useRoute } from 'vue-router'
import './App.scss';

export default defineComponent({
  name: 'App',
  setup(props) {

    const route = useRoute();
    const router = useRouter();
    const routePath = ref(route.path);

    function handleClickRoute(item: { name: string, path: string}) {
      console.log(item)
      if(routePath.value === item.path) {
        return;
      }
      router.push({
        name: item.name
      });
      routePath.value = item.path;
    }
    function renderFn() {
      return <div class="root-app">
       <div class="root-header-container">
          <div class="iconfont icon-logo"></div>
          <span class="logo-text">XLC</span>
          {routes.map(item => (
            <span key={item.name}
              class={['route-name', { active: routePath.value === item.path }]}
              onClick={() => handleClickRoute(item)}>
              {item.displayName}
            </span>
          ))}
       </div>
       <div class="root-content-container">
        <RouterView></RouterView>
       </div>
      </div>
    };
    return {
      routePath,
      renderFn
    }
  },
  render() {
    return this.renderFn();
  }
})
