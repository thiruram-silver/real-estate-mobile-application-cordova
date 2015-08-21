angular.module('starter.controllers', ['ionic'])

/***********************************************************************************/
// search controller
.controller('ChatsCtrl', ['$scope', '$stateParams', '$cordovaSQLite', '$ionicLoading', '$ionicSideMenuDelegate', '$rootScope', function($scope, $stateParams, $cordovaSQLite, $ionicLoading, $ionicSideMenuDelegate, $rootScope) {

  $scope.shownGroup = null;

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.loadsellercontacts = function() {
        $scope.sellerclass = "seller";
        $scope.buyerclass  = "";
        // Execute SELECT statement to load contacts from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM sellerdetail')
            .then(function(res) {
                    $scope.contact = [];
                    if (res.rows.length > 0) {
                        for( var i=0; i<res.rows.length; i++) {
                          $scope.contact.push({name: res.rows.item(i).sellername, phoneno: res.rows.item(i).phoneno, city: res.rows.item(i).city, area: res.rows.item(i).area, rentlease: res.rows.item(i).rentlease, propertytype: res.rows.item(i).propertytype, dimension: res.rows.item(i).dimension, cost: res.rows.item(i).cost, id: res.rows.item(i).id, role: res.rows.item(i).role});
                        }
											$ionicLoading.show({
												duration: 2000,
												template: '<ion-spinner icon="android"></ion-spinner><p>Loading seller contacts please wait...</p>'
											});

										  $scope.hide = function(){
											$ionicLoading.hide();
										  };
                    }
                },
                function(error) {
                    window.alert("Error on loading: " + error.message);
                })
  }

  $scope.loadbuyercontacts = function() {
        $scope.sellerclass = "";
        $scope.buyerclass  = "buyer";
        // Execute SELECT statement to load contacts from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM buyerdetail')
            .then(function(res) {
                    $scope.contact = [];
                    if (res.rows.length > 0) {
                        for( var i=0; i<res.rows.length; i++) {
                          $scope.contact.push({name: res.rows.item(i).buyername, phoneno: res.rows.item(i).phoneno, city: res.rows.item(i).city, area: res.rows.item(i).area, rentlease: res.rows.item(i).rentlease, propertytype: res.rows.item(i).propertytype, dimension: res.rows.item(i).dimension, cost: res.rows.item(i).cost, id: res.rows.item(i).id, role: res.rows.item(i).role});
                        }
											$ionicLoading.show({
												duration: 2000,
												template: '<ion-spinner icon="android"></ion-spinner><p>Loading buyer contacts please wait...</p>'
											});

										  $scope.hide = function(){
											$ionicLoading.hide();
										  };
                    }
                },
                function(error) {
                    window.alert("Error on loading: " + error.message);
                })
  }

  function getContact($scope, $cordovaSQLite, $stateParams) {
  // Might use a resource here that returns a JSON array

    var id = $stateParams.chatId;
    var role = $stateParams.role;
      if(role == 'seller') {
      var query =  'SELECT * FROM sellerdetail WHERE id = ?'
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {

          if (res.rows.length > 0) {
            $scope.name          =  res.rows.item(0).sellername;
            $scope.phoneno       =  res.rows.item(0).phoneno;
            $scope.city          =  res.rows.item(0).city;
            $scope.area          =  res.rows.item(0).area;
            $scope.rentlease     =  res.rows.item(0).rentlease;
            $scope.propertytype  =  res.rows.item(0).propertytype;
            $scope.dimension     =  res.rows.item(0).dimension;
            $scope.id            =  res.rows.item(0).id;
            $scope.role          =  res.rows.item(0).role;
            $scope.access        =  res.rows.item(0).access; 
          }
        })
      } else {
      var query =  'SELECT * FROM buyerdetail WHERE id = ?'
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {

          if (res.rows.length > 0) {
            $scope.name          =  res.rows.item(0).buyername;
            $scope.phoneno       =  res.rows.item(0).phoneno;
            $scope.city          =  res.rows.item(0).city;
            $scope.area          =  res.rows.item(0).area;
            $scope.rentlease     =  res.rows.item(0).rentlease;
            $scope.propertytype  =  res.rows.item(0).propertytype;
            $scope.dimension     =  res.rows.item(0).dimension;
            $scope.id            =  res.rows.item(0).id;
            $scope.role          =  res.rows.item(0).role;
            $scope.access        =  res.rows.item(0).access; 
          }
        })
      } 

  }

if($stateParams.chatId != null) {
  getContact($scope, $cordovaSQLite, $stateParams);
}

  $scope.updatecontact = function(name, phoneno, city, area, rentlease, propertytype, dimension, cost, id, access, role) {
		  $ionicLoading.show({
        duration: 2000,
        template: '<ion-spinner icon="android"></ion-spinner><p>Updating record please wait...</p>'
		  });

    if(role == 'seller') {
        // Execute SELECT statement to load contacts from database.
        var query = 'UPDATE sellerdetail SET sellername = ?, phoneno = ?, city = ?, area = ?, rentlease = ?, propertytype = ?, dimension = ?, cost = ?, access = ? WHERE id = ?'
        $cordovaSQLite.execute(db, query, [name, phoneno, city, area, rentlease, propertytype, dimension, cost, access])
            .then(function(res) {
                    if (res.rows.length > 0) {
										  $scope.name      = res.rows.item(0).sellername;
										  $scope.phoneno   =  res.rows.item(0).phoneno;
										  $scope.city      =  res.rows.item(0).city;
										  $scope.area      =  res.rows.item(0).area;
										  $scope.rentlease =  res.rows.item(0).rentlease;
										  $scope.propertytype =  res.rows.item(0).propertytype;
										  $scope.dimension =  res.rows.item(0).dimension;
										  $scope.cost      =  res.rows.item(0).cost;
										  $scope.id        =  res.rows.item(0).id;
										  $scope.access    =  res.rows.item(0).access;
										  $scope.role      =  res.rows.item(0).role;
                    }
                },
                function(error) {
                    window.alert("Error on loading: " + error.message);
                })
    } else {
        // Execute SELECT statement to load contacts from database.
        var query = 'UPDATE buyerdetail SET buyername = ?, phoneno = ?, city = ?, area = ?, rentlease = ?, propertytype = ?, dimension = ?, cost = ?, access = ? WHERE id = ?'
        $cordovaSQLite.execute(db, query, [name, phoneno, city, area, rentlease, propertytype, dimension, cost, access])
            .then(function(res) {
                    if (res.rows.length > 0) {
										  $scope.name      = res.rows.item(0).buyername;
										  $scope.phoneno   =  res.rows.item(0).phoneno;
										  $scope.city      =  res.rows.item(0).city;
										  $scope.area      =  res.rows.item(0).area;
										  $scope.rentlease =  res.rows.item(0).rentlease;
										  $scope.propertytype =  res.rows.item(0).propertytype;
										  $scope.dimension =  res.rows.item(0).dimension;
										  $scope.cost      =  res.rows.item(0).cost;
										  $scope.id        =  res.rows.item(0).id;
										  $scope.access    =  res.rows.item(0).access;
										  $scope.role      =  res.rows.item(0).role;
                    }
                },
                function(error) {
                    window.alert("Error on loading: " + error.message);
                })
    }

		$scope.hide = function(){
		  $ionicLoading.hide();
		};

  }

  //open phone dialer and sms
  $scope.opendialer = function(phoneno) {
    window.open('tel:'+ phoneno +'', '_system', 'location=yes');
  }
  $scope.opensms = function(phoneno) {
    window.open('sms:'+ phoneno +'', '_system', 'location=yes');
  }

  // Dependent select box
  var x = [];
  for(var i=0; i<3; i++) {
    x.push({label: 'i', value: 'i'});
  }
        $scope.propertytype = {
            appartment : {
                label:'Appartment', value:'appartment',
                uOptions : [
                    {label: '1 BHK', value: '1bhk'},
                    {label: '2 BHK', value: '2bhk'},
                    {label: '3 BHK', value: '3bhk'},
                ]
            },
            residentialland : {
                label:'Residential Land', value:'residentialland',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            },
            independentvilla : {
                label:'Independent villa', value:'independentvilla',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            }
        }
  // Dependent select box ends

      $scope.openMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
      };

}])

