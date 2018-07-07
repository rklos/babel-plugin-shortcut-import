import * as path from 'path'
import { getRelativePath } from './utils.js'

function ASTNodesDeclarations (babel) {
  return {
    visitor: {
      /**
       * An import declaration, e.g.
       *  import foo from "mod"
       */
      ImportDeclaration (path, state) {
        if (!path || !path.node || !path.node.source || !path.node.source.value) return null
        if (!state || !state.opts || !state.file || !state.file.opts || !state.file.opts.filename) return null

        const reference = path.node.source.value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        path.node.source.value = getRelativePath(reference, options, sourceFilePath)
      },

      /**
       * An export named declaration, e.g.
       *  export {foo, bar}
       *  export {foo} from "mod"
       *  export var foo = 1
       *  export * as foo from "bar"
       */
      ExportNamedDeclaration (path, state) {
        if (!path || !path.node || !path.node.source || !path.node.source.value) return null
        if (!state || !state.opts || !state.file || !state.file.opts || !state.file.opts.filename) return null

        const reference = path.node.source.value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        path.node.source.value = getRelativePath(reference, options, sourceFilePath)
      },

      /**
       * An export batch declaration, e.g.
       *  export * from "mod"
       */
      ExportAllDeclaration (path, state) {
        if (!path || !path.node || !path.node.source || !path.node.source.value) return null
        if (!state || !state.opts || !state.file || !state.file.opts || !state.file.opts.filename) return null

        const reference = path.node.source.value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        path.node.source.value = getRelativePath(reference, options, sourceFilePath)
      },

      CallExpression (path, state) {
        if (!path || !path.node) return null
        if (!path.node.callee || path.node.callee.name !== 'require') return null
        if (!path.node.arguments || !Array.isArray(path.node.arguments)) return null
        if (!path.node.arguments[0] || !path.node.arguments[0].value) return null
        if (!state || !state.opts || !state.file || !state.file.opts || !state.file.opts.filename) return null

        const reference = path.node.arguments[0].value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        path.node.arguments[0].value = getRelativePath(reference, options, sourceFilePath)
      }
    }
  }
}

module.exports = ASTNodesDeclarations
