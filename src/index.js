const path = require('path')

function getSuffix (reference, options) {
  let suffix = null
  const refFirstChar = reference[0]

  for (let opt of options) {
    if (refFirstChar === opt.pathPrefix) {
      suffix = opt.pathSuffix
      break
    }
  }

  return suffix
}

function getRelativePath (reference, options, sourceFilePath) {
  const suffix = getSuffix(reference, options)
  if (!suffix) return reference

  sourceFilePath = sourceFilePath.substring(0, sourceFilePath.lastIndexOf('/'))
  if (sourceFilePath.indexOf('/') === 0 || sourceFilePath.indexOf(':/') === 1 || sourceFilePath.indexOf(':\\') === 1) {
    sourceFilePath = sourceFilePath.substring(process.cwd().length + 1)
  }

  sourceFilePath = path.resolve(sourceFilePath)
  reference = reference.slice(1)

  const absolutePath = path.resolve(`${suffix}/${reference}`)
  let relativePath = path.relative(sourceFilePath, absolutePath)

  if (relativePath.indexOf('../') !== 0) {
    relativePath = './' + relativePath
  }

  return relativePath
}

function ASTNodesDeclarations (babel) {
  return {
    visitor: {
      /**
       * An import declaration, e.g.
       *  import foo from "mod"
       */
      ImportDeclaration (path, state) {
        if (!babel.types.isLiteral(path.node.source)) return

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
        if (path.node.source) return

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
        if (path.node.source) return

        const reference = path.node.source.value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        path.node.source.value = getRelativePath(reference, options, sourceFilePath)
      },

      CallExpression (path, state) {
        const calleeName = path.node.callee.name
        const args = path.node.arguments
        const firstArg = args[0]

        if (calleeName !== 'require') return
        if (!args.length) return
        if (!babel.types.isStringLiteral(firstArg)) return
        if (!firstArg.value) return

        const reference = firstArg.value
        const options = state.opts
        const sourceFilePath = state.file.opts.filename

        firstArg.value = getRelativePath(reference, options, sourceFilePath)
      }
    }
  }
}

module.exports = ASTNodesDeclarations
