import angular from 'angular';

import TasksService from '../common/services/TasksService';
import UsersService from '../common/services/UsersService';
import PermissionInterceptorService from '../common/services/PermissionInterceptorService';

const module = angular.module('app.services', [])

module.service('tasksService', TasksService)
module.service('usersService', UsersService)
module.provider('permissionInterceptor', PermissionInterceptorService)

export default module.name;
