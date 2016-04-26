class UsersService {
  constructor($http, api_url){
    this.$http = $http;
    this.api_url = api_url;
  }

  assignTask(taskId){
    return this.$http.post(`${this.api_url}/api/user/assignTask`, {
      taskId
    })
  }

  dismissTask(taskId){
    return this.$http.post(`${this.api_url}/api/user/dismissTask`, {
      taskId
    })
  }

  getTasks(){
    return this.$http.get(`${this.api_url}/api/user/tasks`);
  }

  submitTaskSolution(id, data){
    return this.$http.post(`${this.api_url}/api/tasks/${id}/solutions`, data);
  }

}

UsersService.$inject = ['$http', 'api_url'];

export default UsersService
