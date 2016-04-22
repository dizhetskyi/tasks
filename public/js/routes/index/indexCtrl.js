import angular from 'angular';

class IndexController {

  constructor($scope, tasksService){
    this.$scope = $scope;
    this.tasksService = tasksService;

    this.tasks = [];

    this.tags = [];
    
    this.loadTasks();

    this.search = {
      title: undefined
    }

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
    console.log(newTag);
    if (newTag !== this.search.tags){
      this.search.tags = newTag;
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
