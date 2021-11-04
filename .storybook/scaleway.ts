import { create } from '@storybook/theming/create'
import brandImage from './assets/scaleway-text.png'

export default create({
  base: 'light',
  brandTitle: 'Scaleway Form',
  brandUrl: 'https://github.com/scaleway/scaleway-form',
  brandImage,
  colorSecondary: '#4f0599',
})
