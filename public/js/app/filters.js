import angular from 'angular';

import TagsFilter from '../common/filters/tagsFilter';
import StarsFilter from '../common/filters/starsFilter';

const module = angular.module('app.filters', [])
module.filter('tags', TagsFilter)
module.filter('stars', StarsFilter)

export default module.name;