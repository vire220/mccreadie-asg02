angular.module('EmployeeService', []).factory('Employee', ['$http', function($http) {

    return {
        // call to get all employees
        get : function() {
            return $http.get('/api/employees');
        },



        getOne : function(empData) {
            return $http.get('/api/employees/' + empData);
        }

    }       

}]);