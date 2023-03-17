const home = () => import('../pages/home/home');
const study = () => import('../pages/study/study');
export const routes = [
  {
    path: '/',
    name: 'home',
    displayName: '首页',
    component: home
  },
  {
    path: '/study',
    name: 'study',
    displayName: '学习',
    component: study
  }
]