angular.module( 'ngBoilerplate.home', [
  'ui.router'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope, $rootScope, $http, $location, CONFIG ) {

    $rootScope.showNavbar = false;

    $scope.error = false;

    $scope.login = function() {
      $scope.error = false;
      $http.post(CONFIG.host + '/auth', {
        'username': $scope.userLogin,
        'password': $scope.userPassword
      }, {
        'headers': {
          'content-type': 'application/json'
        }
      }).success(function(data){
        if(data.token) {
          localStorage.setItem('token', data.token);
          $rootScope.decodeToken();
          $location.path('/browser');
        } else {
          $scope.error = true;
        }
      }).error(function(data){
        console.log(data);
      });
    };
});