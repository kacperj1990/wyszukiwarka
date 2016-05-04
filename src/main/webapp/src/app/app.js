angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.browser',
  'ngBoilerplate.company',
  'ngBoilerplate.users',
  'ngBoilerplate.config',
  'ui.router',
  'ui.tree',
  'duScroll',
  'ui.bootstrap',
  'ngAnimate',
  'cgBusy'
])

.factory('tokenInterceptor', function () {
  return {
    request: function(config) {

      if(localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token');
      }
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      if(res.config.Authorization) {
        localStorage.setItem('token', res.config.Authorization);
      }
      return res;
    },

    responseError: function(res) {
      return res;
    }
  };
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider ) {
  $urlRouterProvider.otherwise( '/home' );
  $httpProvider.interceptors.push('tokenInterceptor');
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope ) {

  $rootScope.showNavbar = true;
  $rootScope.globalUser = {};

  $scope.logout = function() {
    $location.path('/home');
    localStorage.removeItem('token');
  };

  $rootScope.decodeToken = function() {
    var token = localStorage.getItem('token');
    if(token) {
      var userData = JSON.parse(atob(token.split('.')[1]));
      $rootScope.globalUser = userData;
    }
  };

  $rootScope.isAdmin = function() {
    if($rootScope.globalUser.sub) {
      return $rootScope.globalUser.roles[0].authority === 'ROLE_ADMIN';
    }
    return false;
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState ) ) {
      $scope.pageTitle = 'Wyszukiwarka' ;
    }
  });
  
  $scope.init = function() {
    $rootScope.decodeToken();
  };

})

;