import angular from 'angular';

class IndexController {

  constructor($scope, tasksService, usersService){

    this.$scope = $scope;
    this.tasksService = tasksService;
    this.usersService = usersService;

    this.tasks = [];
    this.filtered = [];
    this.tags = [];

    this.onlyMy = false;

    this.loadTasks();

    this.maxLevel = true;

    this.levelLabel = {
      1: 'For dummies',
      2: 'Your mom can do it',
      3: 'Okay',
      4: 'Really hard',
      5: 'Super hard'
    }

    this.pagination = {
      page: 1,
      pages: 1,
      perPage: 10
    }

    this.orderProp = null;
    this.orderReversed = false;

    this.$scope.$watch(() => this.filtered.length, this.recalcPagination.bind(this));

  }

  loadTasks(){
    this.loading = true;
    this.tasksService.getAllTasks()
      .then(res => {
        this.tasks = res.data;
        this.recalcPagination();
        this.loading = false;
        this.extractTags();
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      })
  }

  extractTags(){
    this.tags = this.tasks.reduce((tags, task) => {
      let newTags = tags;
      task.tags.forEach(tag => {
        if (newTags.indexOf(tag) === -1) newTags.push(tag)
      })
      return newTags;
    }, []).map(t => { return {label: t, selected: false}})
  }

  activeTags(){
    return this.tags.reduce((count, tag) => {
      return tag.selected ? count + 1 : count;
    }, 0)
  }

  resetTags(){
    this.tags.forEach(t => {
      t.selected = false;
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

  setTagFilter(newTag){
    if (newTag !== this.search.tags){
      this.search.tags = newTag;
    }
  }

  recalcPagination(){
    this.pagination.pages = Math.ceil(this.filtered.length / this.pagination.perPage);
    if (this.pagination.page > this.pagination.pages){
      this.setPaginationPage(this.pagination.pages);
    } else if (this.pagination.page === 0){
      this.setPaginationPage(1);
    }
  }

  setPaginationPage(page){
    this.pagination.page = page;
  }

  range(n){
    return new Array(n);
  }

}

IndexController.$inject = ['$scope', 'tasksService', 'usersService'];

export default IndexController;
