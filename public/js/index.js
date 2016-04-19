import angular from 'angular';
import router from 'angular-route';
import sanitizer from 'angular-sanitize';
import messages from 'angular-messages';
import cookies from 'angular-cookies';
import satellizer from 'satellizer';

import config from './app/config';
import controllers from './app/controllers';
import services from './app/services';
import directives from './app/directives';

import UITinyMCE from 'angular-ui-tinymce';

const app = angular.module('app', [
  'ui.tinymce',
  router,
  sanitizer,
  messages,
  cookies,
  satellizer,
  controllers, 
  services,
  directives
]);

app.config(config);