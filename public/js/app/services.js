import angular from 'angular';

import TasksService from '../common/services/TasksService';
import PermissionInterceptorService from '../common/services/PermissionInterceptorService';

const module = angular.module('app.services', [])

module.service('tasksService', TasksService)
module.provider('permissionInterceptor', PermissionInterceptorService)

export default module.name;