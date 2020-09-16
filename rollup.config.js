import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'
import rollupPluginTsPaths from 'rollup-plugin-ts-paths'
import sizes from 'rollup-plugin-sizes'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  output: [
    { file: 'lib/laamginghong-design.esm.min.js', format: 'es' },
    {
      file: 'lib/laamginghong-design.umd.min.js',
      format: 'umd',
      name: 'laamginghong-design',
    },
  ],

  external: ['react', 'react-dom'],
  plugins: [
    del({ targets: 'lib/*' }),
    nodeResolve(),
    commonjs(),
    rollupPluginTsPaths(),
    typescript(),
    eslint({
      fix: true,
    }),
    sourcemaps(),
    terser(),
    sizes(),
  ],
}
