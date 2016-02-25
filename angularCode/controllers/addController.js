app.controller('addCtrl', function ($scope, $http, $routeParams) {
    $scope.msg = 'upcoming mobile model to be added';


    $scope.addMobile = function () {

        if ($scope.mobile._id == null) {
            $http({
                url: "server/api/mobiles/addmobile",
                method: "POST",
                data: JSON.stringify($scope.mobile)
            }).success(function () {
                //$scope.getAll();
                $scope.Msg = "Record has been successfully added !";
                alert("Success !");
                $scope.mobile = {};
                $scope.editMode = false;
            }).error(function (data, status, headers, config, statusText) {
                alert(data.Message);
                alert(status);    // 400
                console.log(error);
                deferred.reject(status);
            });
        }
        else {

            $http({
                url: "server/api/mobiles/updateMobilebyobjectid",
                method: "PUT",
                data: JSON.stringify($scope.mobile)
            }).success(function () {
                //$scope.getAll();
                $scope.Msg = "Record has been successfully added !";
                alert("Update Successful !");
                $scope.mobile = {};
                $scope.editMode = false;
            }).error(function (data, status, headers, config, statusText) {
                alert(data.Message);
                alert(status);    // 400
                console.log(error);
                deferred.reject(status);
            });
        
        }

    };


    $scope.newData = function () {
        if ($routeParams.mob == null) {
            $scope.mobile = {};
        }
        else {
            $scope.btnName = "Update";
            $scope.mobile = JSON.parse($routeParams.mob);
            //alert($routeParams.mob);
        }

    };
    $scope.newData();


});