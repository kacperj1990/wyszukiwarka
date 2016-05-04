angular.module( 'ngBoilerplate.browser', [
  'ui.router'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'browser', {
    url: '/browser',
    views: {
      "main": {
        controller: 'BrowserCtrl',
        templateUrl: 'browser/browser.tpl.html'
      }
    },
    data:{ pageTitle: 'browser' }
  });
})
.controller( 'BrowserCtrl', function BrowserController( $scope, $rootScope, $http, CategoryService, CONFIG ) {

	$rootScope.showNavbar = true;

	$scope.loadContacts = function(scope) {
		if(scope.$nodeScope.$modelValue.nodes.length === 0) {
			$scope.contacts = [];
			$http.get(CONFIG.host + '/companiesCategory/' + scope.$nodeScope.$modelValue.id).success(function(data){
				$scope.contacts = data;	
			});
		} else {
			$scope.contacts = [];
		}
	};

	$scope.isLoading = true;

	$scope.delay = 0;
	$scope.minDuration = 0;
	$scope.message = 'Wyszukiwanie, proszę czekać.';
	$scope.backdrop = true;
	$scope.promise = null;

	$scope.searchText = '';


	/**
		Funkcja wysyłające żądanie wyszukania kontaktów o zadanym kryterium
	*/
	$scope.searchContact = function() {

		$scope.isLoading = true;
		$scope.contacts = [];

		$scope.promise = $http.get(CONFIG.host + '/companiesSearch/' + $scope.searchText, {
			'Content-Type': 'application/json'
		})
		.success(function(data){
			$scope.isLoading = false;
			console.log('Przyszło ze serwisu: ', data);
			$scope.contacts = data;
		}).error(function(){
			$scope.isLoading = false;
		});
	};

	$scope.contacts = [];

	$scope.toggle = function (scope) {
		scope.toggle();
	};

	$scope.collapseAll = function () {
		$scope.$broadcast('angular-ui-tree:collapse-all');
	};

	$scope.expandAll = function () {
		$scope.$broadcast('angular-ui-tree:expand-all');
	};

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.data = [];

	if(CategoryService.categoriesTree === null) {
		$http.get(CONFIG.host + '/categoriesTree').success(function(data){
			CategoryService.categoriesTree= $scope.data = data;		
		});
	} else {
		$scope.data = CategoryService.categoriesTree;
	}
})
.service('CategoryService', function() {
	this.categoriesTree = null;
})
;