import { assert } from 'chai'
import { default as ASTNodesDeclarations } from '../src/index.js'

const ASTNodes = ASTNodesDeclarations().visitor

const state = {
  opts: [
    {
      pathPrefix: '~',
      pathSuffix: 'src/shared/'
    }
  ],
  file: {
    opts: {
      filename: '/home/test/project/src/index.js'
    }
  }
}

let path
suiteSetup(function () {
  path = {
    node: {
      source: {
        value: '~withPrefix'
      },

      callee: {
        name: 'require'
      },

      arguments: [
        {
          value: '~withPrefix'
        }
      ]
    }
  }
})

suite('ImportDeclarationTests', function () {
  const ImportDeclaration = ASTNodes.ImportDeclaration

  test('Passes parameters to getRelativePath function', function () {
    ImportDeclaration(path, state)
    assert.equal(path.node.source.value, './src/shared/withPrefix')
  })

  test('Returns null when no params', function () {
    assert.isNull(ImportDeclaration())
    assert.isNull(ImportDeclaration(path))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(ImportDeclaration({}, state))
    assert.isNull(ImportDeclaration({ source: {} }, state))
    assert.isNull(ImportDeclaration({ source: { value: false } }, state))

    assert.isNull(ImportDeclaration(path, {}))
    assert.isNull(ImportDeclaration(path, { opts: [] }))
    assert.isNull(ImportDeclaration(path, { opts: [], file: {} }))
    assert.isNull(ImportDeclaration(path, { opts: [], file: { opts: {} } }))
    assert.isNull(ImportDeclaration(path, { opts: [], file: { opts: { filename: false } } }))
  })
})

suite('ExportNamedDeclarationTests', function () {
  const ExportNamedDeclaration = ASTNodes.ExportNamedDeclaration

  test('Passes parameters to getRelativePath function', function () {
    ExportNamedDeclaration(path, state)
    assert.equal(path.node.source.value, './src/shared/withPrefix')
  })

  test('Returns null when no params', function () {
    assert.isNull(ExportNamedDeclaration())
    assert.isNull(ExportNamedDeclaration(path))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(ExportNamedDeclaration({}, state))
    assert.isNull(ExportNamedDeclaration({ source: {} }, state))
    assert.isNull(ExportNamedDeclaration({ source: { value: false } }, state))

    assert.isNull(ExportNamedDeclaration(path, {}))
    assert.isNull(ExportNamedDeclaration(path, { opts: [] }))
    assert.isNull(ExportNamedDeclaration(path, { opts: [], file: {} }))
    assert.isNull(ExportNamedDeclaration(path, { opts: [], file: { opts: {} } }))
    assert.isNull(ExportNamedDeclaration(path, { opts: [], file: { opts: { filename: false } } }))
  })
})

suite('ExportAllDeclarationTests', function () {
  const ExportAllDeclaration = ASTNodes.ExportAllDeclaration

  test('Passes parameters to getRelativePath function', function () {
    ExportAllDeclaration(path, state)
    assert.equal(path.node.source.value, './src/shared/withPrefix')
  })

  test('Returns null when no params', function () {
    assert.isNull(ExportAllDeclaration())
    assert.isNull(ExportAllDeclaration(path))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(ExportAllDeclaration({}, state))
    assert.isNull(ExportAllDeclaration({ source: {} }, state))
    assert.isNull(ExportAllDeclaration({ source: { value: false } }, state))

    assert.isNull(ExportAllDeclaration(path, {}))
    assert.isNull(ExportAllDeclaration(path, { opts: [] }))
    assert.isNull(ExportAllDeclaration(path, { opts: [], file: {} }))
    assert.isNull(ExportAllDeclaration(path, { opts: [], file: { opts: {} } }))
    assert.isNull(ExportAllDeclaration(path, { opts: [], file: { opts: { filename: false } } }))
  })
})

suite('CallExpressionTests', function () {
  const CallExpression = ASTNodes.CallExpression

  test('Passes parameters to getRelativePath function', function () {
    CallExpression(path, state)
    assert.equal(path.node.source.value, './src/shared/withPrefix')
  })

  test('Returns null when no params', function () {
    assert.isNull(CallExpression())
    assert.isNull(CallExpression(path))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(CallExpression({ node: {} }, state))
    assert.isNull(CallExpression({ node: { callee: { name: 'invalid' } } }, state))
    assert.isNull(CallExpression({ node: { callee: { name: 'require' } } }, state))
    assert.isNull(CallExpression({ node: { callee: { name: 'require' }, arguments: true } }, state))
    assert.isNull(CallExpression({ node: { callee: { name: 'require' }, arguments: [] } }, state))
    assert.isNull(CallExpression({ node: { callee: { name: 'require' }, arguments: [{}] } }, state))

    assert.isNull(CallExpression(path, {}))
    assert.isNull(CallExpression(path, { opts: [] }))
    assert.isNull(CallExpression(path, { opts: [], file: {} }))
    assert.isNull(CallExpression(path, { opts: [], file: { opts: {} } }))
    assert.isNull(CallExpression(path, { opts: [], file: { opts: { filename: false } } }))
  })
})
