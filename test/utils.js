import { assert } from 'chai'
import { getSuffix, getRelativePath, resolveShortcut } from '../src/utils.js'

const options = [
  {
    pathPrefix: '#',
    pathSuffix: 'src/'
  },
  {
    pathPrefix: '~',
    pathSuffix: 'src/shared/'
  }
]

const sourceFilePath = '/home/test/project/src/index.js'

suite('getSuffixTests', function () {
  test('Returns suffix when valid prefix found', function () {
    assert.equal(getSuffix('#withPrefix', options), 'src/')
    assert.equal(getSuffix('~withPrefix', options), 'src/shared/')
  })

  test('Returns null when no prefix found', function () {
    assert.isNull(getSuffix('woPrefix', options))
  })

  test('Returns null when no params', function () {
    assert.isNull(getSuffix())
    assert.isNull(getSuffix('~withPrefix'))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(getSuffix(null, options))
    assert.isNull(getSuffix(10, options))
    assert.isNull(getSuffix({}, options))
    assert.isNull(getSuffix([], options))
    assert.isNull(getSuffix('', options))
    assert.isNull(getSuffix('~withPrefix', null))
    assert.isNull(getSuffix('~withPrefix', 'string'))
    assert.isNull(getSuffix('~withPrefix', 1))
    assert.isNull(getSuffix('~withPrefix', {}))
    assert.isNull(getSuffix('~withPrefix', []))
    assert.isNull(getSuffix('~withPrefix', { pathPrefix: '~' }))
    assert.isNull(getSuffix('~withPrefix', { pathSuffix: 'src/shared/' }))
  })
})

suite('getRelativePathTests', function () {
  test('Returns correct relative path to module when valid data', function () {
    assert.equal(getRelativePath('~withPrefix', options, sourceFilePath), './src/shared/withPrefix')
    assert.equal(getRelativePath('~withPrefix', options, 'src/index.js'), './shared/withPrefix')
    assert.equal(getRelativePath('~withPrefix', options, 'dist/index.js'), '../src/shared/withPrefix')
    assert.equal(getRelativePath('~withPrefix', options, 'index.js'), './src/shared/withPrefix')
  })

  test('Returns reference "as is" when no prefix', function () {
    assert.equal(getRelativePath('woPrefix', options, sourceFilePath), 'woPrefix')
  })

  test('Returns null when no params', function () {
    assert.isNull(getRelativePath())
    assert.isNull(getRelativePath('~withPrefix'))
    assert.isNull(getRelativePath('~withPrefix', options))
  })

  test('Returns null when invalid data', function () {
    assert.isNull(getRelativePath(null, options, sourceFilePath))
    assert.isNull(getRelativePath([], options, sourceFilePath))
    assert.isNull(getRelativePath('~withPrefix', null, sourceFilePath))
    assert.isNull(getRelativePath('~withPrefix', {}, sourceFilePath))
    assert.isNull(getRelativePath('~withPrefix', options, null))
    assert.isNull(getRelativePath('~withPrefix', options, []))
  })
})
