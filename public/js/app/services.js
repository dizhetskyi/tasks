import angular from 'angular';

import TasksService from '../common/services/TasksService';

const module = angular.module('app.services', [])
module.service('tasksService', TasksService)

export default module.name;