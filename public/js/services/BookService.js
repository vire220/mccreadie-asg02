angular.module('BookService', []).factory('Book', ['$http', function($http) {

    return {
        // call to get all employees
        get : function(empId) {
            return $http.get('/api/employees/' + empId + "/books");
        },



        getOne : function(empId, bookId) {
            return $http.get('/api/employees/' + empId + "/books/" + bookId);
        }

    }       

}]);