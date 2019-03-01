'use strict';
app.controller('ordersController', ['$scope', '$route', 'localStorageService', '$location', 'ordersService', 'authService', function ($scope, $route,localStorageService, $location, ordersService,authService) {
    $scope.authentication = authService.authentication;
    $scope.searchText = '';
    $scope.loadnumber = 5;
    $scope.loadingroder = function (data) {
        debugger;

        if (data == 'All') {
        
            $scope.loadnumber = $scope.CustomerOrders.data.length;
        }
    }
    $scope.logOut = function () {
        $rootScope.$emit("logout");
    }
    $scope.orders = [];

    $scope.dataTableOpt ={
        "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
    };

    $scope.order = localStorage.getItem("Customerorders");

    $scope.orders= JSON.parse($scope.order);
     
    $scope.getorderitem = function (Customer, item)
    {
     
        debugger;
        localStorage.setItem("orderitem", JSON.stringify(item));
        localStorage.setItem("Customerdetails", JSON.stringify(Customer));
        $location.path('/OrderDetails');
    }

    $scope.CustomerOrders = [];

    $scope.GetOrder = function ()
    {
        var authData = localStorageService.get('authorizationData');
        if (authData != null) {
            $.ajax({
                url: serviceBase + '/api/CustomerOrders/GetOrder?UserName=' + authData.userName,
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                    debugger;
                    if (data.success == true)
                    {
                        $scope.CustomerOrders = data;                       
                        console.log($scope.CustomerOrders);
                        localStorage.setItem("Customerorders",JSON.stringify($scope.CustomerOrders));
                        $scope.$apply();
                     
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    debugger;
                    alert("GetOrder error");
                }
            });
        }
    }

    function init()
    {
        $scope.GetOrder();
    }

    init();
}]);