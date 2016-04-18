class TaskService {
  constructor($http){
    this.$http = $http;
  }
  getAllTasks() {
    return this.$http.get(`http://localhost:8888/api/tasks`);
  }

  createTask(data){
    return this.$http.post(`http://localhost:8888/api/tasks`, data);
  }

  getOneTask(slug){
    return this.$http.get(`http://localhost:8888/api/tasks/${slug}`);
  }

  updateTask(id, data){
    return this.$http.put(`http://localhost:8888/api/tasks/${id}`, data);
  }

  removeTask(id){
    return this.$http.delete(`http://localhost:8888/api/tasks/${id}`);
  }

}

TaskService.$inject = ['$http'];

export default TaskService