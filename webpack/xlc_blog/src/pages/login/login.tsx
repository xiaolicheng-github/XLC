import { defineComponent} from 'vue';
import './login.scss';

export default defineComponent({
  name: 'login',
  setup() {
    function renderFn() {
      return <div>登录</div>
    }
    return {
      renderFn
    }
  },
  render() {
    return this.renderFn();
  }
});