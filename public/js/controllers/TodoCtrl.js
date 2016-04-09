angular.module('TodoCtrl', []).controller('TodoController', function($scope, Todo) {

    $scope.tagline = 'Todo Controller Test';
    $scope.user = window.u;

    $scope.formData = {};

    var userId = $scope.user.id;

    var refreshTodo = function() {
        Todo.get(userId).success(function(data) {
            $scope.todos = data;
        });
    };

    refreshTodo();

    Todo.get(userId).success(function(data) {
        $scope.todos = data;
    });

    $scope.createTodo = function() {

        if (!$.isEmptyObject($scope.formData)) {
            Todo.create(userId, $scope.formData).success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
            });
        }
    };

    $scope.deleteTodo = function(id) {
        Todo.delete(userId, id)
            // if successful creation, call our get function to get all the new todos
            .success(function(data) {

                if (data.success === true)
                    refreshTodo();
            });
    };

});