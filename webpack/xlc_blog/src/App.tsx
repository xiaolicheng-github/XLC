import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router';
import { routes } from './router/index';
import { useRouter, useRoute } from 'vue-router';
import { Popover } from 'ant-design-vue';
import { useUserStore } from './store/user';
import LoginModal from './pages/login/login';
import './App.scss';

export default defineComponent({
  name: 'App',
  setup(props) {

    const route = useRoute();
    const router = useRouter();
    const routePath = ref(route.path);

    const userPopVisible = ref(false);

    const userStore = useUserStore();

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
    function showLogin() {
      userStore.setShowLogin(true);
      userPopVisible.value = false;
    }
    function loginOut() {

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
          <Popover
            v-model={[userPopVisible.value, 'visible']}
            trigger="click"
            placement={'bottom'}
            v-slots={{
              content: () => (
                <div class="app-component-header-user-pop-list">
                  <div class="user-pop-list-item" onClick={showLogin}>登录</div>
                  <div class="user-pop-list-item" onClick={loginOut}>退出登录</div>
                </div>
              )
            }}>
            <div class="user-info">
              <div class="user-img"></div>
              <span class="user-name">xxx</span>
            </div>
          </Popover>
       </div>
       <div class="root-content-container">
        <RouterView></RouterView>
       </div>
       <LoginModal></LoginModal>
      </div>
    };
    return {
      routePath,
      renderFn,
      userStore
    }
  },
  render() {
    return this.renderFn();
  }
})
