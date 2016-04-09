angular.module('BookCtrl', []).controller('BookController', function($scope, Book) {

    $scope.tagline = 'Book Controller Test';
    $scope.user = window.u;
    
    Book.get($scope.user.id).success(function(data){
        $scope.books = data;
    });

});