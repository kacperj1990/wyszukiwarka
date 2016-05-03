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

.controller( 'UsersCtrl', function UsersCtrl( $scope, $http, RolesService ) {

  $scope.selectedUser = {};


  $scope.editMode = false;


  $scope.edit = function() {
    $scope.formLabel = "Edycja";
    $scope.editMode = true;
  };


  $scope.cancelEdit = function() {
    $scope.editMode = false;
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

    $scope.selectedUser.role = Object.keys($scope.rolesDict).filter(function(r){
        return $scope.rolesDict[r] === $scope.selectedUser.role;
    })[0];

    $http.post('http://localhost:8080/addNewUser', $scope.selectedUser, {
      'Content-Type': 'application/json'
    }).success(function(data){
      $scope.loadUser();
      $scope.editMode = false;
    }).error(function(data){
      console.log('Error: ', data);
    });
  };


  $scope.roles = [];
  $scope.rolesDict = {};
  if(RolesService.rolesDict === null) {
    $http.get('http://localhost:8080/roles').success(function(data) {
        $scope.rolesDict = RolesService.rolesDict = data;
        $scope.roles =  RolesService.rolesDict;
    }).error(function(data) {
      console.log(data);
    });
  } else {
    $scope.roles = Object.keys(RolesService.rolesDict);
    $scope.rolesDict = RolesService.rolesDict;
  }


  $scope.users = [];

  $scope.loadUser = function() {
    $http.get('http://localhost:8080/users').success(function(data) {
        data = data.map(function(d) { 
          d.role = $scope.rolesDict[d.role];
        });
        $scope.users = data;
    }).error(function(data) {
      console.log(data);
    });
  };


  $scope.loadUser();
})
.service('RolesService', function() {
  this.rolesDict = null;
});