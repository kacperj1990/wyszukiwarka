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
.controller( 'BrowserCtrl', function BrowserController( $scope, $rootScope, $http, CategoryService ) {

	$rootScope.showNavbar = true;

	$scope.loadContacts = function(scope) {
		if(scope.$nodeScope.$modelValue.nodes.length === 0) {
			$scope.contacts = [];
			$http.get('http://localhost:8080/companiesCategory/' + scope.$nodeScope.$modelValue.id).success(function(data){
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

		$scope.promise = $http.get('http://localhost:8080/companiesSearch/' + $scope.searchText, {
			'Content-Type': 'application/json',
			'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTQ2MTg0Njc5NTA4MiwiZXhwIjoxNDYyNDUxNTk1fQ.XOa9jHOlCBffTMM9XtbKnBNiS1VfiYuu5CeoaPMcjMcY8kUM4w6NqXhyV7SHEHlTxfNVdtO5QfngrZlY9DZaOA'
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
		$http.get('http://localhost:8080/categoriesTree').success(function(data){
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