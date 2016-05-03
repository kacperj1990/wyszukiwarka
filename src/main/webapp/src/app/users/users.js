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

.controller( 'UsersCtrl', function UsersCtrl( $scope, $http ) {

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
    $http.post('http://localhost:8080/addSystemUser', $scope.selectedUser, {
      'Content-Type': 'application/json'
    }).success(function(data){
      console.log('Sukces: ', data);
    }).error(function(data){
      console.log('Error: ', data);
    });
  };

  $scope.users = [{
      name: 'Kacper',
      surname: 'Ostrowski',
      login: 'kacpi',
      role: 'Administrator systemu',
      contact: 'fsdsfddd'
    }, {
      name: 'Anna',
      surname: 'Kobus',
      login: 'anula',
      role: 'Dyrektor',
      contact: 'fsdsfddd'
    }, {
      name: 'Leo',
      surname: 'Messi',
      login: 'ronaldo',
      role: 'Inżynier',
      contact: 'fsdsfddd'
    }];

})

;
