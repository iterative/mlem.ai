const themeConfig = require('@dvcorg/gatsby-theme-iterative/tailwind.config')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {lg, xs, xl, ...maxScreens} = themeConfig.theme.extend.screens

module.exports = {
  content :
          [
            ...themeConfig.content, './src/**/*.js', './src/**/*.jsx',
            './src/**/*.ts', './src/**/*.tsx'
          ],
  darkMode : 'media',
  theme : {
    colors : {
      transparent : 'transparent',
      gray : {
        100 : '#F9F9FA;',
        200 : '#F1F1F4',
        400 : '#B1B5BE',
        600 : '#7A818F',
        700 : '#6F7685',
        750 : '#515661',
        800 : '#484B50',
        900 : '#2E3137',
        bg : '#F5F7F8'
      },
      teal : {
        400 : '#26B3CB',
        DEFAULT : '#13ADC7', 600 : '#1198AF', 800 : '#1497B8'
      },
      orange : {
        400 : '#F6855D',
        DEFAULT : '#F46737', 600 : '#1198AF', 800 : ' #DD5236'
      },
      purple : {
        400 : '#A475DC',
        DEFAULT : '#945DD6', 600 : '#8C58CA', 800 : '#7E51C2'
      },
      red : {400 : '#FC8181'},
      yellow : {400 : '#FFE999'},
      green : {400 : '#68D391'},
      black : '#000',
      white : '#fff'
    },
    fontSize : {
      xxxs : '0.625rem',  // 10px
      xxs : '0.6875rem',  // 11px
      xs : '0.75rem',     // 12px
      sm : '0.8125rem',   // 13px
      tiny : '0.875rem',  // 14px
      base : '1rem',      // 16px
      lg : '1.125rem',    // 18px
      xl : '1.25rem',     // 20px
      '2xl' : '1.375rem', // 22px
      '3xl' : '1.5rem',   // 24px
      '4xl' : '1.625rem', // 26px
      '5xl' : '1.75rem',  // 28px
      '6xl' : '1.875rem', // 30px
      '7xl' : '2rem',     // 32px
      '8xl' : '2.125',    // 34px
      '9xl' : '2.25rem'   // 36px
    },
    lineHeight : {
      1 : '0.625rem',  // 10px,
      2 : '0.75rem',   // 12px
      3 : '0.875rem',  // 14px
      4 : '1rem',      // 16px
      5 : '1.125rem',  // 18px
      6 : '1.25rem',   // 20px
      7 : '1.375rem',  // 22px
      8 : '1.5rem',    // 24px
      9 : '1.625rem',  // 26px
      10 : '1.75rem',  // 28px
      11 : '1.875rem', // 30px
      12 : '2rem',     // 32px
      13 : '2.5rem',   // 40px
      14 : '3rem',     // 48px
      15 : '3.5rem'    // 56px
    },
    fontFamily : {
      brandon : '"BrandonGrotesque", "Tahoma", "Arial", sans-serif',
      mono : 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    borderRadius : {full : '50%', 4 : '4px', 6 : '6px', 8 : '8px'},
    screens : {xs : '414px', ...defaultTheme.screens, ...maxScreens},
    extend : {
      borderOpacity : {33 : '0.33'},
      borderWidth : {5 : '5px'},
      backgroundOpacity : {33 : '0.33'},
      backgroundImage : {
        'teal-purple-gradient' : 'linear-gradient(93.14deg, #13ADC7 0%, #945DD6 100%);',
        'teal-purple-gradient-light' : 'linear-gradient(93.14deg, #26B3CB 0%, #A475DC 100%)',
        'teal-purple-gradient-dark' : 'linear-gradient(93.14deg, #1198AF 0%, #8C58CA 100%)',
        'layout-gradient' : 'linear-gradient(180deg, #F5F7F8 0%, #FFFFFF 100%)',
        'orange-purple-gradient' : 'linear-gradient(270deg, #945DD6 0%, #F46737 100%)',
        'orange-gradient' : 'linear-gradient(#F46737, #F46737)'
      },
      keyframes : {
        blink : {'0%, 100%' : {opacity : '1'}, '50%' : {opacity : '0'}}
      },
      animation : {blink : 'blink 1s ease-in-out infinite'}
    }
  },
  variants : {
    animation : [ 'responsive', 'motion-safe', 'motion-reduce' ],
    extend : {}
  },
  plugins :
  [
    ...themeConfig.plugins, plugin(function({addUtilities}) {
      const newUtilities = {
        '.text-gradient' : {
          '-webkit-text-fill-color' : 'transparent',
          '-moz-text-fill-color' : 'transparent',
          'background-clip' : 'text',
          '-webkit-background-clip' : 'text',
          '-moz-background-clip' : 'text',
          'background-color' : 'black',
          'background-size' : '100%'
        }
      }

      addUtilities(newUtilities)
    })
  ]
}
