class TaskForm {

  constructor($scope, tasksService, $route, $routeParams){
    
    this.$scope = $scope;
    this.tasksService = tasksService;

    this.isNew = $route.current.$$route.isNewModel;

    if (!this.isNew){
      this.loading = true;
      this.loadModel($routeParams.slug);
    }

  }

  loadModel(slug){
    this.tasksService.getOneTask(slug)
      .then(res => {
        this.formData = res.data;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      })
  }

  formSubmitHandler(e){

    if (this.isNew){
      this.tasksService.createTask({ task: this.serialize() })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      console.log(this.formData._id);
      this.tasksService.updateTask(this.formData._id, { task: this.serialize() })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
    
    

  }

  serialize(){

    return {
      title: this.formData.title,
      slug: this.formData.slug,
      content: this.formData.content,
      level: this.formData.level,
      repository_link: this.formData.repository_link,
      tips: this.formData.tips
    };

  }

}

TaskForm.$inject = ['$scope', 'tasksService', '$route', '$routeParams'];

export default TaskForm;