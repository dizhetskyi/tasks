import angular from 'angular';

import TooltipDirective from '../common/directives/tooltipDirective';

const module = angular.module('app.directives', [])
module.directive('tooltip', TooltipDirective)

export default module.name;