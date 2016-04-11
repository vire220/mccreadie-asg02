angular.module('TodoService', []).factory('Todo', ['$http', function($http) {

    return {
        // call to get all employees
        get : function(empId) {
            return $http.get('/api/employees/' + empId + "/todo");
        },
        
        update : function(empId, todoId, todoData){
            var newData = {"jsonStr": JSON.stringify(todoData)};
            console.log(newData);
            return $http.put('/api/employees/' + empId + '/todo/' + todoId, newData);    
        },

        create : function(empId, todoData) {
            var newData = {"jsonStr": JSON.stringify(todoData)};
            console.log(newData);
            return $http.post('/api/employees/' + empId + "/todo", newData);
        },
        
        delete : function(empId, todoId) {
            return $http.delete('/api/employees/' + empId + "/todo/" + todoId);
        }
    }       

}]);