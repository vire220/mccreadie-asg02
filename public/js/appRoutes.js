angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the EmployeeController
        .when('/employees', {
            templateUrl: 'views/employee.html',
            controller: 'EmployeeController'
        });

    $locationProvider.html5Mode(true);

}]);