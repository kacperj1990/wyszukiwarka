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

.controller( 'CompanyCtrl', function CompanyCtrl( $scope, $http, CONFIG, RolesService, CategoryService ) {

  $scope.roles = {};
  $scope.categoriesTree = [];

  RolesService.rolesPromise.then(function(data){
    $scope.roles = Object.keys(data.data).map(function(d){ return data.data[d];});
  });

  CategoryService.categoriesTreePromise.then(function(data){
    $scope.categoriesTree = data.data;
  });

  $scope.editMode = false;

  $scope.companies = [];

  $scope.secondLevelCat = [];

  $scope.thirdLevelCat = [];

  $scope.choosenCats = [];

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

    $scope.rootCat = function(option) {
      $scope.secondLevelCat = option.cat.nodes;
      $scope.thirdLevelCat = [];
    };

    $scope.sCat = function (option) {
      $scope.thirdLevelCat = option.scat.nodes;
    };

    $scope.addCat = function(cat) {
      if(cat.nodes.length === 0) {
        if($scope.choosenCats.indexOf(cat.id) === -1) {
          $scope.choosenCats.push(cat.id);
        }
      }
    };

    $scope.removeCat = function(cat) {
        if($scope.choosenCats.indexOf(cat) != -1) {
          var index = $scope.choosenCats.indexOf(cat);
          $scope.choosenCats.splice(index, 1);
        }
    };

})
;