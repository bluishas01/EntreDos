import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.entredos.app',
  appName: 'Entre Dos',
  webDir: 'dist',
  backgroundColor: '#09090B',
  android: {
    backgroundColor: '#09090B',
    allowMixedContent: false,
  },
  ios: {
    backgroundColor: '#09090B',
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
  },
};

export default config;
