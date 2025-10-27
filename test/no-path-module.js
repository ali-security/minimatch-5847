var t = require('tap')
var Module = require('module')
var originalRequire = Module.prototype.require

// Mock the path module to throw an error (simulating no path module)
Module.prototype.require = function(id) {
  if (id === 'path') {
    throw new Error('Cannot find module \'path\'')
  }
  return originalRequire.apply(this, arguments)
}

var mm = require('../')

// Restore original require
Module.prototype.require = originalRequire

t.equal(mm.sep, '/')
