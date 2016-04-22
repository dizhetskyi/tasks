class AuthController {

  constructor($scope, $auth, $route, $location){

    this.$scope = $scope;
    this.$auth = $auth;
    this.$route = $route;
    this.$location = $location;

    this.isAuthenticated = this.$auth.isAuthenticated();

    if (this.isAuthenticated){
      this.displayName = this.$auth.getPayload().login;
    }

    this.$scope.$on('$routeChangeStart', (scope, next, current) => {
      this.checkPermissions(next);
    })

  }

  authenticate($event, provider){
    this.authInProgress = true;
    this.$auth.authenticate(provider)
      .then(res => {
        this.isAuthenticated = true;
        this.displayName = this.$auth.getPayload().login;
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

  onForbiddenRoute(route){
    let url = '/login';

    url += '?redirectTo=' + encodeURIComponent(route.$$route.originalPath);

    this.$location.url(url);
  }

  onPermissiveRoute(){
    this.$location.url('/');
  }

  checkPermissions(route){

    const { permissions } = route.$$route;

    if (permissions){
      Object.keys(permissions).forEach((key) => {

        if (key === 'loggedIn'){
          if (permissions[key] === true){
            if (!this.isAuthenticated) this.onForbiddenRoute(route);
          } else {
            if (this.isAuthenticated) this.onPermissiveRoute();
          }
        }

      })
    }
  }

}

AuthController.$inject = ['$scope', '$auth', '$route', '$location']

export default AuthController;
