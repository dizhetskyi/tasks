import angular from 'angular';

import TagsFilter from '../common/filters/tagsFilter';
import StarsFilter from '../common/filters/starsFilter';
import OnlyMyFilter from '../common/filters/onlyMyFilter';

const module = angular.module('app.filters', [])
module.filter('tags', TagsFilter)
module.filter('stars', StarsFilter)
module.filter('onlyMy', OnlyMyFilter)

export default module.name;
