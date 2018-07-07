import * as path from 'path'

function getSuffix (reference = '', options = []) {
  if (typeof reference !== 'string') return null
  if (!Array.isArray(options)) return null
  const foundOption = options.find(option => option.pathPrefix === reference[0])
  return (foundOption) ? foundOption.pathSuffix : null
}

function getRelativePath (reference = null, options = [], sourceFilePath = null) {
  if (!reference || !options || !sourceFilePath) return null
  if (typeof reference !== 'string' || typeof sourceFilePath !== 'string') return null
  if (!Array.isArray(options)) return null

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

export {
  getSuffix,
  getRelativePath
}
