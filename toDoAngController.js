var app = angular.module('toDoApp', []);

app.controller('TodoController', function ($scope, $http) {
    $scope.appTitle = "Just list to-dos";
    $scope.appHeadline = "Stay calm and follow the list";
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos') !== null) ? JSON.parse($scope.saved) : [];
    localStorage.setItem('todos', JSON.stringify($scope.todos));

    $scope.addTodo = function () {
        $scope.todos.push({
            text: $scope.todoText,
            done: false
        });
        $scope.todoText = ''; //clear the input after adding
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done)
                $scope.todos.push(todo);
        });
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.syncData = function () {
        //localStorage.getItem('todos');
        //$scope.json = JSON.stringify({ set: $scope.saved });
        //alert(localStorage.getItem('todos'));
        $http({
            url: "ToDoService.asmx/SyncAll",
            method: "POST",
            data: JSON.stringify({ set: localStorage.getItem('todos') })
        }).success(function (response) {
            alert("Sync Successful !");
        }).error(function (data, status, headers, config, statusText) {
            console.log(error);
        });

    };
});
