import type { PropType } from "vue";
export type TloginType = 'login' | 'password' | 'register';
export const propTypes = () => ({
  onTypeChange: {
    type: Function as PropType<(_type: TloginType) => void>,
    default: (_type?: TloginType) => {}
  }
})