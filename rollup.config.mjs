import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import { readPackage } from 'read-pkg'
import dts from 'rollup-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

const PROFILE = !!process.env.PROFILE

const pkg = await readPackage()

const targets = `
  > 1%,
  last 2 versions,
  not IE > 0,
  not IE_Mob > 0
  node > 14
`

const external = id =>
  [
    '@emotion',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ].find(dep => new RegExp(dep).test(id))

export default [
  {
    external,
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'node_modules',
    },
    plugins: [
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
        plugins: [
          'babel-plugin-annotate-pure-calls',
          '@babel/plugin-transform-runtime',
        ],
        presets: [
          '@babel/preset-typescript',
          ['@babel/env', { loose: true, modules: false, targets }],
          '@babel/preset-react',
          ['@emotion/babel-preset-css-prop', { sourceMap: false }],
        ],
      }),
      nodeResolve({
        extensions: ['.ts', '.tsx'],
        preferBuiltins: true,
      }),
      url({
        limit: 63488,
      }),
      svgr.default({ memo: true }),
      PROFILE &&
        visualizer({
          brotliSize: true,
          filename: '.reports/index.html',
          gzipSize: true,
          open: true,
        }),
    ].filter(Boolean),
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
