config.$inject = ['$routeProvider', '$authProvider'];

function config($routeProvider, $authProvider) {
  $routeProvider
    .when('/', {
      controller: 'IndexController as vm',
      templateUrl: '/js/routes/index/indexView.html'
    })
    .when('/newTask', {
      controller: 'TaskFormController as vm',
      templateUrl: '/js/routes/taskForm/taskFormView.html',
      isNewModel: true
    })
    .when('/task/:slug', {
      controller: 'TaskController as vm',
      templateUrl: '/js/routes/task/taskView.html'
    })
    .when('/task/:slug/edit', {
      controller: 'TaskFormController as vm',
      templateUrl: '/js/routes/taskForm/taskFormView.html',
      isNewModel: false
    })
    .otherwise({
      redirectTo: '/'
    })


  $authProvider.github({
    clientId: 'e7037ffd60cfd5c102ff',
    url: 'http://localhost:8888/auth/github'
  });
}

export default config;