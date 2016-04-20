class AuthController {

  constructor($scope, $auth, $route){

    this.$scope = $scope;
    this.$auth = $auth;

    this.isAuthenticated = this.$auth.isAuthenticated();

    if (this.isAuthenticated){
      this.displayName = this.$auth.getPayload().login;
    }

    console.log($route);

  }

  authenticate($event, provider){
    this.authInProgress = true;
    this.$auth.authenticate(provider)
      .then(res => {
        this.isAuthenticated = true;
        this.displayName = this.$auth.getPayload().login;
        this.authInProgress = false;
      });    
  }

  logout(){
    this.$auth.logout();
    this.isAuthenticated = false;

  }

}

AuthController.$inject = ['$scope', '$auth', '$route']

export default AuthController;