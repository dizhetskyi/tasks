class AuthController {

  constructor($scope, $auth, $cookieStore){

    this.$scope = $scope;
    this.$auth = $auth;

    this.isAuthenticated = this.$auth.isAuthenticated();

    if (this.isAuthenticated){
      this.displayName = this.$auth.getPayload().username;
    }

  }

  authenticate(provider){
    this.$auth.authenticate(provider)
      .then(res => {
        this.isAuthenticated = this.$auth.isAuthenticated();
        this.displayName = res.data.username;
      });    
  }

  logout(){
    this.$auth.logout();
    this.isAuthenticated = false;
  }

}

AuthController.$inject = ['$scope', '$auth', '$cookieStore']

export default AuthController;