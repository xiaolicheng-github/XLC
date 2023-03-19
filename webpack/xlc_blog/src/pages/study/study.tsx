import { defineComponent} from 'vue';
import './study.scss';

export default defineComponent({
  name: 'study',
  setup() {

    const navs = [
      { id: 'xx', name: '笔记1', icon: 'xx' },
      { id: 'xx', name: '笔记1', icon: 'xx' },
      { id: 'xx', name: '笔记1', icon: 'xx' },
      { id: 'xx', name: '笔记1', icon: 'xx' },
      { id: 'xx', name: '笔记1', icon: 'xx' },
      { id: 'xx', name: '笔记1', icon: 'xx' }
    ];

    function renderFn() {
      return <div class="study-page-component">
      <div class="study-content">
        <div class="left-nav">
          {navs.map(item => (
            <div class="left-nav-item">
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div class="center-content"></div>
        <div class="right-adv"></div>
      </div>
    </div>;
    }
    return {
      renderFn,
    }
  },
  render() {
    return this.renderFn();
  }
})