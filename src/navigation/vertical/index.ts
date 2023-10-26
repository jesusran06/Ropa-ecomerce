import config from './config'
import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },

  // {
  //   title: 'Second page',
  //   to: { name: 'second-page' },
  //   icon: { icon: 'tabler-file' },
  // },
  ...config,
] as VerticalNavItems
