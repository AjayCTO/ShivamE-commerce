'use strict';
app.controller('profileController', ['$scope', '$rootScope', '$location','localStorageService', 'authService', function ($scope, $rootScope, $location,localStorageService,authService) {
    $scope.authentication = authService.authentication;
    $scope.customerInfo = {FirstName:'',LastName:'',Phone:'',Email:''};
    var authData = localStorageService.get('authorizationData');
    $scope.changepass={OldPassword:'',NewPassword:'',ConfirmPassword:''}
    $scope.getcustomerinfo = function () {

        if (authData != null) {
            $.ajax({
                url: serviceBase + 'api/CustomerWishlist/GetCustomerinfo',
                data: { UserName: authData.userName },
                type: 'GET',
                dataType: 'json',
                success: function (data) {

                    if (data.success == true)
                    {

                    $scope.customerInfo = data.data[0];
                    $scope.customerInfo = {
                        FirstName: data.data[0].firstname,
                        LastName:data.data[0].lastname,
                        Phone:data.data[0].phone,
                        Email:data.data[0].email,             
                    }
                    $scope.$apply();
                    }
                 else{
                    alert("inerror");
                    }

                  
                }
            })

        }
    }


    $scope.logOut = function () {
        $rootScope.$emit("logout");
    }


    $scope.changeprofile = function () {
        var Modal = $scope.customerInfo;
        if (authData != null)
        {
            Modal.UserName = authData.userName;
        }
        debugger
        var Modal = $scope.customerInfo;
        $.ajax({
            url: serviceBase + 'api/Profile/UpdateProfiles',
            data: Modal,
            type: 'Post',
            dataType: 'json',
            success: function (data) {

                if (data.success == true) {

                    swal(authData.userName, "Your profile has been updated", "success");
                }
              
            },
            error: function(err){
                debugger;

            }

        
        });
        console.log(modal);

    }


    $scope.changepPASSWORD = function () {
        debugger
        var Modal = $scope.changepass;

        if (authData != null) {
            Modal.UserName = authData.userName;
        }
        $.ajax({
            url: serviceBase + 'api/Account/ChangePassword',
            data: Modal,
            type: 'Post',
            dataType: 'json',
            success: function (data) {
                debugger;
     

                    swal(authData.userName, "Your Password has been updated", "success");
            
         
            },
            error: function (err) {
                debugger;
                alert("Something wrong!Check your passoword  Note:Error handling remaining")
            }
        });
        var modal = $scope.changepass;
        console.log("password");
        console.log(modal);
    }

    function init() {
        $scope.getcustomerinfo();
    }

    init();
}]);
