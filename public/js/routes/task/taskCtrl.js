class Task {

  constructor($scope, tasksService, $routeParams, $sce){
    
    this.$scope = $scope;
    this.tasksService = tasksService;

    this.loading = true;
    this.loadModel($routeParams.slug);    

  }

  loadModel(slug){
    this.tasksService.getOneTask(slug)
      .then(res => {
        this.taskModel = res.data;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      })
  }

}

Task.$inject = ['$scope', 'tasksService', '$routeParams', '$sce'];

export default Task;