class IndexController {

  constructor($scope, tasksService){
    this.$scope = $scope;
    this.tasksService = tasksService;

    this.tasks = [];

    this.loadTasks();

    this.levelLabel = {
      1: 'For dummies',
      2: 'Your mom can do it',
      3: 'Okay',
      4: 'Really hard',
      5: 'Super hard'
    }

    this.perPageOptions = [{
      value: 2,
      label: 2
    }, {
      value: 5,
      label: 5
    }]

    this.pagination = {
      page: 1,
      pages: 0,
      perPage: this.perPageOptions[0].value
    }

    this.$scope.$watch(() => this.pagination.perPage, this.onPerPageChange.bind(this))

    this.orderProp = null;
    this.orderReversed = false;
  }

  loadTasks(){
    this.loading = true;
    this.tasksService.getAllTasks()
      .then(res => {
        this.tasks = res.data;
        this.resetPagination();
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      })
  }

  removeTask(id){
    if (confirm(`Remove task?`)){
      this.tasksService.removeTask(id)
        .then(res => {
          if (res.data.success){
            this.tasks = this.tasks.filter(t => t._id !== id);
          }
        })
        .catch(err => {
          console.log(err);
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

  resetPagination(){
    this.pagination = Object.assign({}, this.pagination, {
      page: 1,
      pages: Math.ceil(this.tasks.length / this.pagination.perPage)
    })
  }

  onPerPageChange(perPage){
    if (perPage){
      this.pagination = Object.assign({}, this.pagination, {
        perPage: perPage,
        page: 1,
        pages: Math.ceil(this.tasks.length / perPage)
      })
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