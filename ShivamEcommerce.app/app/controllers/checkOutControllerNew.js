'use strict';
app.controller('checkOutController', ['$scope', '$rootScope', '$location', '$route', 'localStorageService', 'authService', function ($scope, $rootScope, $location, $route,localStorageService, authService) {
    $scope.authentication = authService.authentication;
    $scope.Cities = [];
    $scope.emailvalidation = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.ccinfo = { type: "fa fa-credit-card" }
    $scope.CurrentTab = 1;
    $scope.shipping = 0;
    $scope.CartTotal = 0;
    $scope.errormsg = "";
    $scope.disable = true;
    $scope.xyz = [];
    $scope.addresses = [];
    $scope.shippingCharge=0;
    $scope.finalArr = [];
    $scope.AddressBillinginfo = [];
    $scope.BillingfinalArr = [];
    $scope.arraySelect = [];
    $scope.newarraySelect = [];
    $scope.shoppingCartNew = [];
    $scope.Addressinfo = [];
    var authData = localStorageService.get('authorizationData');
    $scope.inforamtion = [];
    $scope.ChangeTab = function (CurrentTab) {
        $scope.CurrentTab = CurrentTab;     
    }
    $scope.isloadingpin = false;

    $scope.CustomerDetails = { Name:'', Phone: '', Address: '', City: '', Pincode: '', State: '', District: '', UserName: '', AddressType:'Shipping' ,ShippingCharge: $scope.shippingCharge};

    $scope.CustBillingaddress = { Name: '', Phone: '', Address: '', City: '', Pincode: '', State: '', District: '', UserName: '', AddressType: 'Billing' };

    $scope.CustomerDetailsNew = { Name: '', Phone: '', Address: '', City: '', Pincode: '', State: '', District: '', Town: '', AddressType: 'Shipping', UserName: authData.userName };

    $scope.PaymentInformation = { cardType: '2', Nameoncard: '', ExpMonth: '', ExpYear: '', CardNumber: '', CVV: '' }
    $scope.CustomerDetailsEdit={ Id:0, Name: '', Phone: '', Address: '', City: '', Pincode: '', State: '', District: '', Town: '', AddressType: 'Shipping', UserName: authData.userName };
 
    $scope.PlaceOrder = function () {
        debugger;
        var allDataToSend = {
            OrderCartItem: $scope.shoppingCartNew, CartTotal: $scope.CartTotal, OrderCustomerData: $scope.CustomerDetails, PaymentInfo: $scope.PaymentInformation, CustomerBillAddress:
        $scope.CustBillingaddress
        };
        $.ajax({
            url: serviceBase + 'api/CustomerOrders/PostOrder',
            type: 'POST',
            data: allDataToSend,
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    $rootScope.$emit("RemoveCart");
                    swal("Thank you", "Your order has been placed and will be processed as soon as possible", "success");
                    $location.path("/orders");
                    $scope.$apply();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("into error");
            }
        });

    };

    $scope.getpindata = function (pin)
    {
        debugger;        
         var api = ' https://pincode.saratchandra.in/api/pincode/';
        $scope.Pin = pin;     
        $scope.Pincode = parseInt($scope.Pin);
        if (pin != undefined) {
            if (pin.length < 6) {
                return false
            }
            else {
               
                $scope.isloadingpin = true;
                $.ajax({
                    type: "Get",
                    url: api + $scope.Pincode,               
                    dataType: "Json",
                    success: function (data) {
                        debugger;                     
                        $scope.errormsg = "";
                        $scope.disable = false;
                        $scope.Addressinfo = data.data;
                     
                        $scope.CustomerDetails = {                        
                            State: $scope.Addressinfo[0].state_name,                        
                            Pincode: $scope.Addressinfo[0].pincode,
                            District:$scope.Addressinfo[0].district,
                            City:$scope.Addressinfo[0].taluk,
                            Name: $scope.inforamtion.firstname + " " + $scope.inforamtion.lastname,
                            Phone: $scope.inforamtion.phone,
                            ShippingCharge:$scope.shippingCharge,
                            AddressType:"Shipping",                        
                            UserName: authData.userName,
                     
                        },
                      $scope.isloadingpin = false;
                        $scope.getshippingcharge($scope.Pincode);
                        $scope.$apply();
                    },
                    error: function (data, textStatus, errorThrown) {
                      debugger
                      $scope.errormsg = data.responseJSON.message;
                      $scope.isloadingpin = false;
                      $scope.disable = true;
                        $scope.$apply();
                }
                })
            }
        }
    }

    $scope.Newgetpindata = function (pin) {
        debugger;
        var api = ' https://pincode.saratchandra.in/api/pincode/';
        $scope.Pin = pin;
        $scope.Pincode = parseInt($scope.Pin);
        if (pin != undefined) {
            if (pin.length < 6) {
                return false
            }
            else {
                $scope.isloadingpin = true;
                $.ajax({
                    type: "Get",
                    url: api + $scope.Pincode,
                    dataType: "Json",
                    success: function (data) {
                        debugger;
                        $scope.errormsgNew = "";
                        $scope.disable = false;
                        $scope.Addressinfo = data.data;                 
                        $scope.CustomerDetailsNew = {
                            State: $scope.Addressinfo[0].state_name,
                            Pincode: $scope.Addressinfo[0].pincode,
                            District: $scope.Addressinfo[0].district,
                            City: $scope.Addressinfo[0].taluk,
                            Name: $scope.CustomerDetailsNew.Name,
                            Phone: $scope.CustomerDetailsNew.Phone,
                            AddressType: "Shipping",                   
                            UserName: authData.userName,                       
                        },
                      $scope.isloadingpin = false;
                        $scope.$apply();
                    },
                    error: function (data, textStatus, errorThrown) {
                        debugger
                        $scope.errormsgNew = data.responseJSON.message;
                        $scope.isloadingpin = false;
                        $scope.disable = true;
                        $scope.$apply();
                    }
                })
            }
        }
    }

    $scope.AddressChecked = function (item)
    {
        debugger;     
        $scope.getshippingcharge(item.pincode,item);     
     
    }

    $scope.Editgetpindata = function (pin) {
        debugger;
        var api = ' https://pincode.saratchandra.in/api/pincode/';
        $scope.Pin = pin;
        $scope.Pincode = parseInt($scope.Pin);
        if (pin != undefined) {
            if (pin.length < 6) {
                return false
            }
            else {
                $scope.isloadingpin = true;
                $.ajax({
                    type: "Get",
                    url: api + $scope.Pincode,
                    dataType: "Json",
                    success: function (data) {
                        debugger;
                        $scope.errormsgNew = "";
                        $scope.disable = false;
                        $scope.Addressinfo = data.data;
                        $scope.CustomerDetailsEdit = {
                            State: $scope.Addressinfo[0].state_name,
                            Pincode: $scope.Addressinfo[0].pincode,
                            District: $scope.Addressinfo[0].district,
                            City: $scope.Addressinfo[0].taluk,
                            Name: $scope.CustomerDetailsEdit.Name,
                            Id:$scope.CustomerDetailsEdit.Id,
                            Phone: $scope.CustomerDetailsEdit.Phone,
                            Address: $scope.CustomerDetailsEdit.Address,
                            AddressType: "Shipping",
                            UserName: authData.userName,
                        },
                      $scope.isloadingpin = false;
                        $scope.$apply();
                    },
                    error: function (data, textStatus, errorThrown) {
                        debugger
                        $scope.errormsgNew = data.responseJSON.message;
                        $scope.isloadingpin = false;
                        $scope.disable = true;
                        $scope.$apply();
                    }
                })
            }
        }
    }
    $scope.getBillingpindata = function (pin) {
        debugger;
        var api = ' https://pincode.saratchandra.in/api/pincode/';
        $scope.Pin = pin;
        $scope.Pincode = parseInt($scope.Pin);
        if (pin != undefined) {
            if (pin.length < 6) {
                return false
            }
            else {
                $scope.isloadingpin = true;
                $.ajax({
                    type: "Get",
                    url: api + $scope.Pincode,
                    dataType: "Json",
                    success: function (data) {
                        debugger;
                        $scope.errormsg = "";
                        $scope.disable = false;
                        $scope.AddressBillinginfo = data.data;
                        for (var i = 0; i < $scope.AddressBillinginfo.length; i++) {
                            $scope.BillingfinalArr.push($scope.AddressBillinginfo[i].office_name);
                        }
                        console.log($scope.BillingfinalArr);
                        console.log($scope.AddressBillinginfo);
                        $scope.CustBillingaddress = {
                            State: $scope.AddressBillinginfo[0].state_name,
                            Pincode: $scope.AddressBillinginfo[0].pincode,
                            District: $scope.AddressBillinginfo[0].district,
                            City: $scope.AddressBillinginfo[0].taluk,
                            Name: $scope.inforamtion.firstname + " " + $scope.inforamtion.lastname,
                            Phone: $scope.inforamtion.phone,
                            AddressType: "Billing",               
                            UserName: authData.userName,                     

                        },
                      $scope.isloadingpin = false;
                        $scope.$apply();
                    },
                    error: function (data, textStatus, errorThrown) {
                        debugger
                        $scope.errormsg = data.responseJSON.message;
                        $scope.isloadingpin = false;
                        $scope.disable = true;
                        $scope.$apply();
                    }
                })
          
            }
        }
    }
 
    $scope.GetProductImageGlobal = function (Path) {
        if ($.trim(Path) != "") {
            return _GlobalImagePath + "/ProductImages/" + Path;
        }
        return "../img/no-image.png";
    }

    $scope.getshippingcharge = function (pincode, item) {
        debugger;
        var Pincode=parseInt(pincode)
        $.ajax({
            type: "Get",
            url: serviceBase + 'api/CustomerOrders/GetShippingCharge?Pincode=' + Pincode,
            dataType: "Json",
            success: function (data) {
                if (data.data != null)
                {
                    debugger;
                    $scope.shippingCharge = data.data.charge;
                    $scope.CustomerDetails = { Name: item.name, Phone: item.phone, Address: item.address, City: item.city, Pincode: item.pincode, State: item.state, District: item.district, UserName: authData.userName, AddressType: 'Shipping', ShippingCharge: $scope.shippingCharge };
                }
                else {
                    $scope.shippingCharge = 0;
                    $scope.CustomerDetails = { Name: item.name, Phone: item.phone, Address: item.address, City: item.city, Pincode: item.pincode, State: item.state, District: item.district, UserName: authData.userName, AddressType: 'Shipping', ShippingCharge: $scope.shippingCharge };
                }      
                $scope.$apply();
            }

        })
    }


    $scope.AddnewaddressModal = function ()
    {
        debugger;
        $("body").css("overflow", "hidden");
        $('#AddnewAddress').modal('show');     
    }

   
    $scope.AddnewAddress = function ()
    {
        debugger;
        var NewaddressAdd = {
            ShoppingAddress: $scope.CustomerDetailsNew
        };
        $.ajax({
            url: serviceBase + 'api/CustomerWishlist/PostNewAddress',
            type: 'POST',
            data: NewaddressAdd,
            dataType: 'json',
            success: function (data) {
                debugger;            
                $("#AddnewAddressclose").trigger("click");
                $route.reload();
                $scope.$apply();
            }
        })
    }

    $scope.RemoveAddress = function (Id)
    {
        debugger;
        $.ajax({
            url: serviceBase + 'api/CustomerWishlist/RemoveAddress?ID=' + Id,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $route.reload();
                debugger;
                $scope.$apply();
            }
        });

    }
    $scope.EditAddresss = function (Id)
    {
        debugger;
        $("body").css("overflow", "hidden");
        $('#EditAddress').modal('show');

        for (var i = 0; i <$scope.addresses.length; i++)
        {
            if ($scope.addresses[i].id == Id)
            {
                $scope.CustomerDetailsEdit = {Id:$scope.addresses[i].id, Name: $scope.addresses[i].name, Phone: $scope.addresses[i].phone, Address: $scope.addresses[i].address, City: $scope.addresses[i].city, Pincode: $scope.addresses[i].pincode, State: $scope.addresses[i].state, District: $scope.addresses[i].district, Town: $scope.addresses[i].town, AddressType: 'Shipping', UserName: authData.userName };
            }
        }
       

    }


    $scope.CustomeraddressEdit = function (Id)
    {
        debugger;
        var EditAddress = {
            ShoppingAddress: $scope.CustomerDetailsEdit,ID:Id
        };
        $.ajax({
            url: serviceBase + 'api/CustomerWishlist/EditAddress',
            type: 'POST',
            data: EditAddress,
            dataType: 'json',
            success: function (data) {
                debugger;
            
                $scope.hiddenmodal();
                $route.reload();
                $scope.$apply();
              }
            })

    }
    $scope.hiddenmodal = function () {
        $("body").css("overflow", "auto");
        $('#AddnewAddress').modal('hide');
        $('.modal-backdrop').css("display","none");
        $('#EditAddress').modal('hide');
    }

    $scope.getcustomerinfo = function ()
    {
        debugger;
        if (authData != null) {
            $.ajax({
                 url: serviceBase + 'api/CustomerWishlist/GetCustomerinfo',
                data: { UserName: authData.userName },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    debugger;
                    $scope.inforamtion = data.data[0];
                    console.log($scope.inforamtion);
                    if (data.success = true)
                    {

                        setTimeout(function () {
                            $("#Radiobuton_0").trigger("click");
                        },500)
                        if (data.data[0].address.length == 0) {
                            $scope.CustomerDetails = {
                                Name: data.data[0].firstname +" "+data.data[0].lastname,                     
                                Phone: data.data[0].phone,                            
                                UserName: authData.userName,                             
                            }
                            $scope.CustBillingaddress = {
                                Name: data.data[0].firstname + " " + data.data[0].lastname,
                                Phone: data.data[0].phone,                           
                                UserName: authData.userName,                                
                            }
                            
                        }
                        else {
                            
                            $scope.addresses = data.data[0].address;
                            console.log("address");
                            console.log($scope.addresses);
                        }
                       $scope.$apply();
                    }                  
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert("error");
                }
            });
        }
        
    }

    $scope.getCartInfo = function ()
    {
        debugger;
        $scope.shoppingCartNew = JSON.parse(localStorage.getItem("shoppingCarts"));
        console.log('checkout');
        console.log($scope.shoppingCartNew);
        var carttotal=localStorage.getItem("GlobalTotal");
        $scope.CartTotal = parseInt(carttotal);
    }


    $scope.Sameasshopping = function (ID)
    {
        var idx = $scope.arraySelect.indexOf(ID);
        if (idx > -1) { 
            $scope.arraySelect.splice(idx, 1);
            $scope.CustBillingaddress = { Name: $scope.CustomerDetails.Name, Phone: $scope.CustomerDetails.Phone, Address: '', City: '', Pincode: '', State: '', District: '', Town: '', UserName: '', Password: '', AddressType: 'Billing' };
        }
        else {
            $scope.arraySelect.push(ID);
           $scope.CustBillingaddress =
               {
                  Name: $scope.CustomerDetails.Name, Phone: $scope.CustomerDetails.Phone, District: $scope.CustomerDetails.District, City: $scope.CustomerDetails.City, Pincode: $scope.CustomerDetails.Pincode, State: $scope.CustomerDetails.State, Address: $scope.CustomerDetails.Address, Town: $scope.CustomerDetails.Town, UserName: $scope.CustomerDetails.UserName, AddressType: "Billing"
               };
        }
        debugger;

    }
    $scope.SameasNewshipping = function (ID)
    {
        debugger;
        var idx = $scope.newarraySelect.indexOf(ID);

        if (idx > -1) {
       
            $scope.newarraySelect.splice(idx, 1);
            $scope.CustBillingaddressNew = { Address: '', City: '', Pincode: '', State: '', District: '', Town: '', UserName: authData.userName, Password: '', AddressType: 'Billing' };

     

        }
        else {
                
            $scope.newarraySelect.push(ID);
            $scope.CustBillingaddressNew =
               {
                   District: $scope.CustomerDetailsNew.District, City: $scope.CustomerDetailsNew.City, Pincode: $scope.CustomerDetailsNew.Pincode, State: $scope.CustomerDetailsNew.State, Address: $scope.CustomerDetailsNew.Address, Town: $scope.CustomerDetailsNew.Town, UserName: $scope.CustomerDetailsNew.UserName, AddressType: "Billing"
               };
          
        }
      
     
    }

    function init()
    {
       
        $scope.getCartInfo();
        $scope.getcustomerinfo();
     
    }

    init();
}]);

    app.directive
    ('creditCardType'
     ,function () {

     var directive =
       {
           require: 'ngModel'
       , link: function (scope, elm, attrs, ctrl) {
           ctrl.$parsers.unshift(function (value) {
               scope.ccinfo.type =
                 (/^5[1-5]/.test(value)) ? "fa fa-cc-mastercard"
                 : (/^4/.test(value)) ? "fa fa-cc-visa"
                 : (/^3[47]/.test(value)) ? 'fa fa-cc-amex'
                 : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'fa fa-cc-discover'
                 : undefined
               ctrl.$setValidity('invalid', !!scope.ccinfo.type)
               return value
           })
       }
       }
     return directive
 }
    )
