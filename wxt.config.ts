import { defineConfig } from 'wxt';

export default defineConfig({
  outDir: 'dist',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Front Mirror - One click camera check',
    action: {
      default_title: 'Front Mirror',
    },
    permissions: ['activeTab'],
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['camera.html', 'content-scripts/content.js', '*'],
      },
    ],
    commands: {
      // The "_execute_action" key runs the same code as the action.onClicked() event,
      // so no additional code is needed.
      _execute_action: {
        description: 'Open camera',
        suggested_key: {
          default: 'Ctrl+Shift+O',
          mac: 'Command+Shift+O',
        },
      },
    },
  },
});
