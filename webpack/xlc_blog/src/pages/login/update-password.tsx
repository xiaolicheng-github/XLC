import { defineComponent, ref} from 'vue';
import { Input, Button } from 'ant-design-vue';
import CheckCode, { createCodeStr } from './check-code';
import type { TloginType } from './login';

interface IProps {
  onTypeChange: (type: TloginType) => void;
}

export default defineComponent({
  name: 'login-content',
  props: {
    onTypeChange: {
      type: Function,
      default: (type: TloginType) => {}
    }
  },
  setup(props: IProps) {
    /* 验证码 */
    const verificationCode = ref('');
    /* 表单数据 */
    const email = ref('');
    const password = ref('');
    const code = ref('');
    /* 报错信息 */
    const errMsg = ref('');

    function handleResetCode() {
      verificationCode.value = createCodeStr();
    }

    function handleToRegister() {
      props.onTypeChange('register');
    }

    function renderFn() {
      return (
        <div class="login-content">
          <div class="login-title">登录</div>
          <div class="login-form-item">
            <Input
              v-model={[email.value, 'value']}
              size="large"
              addon-before={'邮箱地址'}
            ></Input>
          </div>
          <div class="login-form-item">
            <Input.Password
              v-model={[password.value, 'value']}
              size="large"
              addon-before={'密码'}
            ></Input.Password>
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
          </div>
          <div class="err-msg">{errMsg.value}</div>
          <div class="opreate-wrap">
            <Button
              type="primary"
              size="large">登录</Button>
            <Button
              class="ml10"
              size="large"
              onClick={handleToRegister}>去注册</Button>
          </div>
        </div>
      );
    }

    return {
      renderFn,
      verificationCode,
      email,
      password,
      code
    }
  },
  render() {
    return this.renderFn();
  }
})