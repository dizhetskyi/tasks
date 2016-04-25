class AuthController {

  constructor($scope, $auth, $route, $location, usersService){

    this.$scope = $scope;
    this.$auth = $auth;
    this.$route = $route;
    this.$location = $location;
    this.usersService = usersService;

    this.userTasks = [];

    this.isAuthenticated = this.$auth.isAuthenticated();

    if (this.isAuthenticated){
      this.displayName = this.$auth.getPayload().login;
      this.getUserTasks();
    }

    this.$scope.$on('$routeChangeStart', (scope, next, current) => {
      this.checkPermissions(next, $location.path());
    })

  }

  getUserTasks(){
    this.usersService.getTasks()
      .then(res => {
        if (res.data.success) {
          this.userTasks = res.data.tasks;
        }
      })
  }

  assignTask(id){
    this.usersService.assignTask(id)
      .then(res => {
        if (res.data.success){
          this.userTasks.push(res.data.addedId)
        }
      })
  }

  dismissTask(id){
    this.usersService.dismissTask(id)
      .then(res => {
        if (res.data.success){
          this.userTasks = this.userTasks.filter(t => t !== res.data.removedId)
        }
      })
  }

  taskIsAssigned(taskId){
    return this.userTasks.indexOf(taskId) > -1;
  }

  authenticate($event, provider){
    this.authInProgress = true;
    this.$auth.authenticate(provider)
      .then(res => {
        this.isAuthenticated = true;
        this.displayName = this.$auth.getPayload().login;
        this.getUserTasks();
        
        this.authInProgress = false;

        if (this.$route.current.params.redirectTo){
          this.$location.url(this.$route.current.params.redirectTo);
        } else {
          this.checkPermissions(this.$route.current);
        }

      });
  }

  logout(){
    this.$auth.logout();
    this.isAuthenticated = false;

    this.checkPermissions(this.$route.current);

  }

  onForbiddenRoute(nextUrl){
    let url = '/login';

    url += '?redirectTo=' + encodeURIComponent(nextUrl);

    this.$location.url(url);
  }

  onPermissiveRoute(){
    this.$location.url('/');
  }

  checkPermissions(route, nextUrl){

    const { permissions } = route.$$route;

    if (permissions){
      Object.keys(permissions).forEach((key) => {

        if (key === 'loggedIn'){
          if (permissions[key] === true){
            if (!this.isAuthenticated) this.onForbiddenRoute(nextUrl);
          } else {
            if (this.isAuthenticated) this.onPermissiveRoute();
          }
        }

      })
    }
  }

}

AuthController.$inject = ['$scope', '$auth', '$route', '$location', 'usersService']

export default AuthController;
