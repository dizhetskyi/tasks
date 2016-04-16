class IndexController {

  constructor($scope, tasksService){
    this.$scope = $scope;

    console.log(tasksService.test());
  }

}

IndexController.$inject = ['$scope', 'tasksService'];

export default IndexController;