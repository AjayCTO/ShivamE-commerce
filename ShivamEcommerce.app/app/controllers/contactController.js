﻿'use strict';
app.controller('contactController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.emailvalidation = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.contactdetails = { name: "", EmailAddress: "", message: "" }

    $scope.SendMessage = function ()
    {

            $.ajax({
                url: serviceBase +'api/Contact/contactus',
                type: 'POST',
                dataType: 'json',
                data: $scope.contactdetails,
                success: function (data) {
                    debugger;
                    if (data.success == true) {
                        $scope.contactdetails = {
                            name: "",
                            EmailAddress: "",
                            message: ""
                        };
                        swal( "Thank you! Your Message successfully send", "success");
                     
                        $scope.$apply();
                    }
                },
                error: function (data) {
                    debugger;
                    if (data.success == false)
                    {
                       alert("in error");
                    }
                }
            });
        };

}]);