class PermissionInterceptor {

  response(res){
    console.log(res)
  }

  $get($location, $q) {

    console.log('1');

    return function(promise) {

      console.log('2');

      return promise.then(null, function(response) {

        console.log('3');

        // if(response.status === 403 || response.status === 401) {
        //   $location.path('/unauthorized');
        // }
        console.log($location, $q);
        return $q.reject(response);
      });
    };

  }
}

export default PermissionInterceptor