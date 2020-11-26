var eyMercuryKnowledgeApp = angular.module('eyMercuryKnowledgeApp', ['ui.router', 'ngSanitize', 'ui.bootstrap', 'ngAnimate']);

var appCacheVersion = '18-10-19-1759';

//this is to allow the $location.search().q to work when entering a search term
eyMercuryKnowledgeApp.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode(
    {
      enabled: true,
      requireBase: false
    });    
}]);

eyMercuryKnowledgeApp.filter('strLimit', ['$filter', function($filter) {
  return function(input, limit) {
     if (! input) return;
     if (input.length <= limit) {
         return input;
     }

     return $filter('limitTo')(input, limit) + '...';
  };
}]);

eyMercuryKnowledgeApp.filter('limitHtml', function() {
  return function(text, limit) {

      var changedString = String(text).replace(/<[^>]+>/gm, '');
      var length = changedString.length;

      return length > limit ? changedString.substr(0, limit - 1)+ '....' : changedString;
  }
});

eyMercuryKnowledgeApp.filter('trusted', ['$sce', function($sce){
	var div = document.createElement('div');
	return function(text) {
		div.innerHTML = text;
		return $sce.trustAsHtml(div.textContent);
	}
}])

eyMercuryKnowledgeApp.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

eyMercuryKnowledgeApp.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
eyMercuryKnowledgeApp.filter('removeHTMLTags', function() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
})

eyMercuryKnowledgeApp.filter('searchFor', function(){
  return function(dataArr, searchString){
      console.log('searching ....');
      if(!searchString){
          return dataArr;
      }
      
      var result = [];
      searchString = searchString.toLowerCase();
      angular.forEach(dataArr, function(item){
          if(item.name.toLowerCase().indexOf(searchString) !== -1){
              result.push(item);
          }
      });
      return result;
  };
});


