import { Modal } from 'ant-design-vue';
import { defineComponent, ref} from 'vue';
import { useUserStore } from '../../store/user';
import { Input, Button } from 'ant-design-vue';
import CheckCode, { createCodeStr } from './check-code';
import './login.scss';

export default defineComponent({
  name: 'LoginModal',
  setup() {

    const userStore = useUserStore();
    const loginName = ref('');
    const loginPwd = ref('');

    const code = ref<string>(createCodeStr());

    function handleResetCode() {
      code.value = createCodeStr();
    }

    function renderFn() {
      return <Modal
        visible={userStore.showLogin}
        footer={null}
        width={'100%'}
        wrap-class-name={'full-modal'}
        v-slots={{
          default: () => (
            <div class="login-modal-content">
              <div class="login-content">
                <Input v-model={[loginName.value, 'value']}
                  addon-before={'用户名'}
                ></Input>
                <Input.Password v-model={[loginPwd.value, 'value']}
                  addon-before={'密码'}
                ></Input.Password>
                <CheckCode code={code.value} onResetCode={handleResetCode}></CheckCode>
                <Button></Button>
              </div>
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