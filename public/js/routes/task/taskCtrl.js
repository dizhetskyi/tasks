class Task {

  constructor($scope, tasksService, usersService, $routeParams, $sce){

    this.$scope = $scope;
    this.tasksService = tasksService;
    this.usersService = usersService;

    this.loading = true;
    this.loadModel($routeParams.slug);

    this.formData = {};

    angular.element(document.getElementById('submitSolution')).on('shown.bs.modal', function () {
      angular.element(document.querySelector('[name="sandbox_link"]').focus());
    })

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

  formSubmitHandler(){

    console.log('submit');

    if (this.solutionForm.$valid){

      this.usersService.submitTaskSolution(this.taskModel._id, {sandbox_link: this.formData.sandbox_link}).then(res => {
        if (res.data.success){
          alert('success');
        }
      })

    }

  }

}

Task.$inject = ['$scope', 'tasksService', 'usersService', '$routeParams', '$sce'];

export default Task;
