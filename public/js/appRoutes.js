angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

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