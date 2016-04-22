import slug from 'slug';

class TaskForm {

  constructor($scope, tasksService, $route, $routeParams){

    this.$scope = $scope;
    this.tasksService = tasksService;

    this.isNew = $route.current.$$route.isNewModel;

    if (!this.isNew){
      this.loading = true;
      this.loadModel($routeParams.slug);
    }

    this.formData = {};

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

    if (this.task.$valid){

      if (this.isNew){
        this.tasksService.createTask({ task: this.serialize() })
          .then(res => {
            if (res.data.success){
              this.formData = {};
              this.task.$setPristine();
              alert(`Task «${res.data.doc.title}» added successfully`);
            } else {
              alert('invalid');
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {

        this.tasksService.updateTask(this.formData._id, { task: this.serialize() })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      }

    } else {

      alert('invalid');

    }



  }

  generateSlug(){
    if (typeof this.formData.title !== 'undefined' && this.formData.title.length > 0) {
      this.formData.slug = slug(this.formData.title).toLowerCase();
    }
  }

  formatSlug(){
    if (typeof this.formData.slug !== 'undefined' && this.formData.slug.length > 0) {
      this.formData.slug = slug(this.formData.slug).toLowerCase();
    }
  }

  serialize(){

    return {
      title: this.formData.title,
      slug: this.formData.slug,
      content: this.formData.content,
      level: this.formData.level,
      repository_link: this.formData.repository_link,
      tips: this.formData.tips,
      tags: this.formData.tags && this.formData.tags.map(t => t.text),
      sandbox_link: this.formData.sandbox_link
    };

  }

}

TaskForm.$inject = ['$scope', 'tasksService', '$route', '$routeParams'];

export default TaskForm;
