import { Modal } from 'ant-design-vue';
import { defineComponent, ref} from 'vue';
import { useUserStore } from '../../store/user';
import LoginContent from './login-content';
import RegisterContent from './register-content';
import './login.scss';
import type { TloginType } from './typing';

export default defineComponent({
  name: 'LoginModal',
  setup() {
    const userStore = useUserStore();
    /* 当前页面状态 */
    const curLoginType = ref<TloginType>('login');


    function handleCancel() {
      userStore.setShowLogin(false);
    }

    function handleLoginTypeChange(type: TloginType) {
      curLoginType.value = type;
    }

    function renderFn() {
      return <Modal
        visible={userStore.showLogin}
        footer={null}
        width={'100%'}
        wrap-class-name={'full-modal'}
        onCancel={handleCancel}
        v-slots={{
          default: () => (
            <div class="login-modal-content">
              {(() => {
                if(curLoginType.value === 'login') {
                  return <LoginContent
                    onTypeChange={handleLoginTypeChange}
                  ></LoginContent>;
                }
                if(curLoginType.value === 'register') {
                  return <RegisterContent
                    onTypeChange={handleLoginTypeChange}
                  ></RegisterContent>;
                }
                if(curLoginType.value === 'password') {
                  return undefined;
                }
                return undefined;
              })()}
            </div>
          )
        }}>  
      </Modal>
    }
    return {
      renderFn,
      userStore
    }
  },
  render() {
    return this.renderFn();
  }
});