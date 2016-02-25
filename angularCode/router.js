app.config(function ($routeProvider) {
    $routeProvider
        .when('/Add', {
            templateUrl: '/addmobile.htm',
            controller: 'addCtrl'
        })
        .when('/List', {
            templateUrl: '/listmobiles.htm',
            controller: 'listCtrl'
        })
          .when('/Add/:mob', {
              templateUrl: '/addmobile.htm',
              controller: 'addCtrl'
          })
        .otherwise({
            redirectTo: '/Add'
        });
});