app.controller("listCtrl", function ($scope, $http) {
    $scope.welcomeApp = 'List all mobiles that are best in the business';


    $scope.getAll = function () {
        $http({
            url: "server/api/mobiles/getmobiles",
            dataType: 'json',
            method: "GET",
            data: '',
            headers: { "Content-Type": "application/json" }
        }).success(function (response) {
            //alert(response.d);
            $scope.mobileList = JSON.parse(response);


        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };

    // calling
    $scope.getAll();



    $scope.removeMobile = function (id) {

        $http({
            method: "DELETE",
            url: "server/api/mobiles/deleteMobile/" + id
        })
            .success(
					function () {
					    $scope.getAll();
					    $scope.Msg = "Record has been deleted !";
					}).error(function (data, status, headers, config, statusText) {
					    alert(data.Message);
					    alert(status);
					    console.log(error);
					    deferred.reject(status);
					});
    };

});