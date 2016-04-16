import angular from 'angular';

import IndexController from '../routes/index/indexCtrl';

const module = angular.module('app.controllers', [])
module.controller('IndexController', IndexController)

export default module.name;