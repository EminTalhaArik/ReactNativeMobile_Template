module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@app': './src/app',
        '@features': './src/features',
        '@shared': './src/shared',
        '@tests': './src/tests'
      }
    }],
    'react-native-reanimated/plugin'
  ]
};
