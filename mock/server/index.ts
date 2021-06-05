const express = require('express')
const Mock = require('mockjs')
const chokidar = require('chokidar')
const path = require('path')
const chalk = require('chalk')

const mockDataDir = path.join(process.cwd(), 'mock/server/data')

function registerRoutes(app) {
  const { mocks } = require('./data/index.ts')

  const mockRoutes = mocks.map(mock => {
    return mockRoute(mock.url, mock.type, mock.template)
  })

  for (const mockRoute of mockRoutes) {
    app[mockRoute.method](mockRoute.url, mockRoute.callback)
  }

  return {
    mockStartIndex: app._router.stack.length - Object.keys(mockRoutes).length,
    mockRoutesLength: Object.keys(mockRoutes).length
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDataDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

const mockRoute = (url, method, template) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API_URI}${url}`),
    method: method || 'get',
    callback: (req, res) => {
      console.log('request invoke: ' + req.path)
      res.json(Mock.mock(template))
    }
  }
}

module.exports = app => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  let { mockStartIndex, mockRoutesLength } = registerRoutes(app)

  try {
    chokidar
      .watch(mockDataDir, {
        ignoreInitial: true
      })
      .on('all', (event, path) => {
        if (event === 'change' || event === 'add') {
          app._router.stack.splice(mockStartIndex, mockRoutesLength) // remove mock routes stack
          unregisterRoutes() // clear mock routes cache
          const registerResult = registerRoutes(app) // register mock routes again
          mockStartIndex = registerResult.mockStartIndex
          mockRoutesLength = registerResult.mockRoutesLength
          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! Changed: ${path}`
            )
          )
        }
      })
  } catch (error) {
    console.log(chalk.redBright(error))
  }
}
