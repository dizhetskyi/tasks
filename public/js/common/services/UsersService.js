class UsersService {
  constructor($http){
    this.$http = $http;
  }

  assignTask(taskId){
    return this.$http.post(`http://localhost:8888/api/user/assignTask`, {
      taskId
    })
  }

  dismissTask(taskId){
    return this.$http.post(`http://localhost:8888/api/user/dismissTask`, {
      taskId
    })
  }

  getTasks(){
    return this.$http.get(`http://localhost:8888/api/user/tasks`);
  }

  submitTaskSolution(id, data){
    return this.$http.post(`http://localhost:8888/api/tasks/${id}/solutions`, data);
  }

}

UsersService.$inject = ['$http'];

export default UsersService
