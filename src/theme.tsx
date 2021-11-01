// import { theme as chakraTheme } from '@chakra-ui/core'
import { ColorMode, ThemeConfig, theme as baseTheme, ChakraTheme } from '@chakra-ui/react'
import { createBreakpoints } from "@chakra-ui/theme-tools"

// const fonts = { ...chakraTheme.fonts, heading: `'M PLUS Rounded 1c', serif`, body: `'M PLUS Rounded 1c', sans-serif, system-ui`, mono: `'M PLUS Rounded 1c', monospace` }
const fonts = { ...baseTheme.fonts, mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em"
})

export const config: ThemeConfig = {
  initialColorMode: "light" as ColorMode,
  useSystemColorMode: false,
}

export const theme: ChakraTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    black: '#16161D',
    dark: {
      50: '#e8f0ff',
      100: '#cfd6e3',
      200: '#b5bccc',
      300: '#97a2b4',
      400: '#7b899d',
      500: '#626d84',
      600: '#4b5368',
      700: '#343a4b',
      800: '#1e2030',
      900: '#070718',
    },
    primary:
    {
      50: '#e0f0ff',
      100: '#b8d5fa',
      200: '#8ebef1',
      300: '#63a8e8',
      400: '#3994e0',
      500: '#1f70c6',
      600: '#134d9b',
      700: '#082f70',
      800: '#001746',
      900: '#00061d',
    },
    secondary:
    {
      50: '#ffe2fa',
      100: '#ffb1f4',
      200: '#ff7fed',
      300: '#ff4cea',
      400: '#ff1aea',
      500: '#e600d9',
      600: '#b4009e',
      700: '#810069',
      800: '#4f003a',
      900: '#1e0014',
    }
  },
  fonts,
  breakpoints,
  // icons: {
  //   logo: {
  //     path: (
  //       <svg
  //         width="3000"
  //         height="3163"
  //         viewBox="0 0 3000 3163"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <rect width="3000" height="3162.95" fill="none" />
  //         <path
  //           d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
  //           fill="currentColor"
  //         />
  //       </svg>
  //     ),
  //     viewBox: '0 0 3000 3163',
  //   },
  // },
}

export default theme
