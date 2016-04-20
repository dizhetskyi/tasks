config.$inject = ['$httpProvider', '$routeProvider', '$authProvider'];

function config($httpProvider, $routeProvider, $authProvider) {

  // $httpProvider.interceptors.push(function($q) {
  //   return {
  //     request: function(config) {
  //       return config;
  //     },
  //     response: function(res) {
  //       console.log(res);
  //       return res;
  //     }
  //   };
  // });

  $routeProvider
    .when('/', {
      controller: 'IndexController as vm',
      templateUrl: '/js/routes/index/indexView.html'
    })
    .when('/protected', {
      template: 'protected url',
      resolve: {
        isLoggedIn: ['$auth', '$location', function($auth, $location) {
          if (!$auth.isAuthenticated()){
            $location.path('/');
            return false;
          }
          return true;
        }]
      }
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