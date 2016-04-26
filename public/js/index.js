import styles from '../scss/main.scss';

import angular from 'angular';
import router from 'angular-route';
import sanitizer from 'angular-sanitize';
import messages from 'angular-messages';
import cookies from 'angular-cookies';
import satellizer from 'satellizer';
import ngTagsInput from 'ng-tags-input';

import config from './app/config';
import controllers from './app/controllers';
import services from './app/services';
import directives from './app/directives';
import filters from './app/filters';

import UITinyMCE from 'angular-ui-tinymce';

const app = angular.module('app', [
  'ui.tinymce',
  router,
  sanitizer,
  messages,
  cookies,
  satellizer,
  'ngTagsInput',
  controllers,
  services,
  directives,
  filters
]);

app.constant('api_url', 'http://10.10.4.166:8888');

app.config(config);
