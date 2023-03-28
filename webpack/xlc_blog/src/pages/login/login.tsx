import { Modal } from 'ant-design-vue';
import { defineComponent, ref} from 'vue';
import { useUserStore } from '../../store/user';
import { Input, Button, message } from 'ant-design-vue';
import CheckCode, { createCodeStr } from './check-code';
import { sendEmailCode } from '../../request/request';
import './login.scss';

export default defineComponent({
  name: 'LoginModal',
  setup() {
    const userStore = useUserStore();
    /* 登录表单 */
    const loginName = ref('');
    const loginPwd = ref('');
    const loginCode = ref('');
    const loginErrMsg = ref('');
    /* 验证码 */
    const code = ref<string>(createCodeStr());
    /* 是否为注册 */
    const isRegister = ref(false);
    /* 注册表单 */
    const regName = ref('');
    const regPwd = ref('');
    const regBeginPwd = ref('');
    const regCode = ref('');
    const emailAddr = ref('');
    const emailAddrCode = ref('');
    const regErrMsg = ref('');
    /*  */

    function handleCancel() {
      userStore.setShowLogin(false);
    }
    function handleResetCode() {
      code.value = createCodeStr();
    }
    function handleToRegister() {
      handleResetCode();
      isRegister.value = true;
    }
    function handleToLogin() {
      handleResetCode();
      isRegister.value = false;
    }
    function handleRegister() {
    }

    async function handleSendEmailCode() {
      if(!emailAddr.value) {
        regErrMsg.value = '请输入邮箱地址';
      } else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(emailAddr.value)) {
        regErrMsg.value = '请输入正确的邮箱地址';
      } else if(!regCode.value) {
        regErrMsg.value = '请输入验证码';
      } else if(String(regCode.value).toLowerCase() !== String(code.value).toLowerCase()) {
        regErrMsg.value = '请输入正确的验证码'
      } else {
        regErrMsg.value = '';
        handleResetCode();
        const isSend = await sendEmailCode({email: emailAddr.value })
          .then(() => true)
          .catch(() => false);
        if(isSend) {
          message.success('发送成功');
        }
      }
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
              {isRegister.value
              ? <div class="login-content">
                <div class="login-title">注册</div>
                <div class="login-form-item">
                  <Input
                    v-model={[regName.value, 'value']}
                    size="large"
                    addon-before={'用户名'}
                  ></Input>
                </div>
                <div class="login-form-item">
                  <Input.Password
                    v-model={[regPwd.value, 'value']}
                    size="large"
                    addon-before={'密码'}
                  ></Input.Password>
                </div>
                <div class="login-form-item">
                  <Input.Password
                    v-model={[regBeginPwd.value, 'value']}
                    size="large"
                    addon-before={'重新输入密码'}
                  ></Input.Password>
                </div>
                <div class="login-form-item">
                  <Input
                    v-model={[emailAddr.value, 'value']}
                    size="large"
                    addon-before={'邮箱地址'}
                  ></Input>
                </div>
                <div class="login-form-item code-wrap">
                  <Input
                    v-model={[regCode.value, 'value']}
                    size="large"
                    class="code-input"
                    addon-before={'验证码'}
                  ></Input>
                  <CheckCode
                    code={code.value}
                    onResetCode={handleResetCode}></CheckCode>
                  <Button
                    class="ml10"
                    onClick={handleSendEmailCode}>发送邮箱验证码</Button>
                </div>
                <div class="login-form-item">
                  <Input
                    v-model={[emailAddrCode.value, 'value']}
                    size="large"
                    addon-before={'邮箱验证码'}
                  ></Input>
                </div>
                <div class="err-msg">{regErrMsg.value}</div>
                <div class="opreate-wrap">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleRegister}>注册</Button>
                  <Button
                    class="ml10"
                    size="large"
                    onClick={handleToLogin}>去登录</Button>
                </div>
              </div>
              : <div class="login-content">
              <div class="login-title">登录</div>
              <div class="login-form-item">
                <Input
                  v-model={[loginName.value, 'value']}
                  size="large"
                  addon-before={'用户名'}
                ></Input>
              </div>
              <div class="login-form-item">
                <Input.Password
                  v-model={[loginPwd.value, 'value']}
                  size="large"
                  addon-before={'密码'}
                ></Input.Password>
              </div>
              <div class="login-form-item code-wrap">
                <Input
                  v-model={[loginCode.value, 'value']}
                  size="large"
                  class="code-input"
                  addon-before={'验证码'}
                ></Input>
                <CheckCode
                  code={code.value}
                  onResetCode={handleResetCode}></CheckCode>
              </div>
              <div class="err-msg">{loginErrMsg.value}</div>
              <div class="opreate-wrap">
                <Button
                  type="primary"
                  size="large">登录</Button>
                <Button
                  class="ml10"
                  size="large"
                  onClick={handleToRegister}>去注册</Button>
              </div>
            </div>}
              
            </div>
          )
        }}>  
      </Modal>
    }
    return {
      renderFn,
      userStore,
      emailAddr
    }
  },
  render() {
    return this.renderFn();
  }
});