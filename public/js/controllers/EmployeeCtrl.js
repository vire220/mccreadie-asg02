angular.module('EmployeeCtrl', []).controller('EmployeeController', function($scope, Employee) {

    $scope.tagline = 'Employee controller test';
    Employee.get().success(function(data){$scope.emp = data});

});