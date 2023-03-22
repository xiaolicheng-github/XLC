import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';
import { randomCustomRgbColor, randomNum } from '../../../../xlc_common/random';
import './check-code.scss';

const allCode = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz';

export function createCodeStr(len = 4) {
  let txt = '';
  for (let i = 0; i < len; i++) {
    txt = `${txt}${allCode[randomNum(0, allCode.length)]}`;
  }
  return txt;
}

interface IProps {
  code: string;
  width: number;
  height: number;
  onResetCode: () => void;
}

export default defineComponent({
  name: 'check-code',

  props: {
    code: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 40
    },
    onResetCode: {
      type: Function,
      default: () => {}
    }
  },

  setup(props: IProps | any) {

    const canvasRef = ref();
    const code = ref(props.code);

    let ctx: CanvasRenderingContext2D | any = null;

    watch(
      () => props.code,
      () => {
        code.value = props.code;
        nextTick(() => {
          createCode();
        })
      }
    );

    onMounted(() => {
      ctx = canvasRef.value.getContext('2d');
      createCode();
    });


    function createCode() {
      const codeLen = code.value.length;
      ctx.fillStyle = randomCustomRgbColor(180, 240);
      ctx.fillRect(0, 0, props.width, props.height);
      for (let i = 0; i < codeLen; i++) {
        let txt = code.value[i];
        ctx.fillStyle = randomCustomRgbColor(50, 160);
        ctx.font = randomNum(props.height * 2 / 4, props.height * 3 / 4) + 'px SimHei';
        ctx.textBaseline = 'top';
        let x = 20 + i * (props.width / codeLen);
        let y = randomNum(5, props.height / 4);
        let deg = randomNum(-45, 45);
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      for (let j = 0; j < codeLen; j++) {
        ctx.strokeStyle = randomCustomRgbColor(40, 180)
        ctx.beginPath()
        ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height))
        ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height))
        ctx.stroke()
      }
      for (let k = 0; k < 30; k++) {
        ctx.fillStyle = randomCustomRgbColor(0, 255)
        ctx.beginPath()
        ctx.arc(randomNum(0, props.width), randomNum(0, props.height), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }

    function handleClick() {
      props.onResetCode();
    }

    function renderFn() {
      return <div class="check-code-component" style={{ width: `${props.width}px` }}>
        <canvas onClick={handleClick} width={props.width} height={props.height} ref={canvasRef}></canvas>
      </div>
    }
    return {
      renderFn,
      code
    };
  },

  render() {
    return this.renderFn();
  }
})