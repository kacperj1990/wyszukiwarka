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

.controller( 'CompanyCtrl', function CompanyCtrl( $scope, $http, CONFIG ) {

  $scope.editMode = false;

  $scope.companies = [];

  $scope.loadComapnies = function() {
    $http.get(CONFIG.host + '/companies').success(function(data){
      $scope.companies = data;
    });
  };

  $scope.loadComapnies();

  $scope.selectedCompany = {};

  $scope.selectCompany = function(company) {
    $scope.selectedCompany = company.company;
  };


  $scope.edit = function() {
    $scope.formLabel = "Edycja";
    $scope.editMode = true;
  };

  $scope.cancelEdit = function() {
    $scope.editMode = false;
  };

  $scope.deleteCompany = function() {
    $http({
      method: 'DELETE',
      url: CONFIG.host + '/removeCompany/' + $scope.selectedCompany.companyName
    }).success(function(data){
      console.log('SUKCES ', data);
      $scope.loadComapnies();
      $scope.selectedCompany = {};
    });
  };

  $scope.addCompany = function() {
    $scope.selectedCompany = {};
    $scope.formLabel = "Dodawanie";
    $scope.editMode = true;

  };

  $scope.saveCompany = function() {

    $scope.selectedCompany.allowedRoles = [$scope.selectedCompany.allowedRoles];

    if($scope.formLabel != "Dodawanie") {
          $http.put(CONFIG.host + '/editCompany', $scope.selectedCompany)
            .success(function(data){
              console.log('SUKCES ', data);
              $scope.loadComapnies();
              $scope.editMode = false;
            });
      } else {
          $http.post(CONFIG.host + '/addCompany', $scope.selectedCompany, {
              headers:{
                'content-type': 'application/json'
              }
          })
            .success(function(data){
              console.log('SUKCES ', data);
              $scope.loadComapnies();
              $scope.editMode = false;
            });
      }
    };

})
;
