angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    // employees page that will use the EmployeeController
    .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'MessageController'
        })
        .when("/logout", {
            controller: function() {
                window.location.replace('/logout')
            },
            template: "<div></div>"
        });

    $locationProvider.html5Mode(true);

}]);