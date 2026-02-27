import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const config = createTamagui({
  ...defaultConfig,
  // You can add your own customizations here, for example:
  // media: {
  //   ...defaultConfig.media,
  //   // add your own media queries here, if wanted.
  // },
});

export default config;

// Ensure TypeScript properly types everything based on your config
type Conf = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