/***********************************************************************************/
// contact controller
.controller('contactController', ['$scope', '$stateParams', '$cordovaSQLite', '$ionicLoading', '$rootScope', function($scope, $stateParams, $cordovaSQLite, $ionicLoading, $rootScope) {


}])

/***********************************************************************************/
// seller controller
.controller('sellerController', ['$scope', '$cordovaSQLite', '$ionicLoading', '$rootScope', function($scope, $cordovaSQLite, $ionicLoading, $rootScope) {

  // Dependent select box
  var x = [];
  for(var i=0; i<3; i++) {
    x.push({label: 'i', value: 'i'});
  }
        $scope.propertytype = {
            appartment : {
                label:'Appartment', value:'appartment',
                uOptions : [
                    {label: '1 BHK', value: '1bhk'},
                    {label: '2 BHK', value: '2bhk'},
                    {label: '3 BHK', value: '3bhk'},
                ]
            },
            residentialland : {
                label:'Residential Land', value:'residentialland',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            },
            independentvilla : {
                label:'Independent villa', value:'independentvilla',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            }
        }
  // Dependent select box ends

    $scope.postseller = function(sellername, phoneno, city, area, rentlease, propertytype, dimension, cost, access) {

      // execute INSERT statement with parameter

        // execute INSERT statement with parameter
        $cordovaSQLite.execute(db, 'INSERT INTO sellerdetail (sellername, phoneno, city, area, rentlease, propertytype, dimension, cost, access, role) VALUES (?,?,?,?,?,?,?,?,?,?)', [sellername, phoneno, city, area, rentlease, propertytype, dimension, cost, access, 'seller'])
            .then(function(result) {
              $scope.sellername            = '';
              $scope.phoneno              = '';
              $scope.city                 = '';
              $scope.area                 = '';
              $scope.rentlease            = '';
              $scope.fields.propertytype  = '';
              $scope.fields.dimension     = '';
              $scope.cost                 = '';
              $scope.access               = '';         
											$ionicLoading.show({
												duration: 2000,
												template: '<ion-spinner icon="android"></ion-spinner><p>Adding seller record please wait...</p>'
											});

										  $scope.hide = function(){
											$ionicLoading.hide();
										  };

            }, function(error) {
                window.alert("Error on saving: " + error.message);
            })
    }

}])

