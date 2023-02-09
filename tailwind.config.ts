import postcss from 'postcss'
import { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { objectify } from 'postcss-js'
import { readFileSync } from 'fs'

module.exports = <Config>{
  content: [
    `/components/**/*.{vue,js,ts,jsx,tsx}`,
    `/layouts/**/*.vue`,
    `/pages/**/*.vue`,
    `/composables/**/*.{js,ts}`,
    `/plugins/**/*.{js,ts}`,
    `/App.{js,ts,vue}`,
    `/app.{js,ts,vue}`,
    `/Error.{js,ts,vue}`,
    `/error.{js,ts,vue}`,
    '/assets/**/*.pcss',
    '/assets/**/*.css',
  ],

  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['"Noto Sans"', 'Helvetica'],
      serif: ['Volkhov', 'serif'],
      funky: ['Mali', 'Volkhov', 'serif']
    },
    extend: {
      colors: {
        'primary-light': '#656100',
        'on-primary-light': '#ffffff',
        'primary-container-light': '#ede76d',
        'on-primary-container-light': '#1e1c00',
        'secondary-light': '#2a55cb',
        'on-secondary-light': '#ffffff',
        'secondary-container-light': '#dce1ff',
        'on-secondary-container-light': '#00164f',
        'tertiary-light': '#3e6655',
        'on-tertiary-light': '#ffffff',
        'tertiary-container-light': '#c0ecd6',
        'on-tertiary-container-light': '#002115',
        'error-light': '#ba1a1a',
        'on-error-light': '#ffffff',
        'error-container-light': '#ffdad6',
        'on-error-container-light': '#410002',
        'outline-light': '#7a7768',
        'background-light': '#fffbff',
        'on-background-light': '#201c00',
        'surface-light': '#fffbff',
        'on-surface-light': '#201c00',
        'surface-variant-light': '#e7e3d1',
        'on-surface-variant-light': '#49473a',
        'inverse-surface-light': '#373100',
        'inverse-on-surface-light': '#fff2a7',
        'primary-dark': '#d1cb54',
        'on-primary-dark': '#343200',
        'primary-container-dark': '#4c4900',
        'on-primary-container-dark': '#ede76d',
        'secondary-dark': '#b6c4ff',
        'on-secondary-dark': '#00287d',
        'secondary-container-dark': '#003baf',
        'on-secondary-container-dark': '#dce1ff',
        'tertiary-dark': '#a5d0bb',
        'on-tertiary-dark': '#0d3728',
        'tertiary-container-dark': '#264e3e',
        'on-tertiary-container-dark': '#c0ecd6',
        'error-dark': '#ffb4ab',
        'on-error-dark': '#690005',
        'error-container-dark': '#93000a',
        'on-error-container-dark': '#ffdad6',
        'outline-dark': '#949181',
        'background-dark': '#201c00',
        'on-background-dark': '#f7e468',
        'surface-dark': '#201c00',
        'on-surface-dark': '#f7e468',
        'surface-variant-dark': '#49473a',
        'on-surface-variant-dark': '#cac7b5',
        'inverse-surface-dark': '#f7e468',
        'inverse-on-surface-dark': '#201c00',
        'surface1-light': 'rgba(101, 97, 0, 0.05)',
        'surface2-light': 'rgba(101, 97, 0, 0.08)',
        'surface3-light': 'rgba(101, 97, 0, 0.11)',
        'surface4-light': 'rgba(101, 97, 0, 0.12)',
        'surface5-light': 'rgba(101, 97, 0, 0.14)',
        'surface1-dark': 'rgba(209, 203, 84, 0.05)',
        'surface2-dark': 'rgba(209, 203, 84, 0.08)',
        'surface3-dark': 'rgba(209, 203, 84, 0.11)',
        'surface4-dark': 'rgba(209, 203, 84, 0.12)',
        'surface5-dark': 'rgba(209, 203, 84, 0.14)',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const base = readFileSync(
        './assets/extraCss/base.pcss',
      ).toString()
      addBase(objectify(postcss.parse(base)))
    }),
  ],
}