eyMercuryKnowledgeApp.config(function($locationProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.hashPrefix('');
  $stateProvider
    .state('/', {
      url: "/SitePages/index.aspx/",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/beNewHomePartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
            'page_title': 'Home',
            'page_path': '/home',
            'custom_map': 
            {
            'dimension4':'PostTitle',
            'dimension5': 'ServiceLine',
            'dimension6': 'SL1',
            'dimension7': 'SL2',
            'dimension8': 'Region',
            'dimension9': 'Community',
            'dimension10': 'GPN'
            }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });
        gtag('event', 'user_dimension', 
        {
            'PostTitle':'Home',
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
                    
    })
    .state('home', {
      url: "/SitePages/index.aspx/home",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/beNewHomePartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
                    gtag('config', 'UA-132215702-1', {
                        'page_title': 'Home',
                        'page_path': '/home',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Home',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    });
      }
    })
    .state('task-support', {
      url: "/SitePages/index.aspx/task-support",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/taskSupportPartial.html?c=" + appCacheVersion,
      onEnter: function($location) {
                      gtag('config', 'UA-132215702-1', {
                        'page_title': 'Task Support',
                        'page_path': '/task-support',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Task Support',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    }); }
    })
    .state('big-switch', {
      url: "/SitePages/index.aspx/TheBigSwitch",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/bigSwitchPartial.html?c=" + appCacheVersion,
        onEnter: function($location) {
          gtag('config', 'UA-132215702-1', {
                        'page_title': 'TheBigSwitch',
                        'page_path': '/TheBigSwitch',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Big Switch',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    });
        }
    })
    .state('BlackoutTemplates', {
      url: '/SitePages/index.aspx/blackout-templates',
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/blackoutPartial.html?c=" + appCacheVersion,
      onEnter: function($location) {
          gtag('config', 'UA-132215702-1', {
                        'page_title': 'BlackoutTemplates',
                        'page_path': '/blackout-templates',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Home',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    });
      }
    })
    .state('CoExistence', {
      url: '/SitePages/index.aspx/CoExistence',
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/coexistencePartial.html?c=" + appCacheVersion,
      onEnter: function($location) {
        gtag('config', 'UA-132215702-1', {
                        'page_title': 'CoExistence',
                        'page_path': '/CoExistence',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Home',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    }); }
    })
    .state('ActionsToTake', {
      url: '/SitePages/index.aspx/actions-to-take',
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/actionstotakePartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': 'ActionsToTake',
                        'page_path': '/actions-to-take',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'Home',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    });
      }
    })
    .state('FAQs', {
      url: '/SitePages/index.aspx/faqs',
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/faqsPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': 'FAQ',
                        'page_path': 'faqs',
                        'custom_map': 
                        {
                        'dimension4':'PostTitle',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':'FAQ',
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
    })
    // .state('MyNetwork', {
    //   url: '/SitePages/index.aspx/MyNetwork',
    //   templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/myNetworkPartial.html?c=" + appCacheVersion,
    //   onEnter: function($location) { }
    // })
    .state('MyLearning', {
      url: '/SitePages/index.aspx/MyLearning',
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/myLearningPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
          'page_title': 'MyLearning',
          'page_path': '/MyLearning', 
            'custom_map': 
            {
            'dimension4':'PostTitle',
            'dimension5': 'ServiceLine',
            'dimension6': 'SL1',
            'dimension7': 'SL2',
            'dimension8': 'Region',
            'dimension9': 'Community',
            'dimension10': 'GPN'
            }
        });

        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':'contentDrop',
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        }
        );
      }
    })
    // .state('Support', {
    //   url: '/SitePages/index.aspx/support',
    //   templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/supportPartial.html?c=" + appCacheVersion,
    //   onEnter: function($location) { }
    // })
    .state('search/query', {
      url: "/SitePages/index.aspx/search-results?q={term}",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/searchResultsPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { }
    })
    .state('engagement-lifecycle/individual', {
      url: "/SitePages/index.aspx/engagement-lifecycle/{tileTitle}/{businessUnit}/{serviceLine}",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/engageLifecyleSinglePartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': $location.url(),
                        'page_path': $location.url(),
                        'custom_map': 
                        {
                        'dimension4':$location.url(),
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':$location.url(),
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
    })
    .state('engagement-lifecycle/individual-how-to/how-to', {
      url: "/SitePages/index.aspx/engagement-lifecycle/{tileTitle}/{businessUnit}/{serviceLine}/how-to-{howToTitle}",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/howToIndividualPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': $location.url(),
                        'page_path': $location.url(),
                        'custom_map': 
                        {
                        'dimension4':$location.url(),
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':$location.url(),
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
    })
    .state('engagement-lifecycle/individual-policy/policy-name', {
      url: "/SitePages/index.aspx/engagement-lifecycle/{tileTitle}/{businessUnit}/{serviceLine}/policy-{policyName}",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/policyIndividualPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': $location.url(),
                        'page_path': $location.url(),
                        'custom_map': 
                        {
                        'dimension4':$location.url(),
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':$location.url(),
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
    })
    .state('engagement-lifecycle/individual-guidance/guidance-name', {
      url: "/SitePages/index.aspx/engagement-lifecycle/{tileTitle}/{businessUnit}/{serviceLine}/guidance-{guidanceName}",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/guidanceIndividualPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
        gtag('config', 'UA-132215702-1', {
                        'page_title': $location.url(),
                        'page_path': $location.url(),
                        'custom_map': 
                        {
                        'dimension4':$location.url(),
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
        });
        gtag('event', 'Community', {
          'event_category': 'Community',
          'event_label': CurrentUserData.Community
        });
        gtag('event', 'ServiceLine', {
          'event_category': 'ServiceLine',
          'event_label': CurrentUserData.ServiceLine
        });
        gtag('event', 'SL1', {
          'event_category': 'SL1',
          'event_label': CurrentUserData.SL1
        });
        gtag('event', 'SL2', {
          'event_category': 'SL2',
          'event_label': CurrentUserData.SL2
        });
        gtag('event', 'Region', {
          'event_category': 'Region',
          'event_label': CurrentUserData.Region
        });
        gtag('event', 'GPN', {
          'event_category': 'GPN',
          'event_label': CurrentUserData.GPN
        });


        gtag('event', 'user_dimension', 
        {
            'PostTitle':$location.url(),
            'ServiceLine': CurrentUserData.ServiceLine,
            'SL1': CurrentUserData.SL1,
            'SL2': CurrentUserData.SL2,
            'Region': CurrentUserData.Region,
            'Community': CurrentUserData.Community,
            'GPN': CurrentUserData.GPN
        });
      }
    })
	.state('policies-guidance', {
      url: "/SitePages/index.aspx/policies-and-guidance",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/policiesGuidelinesPartial.html?c=" + appCacheVersion,
      onEnter: function($location) { 
                    gtag('config', 'UA-132215702-1', {
                        'page_title': 'policies-guidance',
                        'page_path': '/policies-and-guidance',
                        'custom_map': 
                        {
                        'dimension4':'policies-and-guidance',
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                    gtag('event', 'Community', {
                      'event_category': 'Community',
                      'event_label': CurrentUserData.Community
                    });
                    gtag('event', 'ServiceLine', {
                      'event_category': 'ServiceLine',
                      'event_label': CurrentUserData.ServiceLine
                    });
                    gtag('event', 'SL1', {
                      'event_category': 'SL1',
                      'event_label': CurrentUserData.SL1
                    });
                    gtag('event', 'SL2', {
                      'event_category': 'SL2',
                      'event_label': CurrentUserData.SL2
                    });
                    gtag('event', 'Region', {
                      'event_category': 'Region',
                      'event_label': CurrentUserData.Region
                    });
                    gtag('event', 'GPN', {
                      'event_category': 'GPN',
                      'event_label': CurrentUserData.GPN
                    });
                    gtag('event', 'user_dimension', 
                    {
                        'PostTitle':'policies-and-guidance',
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                    });
      }
    })
    .state('blog', {
      url: "/SitePages/index.aspx/blog/:id/:PageTitle",
      templateUrl: "urlSite/SiteAssets/mercury-knowledge-portal-site/assets/js/partials/singleBlogPartial.html?c=" + appCacheVersion,
      onEnter: function($location) {
        gtag('config', 'UA-132215702-1', {
                        'page_title': $location.url(),
                        'page_path': $location.url(),
                        'custom_map': 
                        {
                        'dimension4':$location.url(),
                        'dimension5': 'ServiceLine',
                        'dimension6': 'SL1',
                        'dimension7': 'SL2',
                        'dimension8': 'Region',
                        'dimension9': 'Community',
                        'dimension10': 'GPN'
                        }
                    });
                  gtag('event', 'Community', {
                    'event_category': 'Community',
                    'event_label': CurrentUserData.Community
                  });
                  gtag('event', 'ServiceLine', {
                    'event_category': 'ServiceLine',
                    'event_label': CurrentUserData.ServiceLine
                  });
                  gtag('event', 'SL1', {
                    'event_category': 'SL1',
                    'event_label': CurrentUserData.SL1
                  });
                  gtag('event', 'SL2', {
                    'event_category': 'SL2',
                    'event_label': CurrentUserData.SL2
                  });
                  gtag('event', 'Region', {
                    'event_category': 'Region',
                    'event_label': CurrentUserData.Region
                  });
                  gtag('event', 'GPN', {
                    'event_category': 'GPN',
                    'event_label': CurrentUserData.GPN
                  });
                  gtag('event', 'user_dimension', 
                  {
                        'PostTitle':$location.url(),
                        'ServiceLine': CurrentUserData.ServiceLine,
                        'SL1': CurrentUserData.SL1,
                        'SL2': CurrentUserData.SL2,
                        'Region': CurrentUserData.Region,
                        'Community': CurrentUserData.Community,
                        'GPN': CurrentUserData.GPN
                  });
      }
    })  

    $urlRouterProvider.otherwise("/SitePages/index.aspx/home");
	
	$httpProvider.interceptors.push(function($q) {
      return {
       'request': function(config) {
           $('#processing').show();
           return config;
        },
        'response': function(response) {
           $('#processing').delay(1000).hide();
           return response;
        }
      };
    });
});


