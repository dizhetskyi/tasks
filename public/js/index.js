import angular from 'angular';
import router from 'angular-route';

import config from './app/config';
import controllers from './app/controllers';
import services from './app/services';

const app = angular.module('app', [
  'ngRoute', 
  controllers, 
  services
]);

app.config(config);