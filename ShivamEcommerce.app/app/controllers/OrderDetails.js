'use strict';
app.controller('OrderDetailsController', ['$scope','$route', '$rootScope', 'localStorageService', '$location', function ($scope,$route, $rootScope, localStorageService, $location) {

    $scope.productdiscription = [];
    $scope.localorderitem = [];
    $scope.orderitems = [];
    $scope.Customerdetails = [];

    var _localorderitem = localStorage.getItem("orderitem");

    var Customerdetails = localStorage.getItem("Customerdetails");
    if (_localorderitem != null && _localorderitem != undefined) {
        $scope.localorderitem = JSON.parse(_localorderitem);
        console.log($scope.localorderitem);
    }
    else {
        $scope.localorderitem = [];
    }

    if (Customerdetails != null && Customerdetails != undefined) {
        $scope.Customerdetails = JSON.parse(Customerdetails);
        console.log($scope.Customerdetails);
    }
    else {
        $scope.Customerdetails = [];
    }

    $scope.OrderItem = [];


    $scope.GetOrderItem = function () {
        
        debugger;
        $.ajax({
            url: serviceBase + '/api/CustomerOrders/GetOrderItem?orderID=' + $scope.localorderitem.id,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                debugger;
                $scope.orderitems = data.orderItem;

                console.log($scope.orderitems);
                $scope.$apply();
            }
        });
    }

    $scope.Cancleorderitem = function (id,OrderNo) {
        debugger;
        bootbox.confirm("Are you sure you want to cancel this order ?", function (result) {
            if (result) {
                $.ajax({
                    url: serviceBase + '/api/CustomerWishlist/ordercancel?orderId=' + id,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, xhr) {
                        debugger;
                        if (data.success == true) {
                            $location.path("/orders");
                            swal(OrderNo, "Your oder is cancalled !", "success");
                            $scope.$apply();
                        }

                        else {                         
                            swal(OrderNo, "Can't Cancelled", "error");                         
                        }
                      
                    }
                });
            }
        });
    }






    function init() {
        $scope.GetOrderItem();
    }

    init();



}]);

   