import angular from 'angular';

class IndexController {

  constructor($scope, tasksService){
    this.$scope = $scope;
    this.tasksService = tasksService;

    this.tasks = [];

    this.loadTasks();

    this.searchText = '';

    this.levelLabel = {
      1: 'For dummies',
      2: 'Your mom can do it',
      3: 'Okay',
      4: 'Really hard',
      5: 'Super hard'
    }

    this.pagination = {
      page: 1,
      pages: 0,
      perPage: 5
    }

    this.orderProp = null;
    this.orderReversed = false;
  }

  loadTasks(){
    this.loading = true;
    this.tasksService.getAllTasks()
      .then(res => {
        this.tasks = res.data;
        this.recalcPagination();
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      })
  }

  removeTask($event, id){

    var $btn = angular.element($event.currentTarget);

    $btn.button('loading');

    if (confirm(`Remove task?`)){
      this.tasksService.removeTask(id)
        .then(res => {
          if (res.data.success){
            this.tasks = this.tasks.filter(t => t._id !== id);
            this.recalcPagination();
          }
          $btn.button('reset');
        })
        .catch(err => {
          console.log(err);
          $btn.button('reset');
        })
    }
  }

  changeOrder(prop){
    if (this.orderProp === prop){
      this.orderReversed = !this.orderReversed;
    } else {
      this.orderProp = prop;
      this.orderReversed = false;
    }
  }

  recalcPagination(){
    this.pagination.pages = Math.ceil(this.tasks.length / this.pagination.perPage);
    if (this.pagination.page > this.pagination.pages){
      this.setPaginationPage(this.pagination.pages);
    }
  }

  setPaginationPage(page){
    this.pagination.page = page;
  }

  range(n){
    return new Array(n);
  }

}

IndexController.$inject = ['$scope', 'tasksService'];

export default IndexController;