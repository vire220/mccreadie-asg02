angular.module('TodoService', []).factory('Todo', ['$http', function($http) {

    return {
        // call to get all employees
        get : function(empId) {
            return $http.get('/api/employees/' + empId + "/todo");
        },
        
        update : function(empId, todoId, todoData){
            return $http.put('/api/employees/' + empId + '/todo/' + todoId, todoData);    
        },

        create : function(empId, todoData) {
            todoData.priority = "high";
            todoData.status = "completed";
            todoData.id = 6;
            var newData = {"jsonStr": JSON.stringify(todoData)};
            console.log(todoData);
            console.log(newData);
            return $http.post('/api/employees/' + empId + "/todo", newData);
        },
        
        delete : function(empId, todoId) {
            return $http.delete('/api/employees/' + empId + "/todo/" + todoId);
        }

    }       

}]);