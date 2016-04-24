const settings = {
  githubClientId: 'e7037ffd60cfd5c102ff',
  githubSecret: '4ee8fd0af026dcd9ce572efcfb8145e1b4ffc4ec',
  secret: 'secret-123456'
}

module.exports = {
  applyToApp: app => {
    Object.keys(settings).forEach(s => {
      app.set(s, settings[s])
    })
  }
}
