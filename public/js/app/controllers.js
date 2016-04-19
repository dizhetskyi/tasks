import angular from 'angular';

import AuthController from '../common/controllers/AuthCtrl';

import IndexController from '../routes/index/indexCtrl';
import TaskFormController from '../routes/taskForm/taskFormCtrl';
import TaskController from '../routes/task/taskCtrl';

const module = angular.module('app.controllers', [])
module.controller('AuthController', AuthController)

module.controller('IndexController', IndexController)
module.controller('TaskController', TaskController)
module.controller('TaskFormController', TaskFormController)

export default module.name;