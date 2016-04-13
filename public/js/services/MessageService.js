angular.module('MessageService', []).factory('Message', ['$http', function($http) {

    return {
        get : function(empId) {
            return $http.get('/api/employees/' + empId + "/messages");
        },
        
        getOne : function(empId, msgId) {
            return $http.get('/api/employees/' + empId + "/messages/" + msgId);
        }

    }       

}]);