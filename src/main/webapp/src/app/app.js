angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.browser',
  'ngBoilerplate.company',
  'ngBoilerplate.users',
  'ui.router',
  'ui.tree',
  'duScroll',
  'ui.bootstrap',
  'ngAnimate',
  'cgBusy'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope ) {

  $rootScope.showNavbar = true;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState ) ) {
      $scope.pageTitle = 'Wyszukiwarka' ;
    }
  });
})

;