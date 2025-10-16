var t = require('tap')
var Module = require('module')
var originalRequire = Module.prototype.require

// Mock the path module
Module.prototype.require = function(id) {
  if (id === 'path') {
    return { sep: '\\' }
  }
  return originalRequire.apply(this, arguments)
}

var mm = require('../')

// Restore original require
Module.prototype.require = originalRequire

t.equal(mm('x\\y\\z', 'x/y/*/z'), false)
t.equal(mm('x\\y\\w\\z', 'x/y/*/z'), true)
