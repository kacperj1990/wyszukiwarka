angular.module( 'ngBoilerplate.users', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'users', {
    url: '/users',
    views: {
      "main": {
        controller: 'UsersCtrl',
        templateUrl: 'users/users.tpl.html'
      }
    }
  });
})

.controller( 'UsersCtrl', function UsersCtrl( $scope, $http, RolesService, CONFIG ) {

  $scope.selectedUser = {};


  $scope.editMode = false;


  $scope.edit = function() {
    $scope.formLabel = "Edycja";
    $scope.editMode = true;
  };


  $scope.cancelEdit = function() {
    $scope.editMode = false;
  };

  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: CONFIG.host + '/removeUser/' + $scope.selectedUser.username
    }).success(function(data){
      console.log('SUKCES ', data);
      $scope.loadUser();
    });
  };


  $scope.selectUser = function(user) {
    $scope.selectedUser = user.user;

  };


  $scope.addUser = function() {
    $scope.formLabel = "Dodawanie";
    $scope.editMode = true;
    $scope.selectedUser = {};
  };


  $scope.saveUser = function() {

    $scope.selectedUser.role = Object.keys($scope.roles).filter(function(r){
        return $scope.roles[r] === $scope.selectedUser.role;
    })[0];

    $http.post(CONFIG.host + '/addNewUser', $scope.selectedUser, {
      'Content-Type': 'application/json'
    }).success(function(data){
      $scope.loadUser();
      $scope.editMode = false;
    }).error(function(data){
      console.log('Error: ', data);
    });
  };

  $scope.roles = {};
  $scope.rolesDict = [];
  $scope.users = [];

  $scope.loadUser = function() {
    $http.get(CONFIG.host + '/users').success(function(data) {
        $scope.users = data;
        $scope.users.forEach(function(u){
          u.role = $scope.roles[u.role];
        });
    }).error(function(data) {
      console.log(data);
    });
  };

  if(RolesService.rolesDict === null) {
    $http.get(CONFIG.host + '/roles').success(function(data) {
        RolesService.rolesDict = $scope.roles =  data;
        $scope.rolesDict = RolesService.rolesDict;
        $scope.loadUser();
    }).error(function(data) {
      console.log(data);
    });
  } else {
    $scope.roles = RolesService.rolesDict;
    $scope.rolesDict = RolesService.rolesDict;
    $scope.loadUser();
  }

})
.service('RolesService', function() {
  this.rolesDict = null;
});