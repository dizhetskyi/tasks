class TaskService {
  constructor($http, api_url){
    this.$http = $http;
    this.api_url = api_url;
  }
  getAllTasks() {
    return this.$http.get(`${this.api_url}/api/tasks`, {
      headers: {
        skipAuthorization: true
      }
    });
  }

  createTask(data){
    return this.$http.post(`${this.api_url}/api/tasks`, data);
  }

  getOneTask(slug){
    return this.$http.get(`${this.api_url}/api/tasks/${slug}`);
  }

  updateTask(id, data){
    return this.$http.put(`${this.api_url}/api/tasks/${id}`, data);
  }

  removeTask(id){
    return this.$http.delete(`${this.api_url}/api/tasks/${id}`);
  }

}

TaskService.$inject = ['$http', 'api_url'];

export default TaskService
