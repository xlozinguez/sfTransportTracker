exports.config = {
  bundles: [
    { components: ['sf-app', 'sf-map', 'sf-vehicle', 'sf-routeList'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
