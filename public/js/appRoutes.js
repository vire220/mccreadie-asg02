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
    
    .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BookController'
    })
    
    .when('/todos', {
        templateUrl: 'views/todos.html',
        controller: 'TodoController'
    })

    .when("/logout", {
        controller: function() {
            window.location.replace('/logout')
        },
        template: "<div></div>"
    });

    $locationProvider.html5Mode(true);

}]);