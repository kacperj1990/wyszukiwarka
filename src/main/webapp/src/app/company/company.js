angular.module( 'ngBoilerplate.company', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'company', {
    url: '/contacts',
    views: {
      "main": {
        controller: 'CompanyCtrl',
        templateUrl: 'company/company.tpl.html'
      }
    }
  });
})

.controller( 'CompanyCtrl', function CompanyCtrl( $scope ) {
})

;
