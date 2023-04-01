import { sendEmailCode } from "../../request/request";
import { Button, Input, message } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import CheckCode, { createCodeStr } from "./check-code";
import { propTypes } from "./typing";

export default defineComponent({
  name: 'register-content',
  props: propTypes(),
  setup(props) {
    /* 验证码 */
    const verificationCode = ref('');
    /* 表单数据 */
    const name = ref('');
    const password = ref('');
    const beginPassword = ref('');
    const code = ref('');
    const email = ref('');
    const emailCode = ref('');
    const errMsg = ref('');

    function handleResetCode() {
      verificationCode.value = createCodeStr();
    }
    async function handleSendEmailCode() {
      if(!email.value) {
        errMsg.value = '请输入邮箱地址';
      } else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)) {
        errMsg.value = '请输入正确的邮箱地址';
      } else if(!code.value) {
        errMsg.value = '请输入验证码';
      } else if(String(code.value).toLowerCase() !== String(verificationCode.value).toLowerCase()) {
        errMsg.value = '请输入正确的验证码'
      } else {
        errMsg.value = '';
        handleResetCode();
        const isSend = await sendEmailCode({email: email.value })
          .then(() => true)
          .catch(() => false);
        if(isSend) {
          message.success('发送成功');
        }
      }
    }
    function handleRegister() {

    }
    function handleToLogin() {
      props.onTypeChange('login');
    }

    function renderFn() {
      return (
        <div class="login-content">
          <div class="login-title">注册</div>
          <div class="login-form-item">
            <Input
              v-model={[name.value, 'value']}
              size="large"
              addon-before={'用户名'}
            ></Input>
          </div>
          <div class="login-form-item">
            <Input.Password
              v-model={[password.value, 'value']}
              size="large"
              addon-before={'密码'}
            ></Input.Password>
          </div>
          <div class="login-form-item">
            <Input.Password
              v-model={[beginPassword.value, 'value']}
              size="large"
              addon-before={'重新输入密码'}
            ></Input.Password>
          </div>
          <div class="login-form-item">
            <Input
              v-model={[email.value, 'value']}
              size="large"
              addon-before={'邮箱地址'}
            ></Input>
          </div>
          <div class="login-form-item code-wrap">
            <Input
              v-model={[code.value, 'value']}
              size="large"
              class="code-input"
              addon-before={'验证码'}
            ></Input>
            <CheckCode
              code={verificationCode.value}
              onResetCode={handleResetCode}></CheckCode>
            <Button
              class="ml10"
              onClick={handleSendEmailCode}>发送邮箱验证码</Button>
          </div>
          <div class="login-form-item">
            <Input
              v-model={[emailCode.value, 'value']}
              size="large"
              addon-before={'邮箱验证码'}
            ></Input>
          </div>
          <div class="err-msg">{errMsg.value}</div>
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
      );
    }

    return {
      renderFn,
      email
    };
  },
  render() {
    return this.renderFn();
  }
})