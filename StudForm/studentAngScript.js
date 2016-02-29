var app = angular.module('studApp', ["checklist-model"]);


app.controller('myCtrl', function ($scope, $http, $cacheFactory) {
    $scope.editMode = false;
    $scope.studentList = {};

    $scope.qualifications = [
    { id: 1, text: '10th' },
    { id: 2, text: '12th' },
    { id: 3, text: 'Diploma' },
    { id: 4, text: 'Degree' }
  ];

    //    $scope.student = {
    //        qualifications: [2, 4]
    //    };


    //$scope.stateList = StateList;
    //$scope.districtList = DistrictList;
    //$scope.tehsilList = TehsilList;


    $scope.getStates = function () {


        //        //localStorage['xy'] = "{'a':'122'}";
        //        if (localStorage['states'] != null) {
        //            $scope.stateList = JSON.parse(localStorage['states']);
        //            //$scope.cache1 = localStorage['xy'];
        //            return;
        //        }


        $http({
            url: "StudentServiceWithUtility.asmx/fetchStates",
            dataType: 'json',
            data: '',
            headers: { "Content-Type": "application/json" }

        }).success(function (response) {
            //alert(JSON.parse(response.d));
            $scope.stateList = JSON.parse(response.d);
            //localStorage['states'] = response.d;
        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };
    $scope.getStates();

    $scope.getDistricts = function () {
        $http({
            url: "StudentServiceWithUtility.asmx/fetchDistricts",
            dataType: 'json',
            data: '',
            headers: { "Content-Type": "application/json" }
        }).success(function (response) {
            //alert(response.d);
            $scope.districtList = JSON.parse(response.d);

        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };
    $scope.getDistricts();

    $scope.getTehsils = function () {
        $http({
            url: "StudentServiceWithUtility.asmx/fetchTehsils",
            dataType: 'json',
            data: '',
            headers: { "Content-Type": "application/json" }
        }).success(function (response) {
            //alert(response.d);
            $scope.tehsilList = JSON.parse(response.d);

        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };
    $scope.getTehsils();



    $scope.getAll = function () {
        $http({
            url: "StudentServiceWithUtility.asmx/getAll",
            dataType: 'json',
            method: "GET",
            data: '',
            headers: { "Content-Type": "application/json" }
        }).success(function (response) {
            //alert(response.d);
            $scope.studentList = JSON.parse(response.d);
        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };


    $scope.syncData = function () {
        $http({
            url: "StudentServiceWithUtility.asmx/SyncAll",
            dataType: 'json',
            data: '',
            headers: { "Content-Type": "application/json" }
        }).success(function (response) {
            alert(response.d);
            $scope.Msg = "Sync Successful !";
        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);
            console.log(error);
            deferred.reject(status);
        });
    };


    // calling
    $scope.getAll();


    $scope.addStud = function () {
        alert(JSON.stringify({ student: $scope.student }));
        $http({
            url: "StudentServiceWithUtility.asmx/Save",
            method: "POST",
            //data:  $scope.student
            data: { student: JSON.stringify($scope.student) }
        }).success(function () {
            $scope.getAll();
            $scope.Msg = "Record has been successfully added !";
            alert("Success !");
            $scope.student = {};
            $scope.editMode = false;
        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);    // 400
            console.log(error);
            deferred.reject(status);
        });
    };

    $scope.enableEdit = function (stud) {
        $scope.student = stud;
        $scope.student.dob = new Date($scope.student.dob);
        $scope.editMode = true;
    };


    $scope.editStud = function (stud) {
        alert(angular.toJson($scope.student));
        $http({
            url: "StudentServiceWithUtility.asmx/editStudent",
            method: "POST",
            //data: JSON.stringify({ student: stud })
            data: { student: angular.toJson($scope.student) }   // to avoid $$hashkey in jSon
        }).success(function () {
            $scope.getAll();
            $scope.Msg = "Record has been successfully updated !";
            $scope.student = {};
            $scope.editMode = false;
        }).error(function (data, status, headers, config, statusText) {
            alert(data.Message);
            alert(status);    // 400
            console.log(error);
            deferred.reject(status);
        });
    };


    $scope.removeStud = function (id) {
        $http({
            url: "StudentServiceWithUtility.asmx/removeStudent",
            method: "POST",
            //data: JSON.stringify({ id: id })
            data: { id: id }
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