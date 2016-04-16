config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'IndexController as vm',
      templateUrl: '/js/routes/index/indexView.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}

export default config;