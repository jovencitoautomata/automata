app.controller('TableController', function($scope, $timeout) {
  
    $timeout(function(){
      $scope.loaded = true;
    },1500)

      $scope.data = [{
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      },
                    {
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      },{
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      }];
   
      $scope.columns = [{
          "name": "Your name",
          "identificator": "name",
          "settings": {
            "sortable": true,
          }
        }, {
          "name": "Surname"
        }, {
          "name": "Phone number",
          "identificator": "phone",
          "settings": {
            "sortable": true,
          }
        }]
});
