import { resolve } from 'path'
import { argv } from 'yargs'

const PROJECT_NAME = 'laamginghong-design'
const PROJECT_ROOT = resolve(__dirname, '../')

const IS_DEV = process.env.NODE_MODE !== 'production'
const IS_ANALYZE = !!argv.analyze

export { PROJECT_NAME, PROJECT_ROOT, IS_DEV, IS_ANALYZE }
