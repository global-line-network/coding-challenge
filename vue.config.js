module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // publicPath: '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/portfolio' : '/'
}
