angular.module('BookCtrl', []).controller('BookController', function($scope, Book) {
    $scope.user = window.u;

    Book.get($scope.user.id).success(function(data) {
        $scope.books = data;
    });

});