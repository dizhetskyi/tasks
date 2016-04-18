config.$inject = ['$routeProvider'];

function config($routeProvider) {
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
}

export default config;