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

            var d = $scope.formData.date;

            var dd = d.getDate();
            var mm = d.getMonth() + 1; //January is 0!

            var yyyy = d.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            d = mm + '/' + dd + '/' + yyyy;

            $scope.formData.date = d;

            console.log($scope.formData);
            Todo.create(userId, $scope.formData).success(function(data) {
                $scope.formData = {};
                console.log(data);
                refreshTodo();
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

    $scope.updateTodo = function(id) {
        Todo.update(userId, id).success(function(data) {
            if (data.success === true)
                refreshTodo();
        });
    };

});