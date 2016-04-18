import angular from 'angular';
import router from 'angular-route';
import sanitizer from 'angular-sanitize';

import config from './app/config';
import controllers from './app/controllers';
import services from './app/services';
import directives from './app/directives';

import UITinyMCE from 'angular-ui-tinymce';

const app = angular.module('app', [
  'ngSanitize',
  'ui.tinymce',
  router,
  controllers, 
  services,
  directives
]);

app.config(config);