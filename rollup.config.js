import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';


import pkg from './package.json';

function createRollupConfig(options, callback) {
  const name = options.name;
  const outputName = 'lib/' + [name, options.format, 'js'].join('.');

  const config = {
    input: options.input,
    output: {
      file: outputName,
      format: options.format,
      name: 'launchdarkly-react-client-sdk',
      sourcemap: true,
      globals: { react: 'React' },
      exports: 'named',
    },
    plugins: [
      json(),
      external(),
      typescript({
        tsconfig: options.tsconfig,
        clean: true,
        //useTsconfigDeclarationDir: true
      }),
      options.format === 'umd' &&
        commonjs({
          include: /\/node_modules\//,
        }),
      sourcemaps(),
      options.format !== 'esm' &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}

const name = 'index';
const options = [
  {
    name,
    format: 'cjs',
    input: pkg.source,
  },
  { name, format: 'esm', input: pkg.source },
  {
    name,
    format: 'umd',
    input: pkg.source,
  },
];

export default options.map(option => createRollupConfig(option));
