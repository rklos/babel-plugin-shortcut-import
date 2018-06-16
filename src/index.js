const path = require('path')

/**
 * Returns suffix from shortcut
 * @param ref - String from import declaration
 * @param opts - Shortcut options
 * @returns {string}
 */
function getSuffix (ref, opts) {
  let suffix = null
  for (let opt of opts) {
    if (ref[0] === opt.pathPrefix) {
      suffix = opt.pathSuffix
      break
    }
  }

  return suffix
}

/**
 * Returns relative path to shortcutted module path
 * @param ref - String from import declaration
 * @param opts - Shortcut options
 * @param sourceFile - Path to source file
 * @returns {string}
 */
function getRelativePath (ref, opts, sourceFile) {
  const cwd              = process.cwd()
  const suffix           = getSuffix(ref, opts)
  const requiredNoPrefix = ref.slice(1)

  if (!suffix) return ref

  const absolutePath = path.resolve(`${suffix}/${requiredNoPrefix}`)
  let sourcePath     = sourceFile.substring(0, sourceFile.lastIndexOf('/'))
  if (sourcePath.indexOf('/') === 0 || sourcePath.indexOf(':/') === 1 || sourcePath.indexOf(':\\') === 1) {
    sourcePath = sourcePath.substring(cwd.length + 1)
  }
  sourcePath = path.resolve(sourcePath)

  let relativePath = path.relative(sourcePath, absolutePath)
  if (relativePath.indexOf('../') !== 0) {
    relativePath = './' + relativePath
  }

  return relativePath
}

/**
 * Babylon AST nodes
 * @param babel
 * @returns {object}
 */
function shortcutImport (babel) {
  return {
    visitor: {
      /**
       * An import declaration, e.g.
       *  import foo from "mod"
       * @param path
       * @param state
       */
      ImportDeclaration (path, state) {
        if (!babel.types.isLiteral(path.node.source)) return

        const ref        = path.node.source.value
        const opts       = state.opts
        const sourceFile = state.file.opts.filename

        path.node.source.value = getRelativePath(ref, opts, sourceFile)
      },

      /**
       * An export named declaration, e.g.
       *  export {foo, bar}
       *  export {foo} from "mod"
       *  export var foo = 1
       *  export * as foo from "bar"
       * @param path
       * @param state
       */
      ExportNamedDeclaration (path, state) {
        if (path.node.source) return

        const ref        = path.node.source.value
        const opts       = state.opts
        const sourceFile = state.file.opts.filename

        path.node.source.value = getRelativePath(ref, opts, sourceFile)
      },

      /**
       * An export batch declaration, e.g.
       *  export * from "mod"
       * @param path
       * @param state
       */
      ExportAllDeclaration (path, state) {
        if (path.node.source) return

        const ref        = path.node.source.value
        const opts       = state.opts
        const sourceFile = state.file.opts.filename

        path.node.source.value = getRelativePath(ref, opts, sourceFile)
      },

      /**
       * A function or method call expression
       * @param path
       * @param state
       */
      CallExpression (path, state) {
        if (path.node.callee.name !== 'require') return
        if (!path.node.arguments.length) return
        if (!babel.types.isStringLiteral(path.node.arguments[0])) return
        if (!path.node.arguments[0].value) return

        const arg        = path.node.arguments[0]
        const ref        = arg.value
        const opts       = state.opts
        const sourceFile = state.file.opts.filename

        arg.value = getRelativePath(ref, opts, sourceFile)
      }
    }
  }
}

module.exports = shortcutImport
