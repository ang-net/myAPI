var app = angular.module('localApp', []);

app.controller('localController', function ($scope) {

    $scope.appTitle = "local storage app";
    $scope.itemIndex = 0;
    $scope.btnName = "Add";
    $scope.mode="insert";


    $scope.listAll = function () {
        $scope.saved = localStorage.getItem('accounts');
        $scope.accounts = (localStorage.getItem('accounts') !== null) ? JSON.parse($scope.saved) : [];
        localStorage.setItem('accounts', JSON.stringify($scope.accounts));


    };
    $scope.listAll();


    $scope.addAccount = function () {
        alert(JSON.stringify($scope.acc));

        if($scope.mode == "insert")
        {
            $scope.accounts.push({
                accountNo: $scope.acc.accountNo,
                name: $scope.acc.name,
                amount: $scope.acc.amount
            });
        }
        else
        {
            $scope.accounts.splice($scope.itemIndex, 1);

            $scope.accounts.push({
                accountNo: $scope.acc.accountNo,
                name: $scope.acc.name,
                amount: $scope.acc.amount
            });

        }
        
        localStorage.setItem('accounts', JSON.stringify($scope.accounts));
        $scope.acc = ''; //clear the input after adding
        $scope.itemIndex = 0;
        $scope.btnName = "Add";
        $scope.mode="insert";
    };

    $scope.setEdit = function (accnt, index) {
        $scope.acc = accnt;
        $scope.btnName = "Update";
        $scope.mode="update";
        $scope.itemIndex = index;
    };

    $scope.delete = function(index){
        $scope.accounts.splice(index, 1);
    };

});