import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'; // グローバルスタイルを適用するために使用

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          padding: 0, // すべての要素に対して padding を 0 に設定
        },
      },
    },
  },
});