/***********************************************************************************/
// buyer controller
.controller('buyerController', ['$scope', '$cordovaSQLite', '$ionicLoading', '$rootScope', function($scope, $cordovaSQLite, $ionicLoading, $rootScope) {

  // Dependent select box
  var x = [];
  for(var i=0; i<3; i++) {
    x.push({label: 'i', value: 'i'});
  }
        $scope.propertytype = {
            appartment : {
                label:'Appartment', value:'appartment',
                uOptions : [
                    {label: '1 BHK', value: '1bhk'},
                    {label: '2 BHK', value: '2bhk'},
                    {label: '3 BHK', value: '3bhk'},
                ]
            },
            residentialland : {
                label:'Residential Land', value:'residentialland',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            },
            independentvilla : {
                label:'Independent villa', value:'independentvilla',
                uOptions :[
                    {label: '20x30 Sq ft', value: '600'},
                    {label: '30x40 Sq ft', value: '1200'},
                    {label: '40x60 Sq ft', value: '2400'},
                    {label: '50x80 Sq ft', value: '4000'},
                ]
            }
        }
  // Dependent select box ends

    $scope.postbuyer = function(buyername, phoneno, city, area, rentlease, propertytype, dimension, cost, access) {

      // execute INSERT statement with parameter

        // execute INSERT statement with parameter
        $cordovaSQLite.execute(db, 'INSERT INTO buyerdetail (buyername, phoneno, city, area, rentlease, propertytype, dimension, cost, access, role) VALUES (?,?,?,?,?,?,?,?,?,?)', [buyername, phoneno, city, area, rentlease, propertytype, dimension, cost, access, 'buyer'])
            .then(function(result) {
              $scope.buyername            = '';
              $scope.phoneno              = '';
              $scope.city                 = '';
              $scope.area                 = '';
              $scope.rentlease            = '';
              $scope.fields.propertytype  = '';
              $scope.fields.dimension     = '';
              $scope.cost                 = '';
              $scope.access               = '';    
											$ionicLoading.show({
												duration: 2000,
												template: '<ion-spinner icon="android"></ion-spinner><p>Adding buyer record please wait...</p>'
											});

										  $scope.hide = function(){
											$ionicLoading.hide();
										  };

            }, function(error) {
                window.alert("Error on saving: " + error.message);
            })
    }

}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
