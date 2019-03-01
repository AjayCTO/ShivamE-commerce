'use strict';
app.controller('categoryController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {



    $scope.Isloadingcat = false;
    $scope.categories = [];

    $scope.GetCategories = function () {
        $.ajax({
            url: serviceBase + 'api/Categories/GetCategories',
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                $scope.categories = data;
                console.log($scope.categories);
                $scope.$apply();
            },
            error: function (xhr, textStatus, errorThrown) {
                $scope.searchcategories = [];
            }
        });
    };
    $scope.GetcatBgImage = function (Path) {
        if ($.trim(Path) != "") {
            return _GlobalImagePath + "CategoryImage/" + Path;
        }
        return "../img/nocategory.png";
    }

    function init() {

        $scope.GetCategories();
    }
    init();
}])