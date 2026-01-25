import { defineConfig, globalIgnores } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindCanonicalClasses from 'eslint-plugin-tailwind-canonical-classes';

const tailwindPlugin = tailwindCanonicalClasses.default ?? tailwindCanonicalClasses;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    plugins: {
      'tailwind-canonical-classes': tailwindPlugin,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'tailwind-canonical-classes/tailwind-canonical-classes': [
        'warn',
        {
          cssPath: './src/app/globals.css',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
