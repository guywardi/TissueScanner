
//var config = require('../.../config');
//init frontpage
var pms = angular.module('qrms', ['ui.router'])



.config(["$urlRouterProvider", "$stateProvider", "$locationProvider",
  function($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('login', {

      url: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'

    }).state('list', {

      url: '/list',
      templateUrl: 'views/list.html',
      controller: 'ListCtrl'

    }).state('edit', {

      url: '/edit/:id',
      templateUrl: 'views/edit.html',
      controller: 'EditCtrl'

    }).state('new', {

      url: '/new',
      templateUrl: 'views/edit.html',
      controller: 'EditCtrl'

    }).state('print', {

      url: '/print/:id',
      templateUrl: 'views/print.html',
      controller: 'PrintCtrl'

    }).state('view', {

      url: '/view/:id',
      templateUrl: 'views/view.html',
      controller: 'ViewCtrl'

    }).state('single', {

      url: '/view/:id/:cid',
      templateUrl: 'views/single.html',
      controller: 'ViewCtrl'

    });

    $locationProvider.html5Mode(false);

}])

  /* ROOTSCOPE = MAIN SCOPE */
.controller('RootCtrl', ['$scope', '$rootScope', '$state', 'restcli', '$http', function($scope, $rootScope, $state, restcli, $http){ //base controller

  // initialize variables that are useful everywhere
  $scope = $rootScope; // irrelevant magic
  $rootScope.contentTypes = {1: "Only text", 2: "File", 3: "URL", 4: "Youtube"};
  $rootScope.loggedIn = false; // login flag
  $rootScope.currentUserName; // the user string? id or object could be in some other variable

  $rootScope.auth = function(){
    if(!$http.defaults.headers.common.Authorization){
      $state.go("login");
    }
  }

}])

//LOGIN
.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$http', 'restcli', function($scope, $rootScope, $state, $http, restcli) {

  $scope.username = "";
  $scope.password = "";

  $scope.authenticate = function(){
    restcli.auth($scope.username, $scope.password).success(function(data, status){
      $http.defaults.headers.common.Authorization = data.token;
      $scope.authMessage = "Logged in as "+$scope.username;
      $rootScope.loggedIn = true;
      $rootScope.currentUserName = $scope.username;
      $state.go("list");
    }).error(function(data, status){
      $scope.authMessage = "Invalid credentials.";
    });
  }


}])

//LIST ALL STUFFS
.controller('ListCtrl', ['$scope', '$rootScope', '$state', 'restcli', function($scope, $rootScope, $state, restcli) {

  $rootScope.auth();



  $scope.getExhibits = function(){
    restcli.getExhibits().success(function(data, status){
      console.log(data);
      $scope.exhibits = data;
    });
  }

  $scope.getExhibits();

  $scope.delete = function(id){
    if (confirm('Are you sure you want to delete this Store?')) {
    restcli.deleteExhibit(id).success(function(data, status){
      $scope.getExhibits();
    });
  }
  }

}])


//EDIT AND CREATE NEW
.controller('EditCtrl', ['$scope', '$rootScope', '$state', 'restcli', function($scope, $rootScope, $state, restcli) {

$scope.scanTime = 1;

  $rootScope.auth();
  var takePicture;
  var item_id;
  var nana;

  //Scanning the product and displaying the right image and name by the barcode scanned
    $scope.scanImage = function () {
      _.findIndex($scope.exhibit.content, function(piece) {
        var fornow = "te" + piece.temp_id;
        fornow.toString();
        console.log(fornow);
        console.log(piece.temp_id);
    takePicture = document.querySelector("."+fornow);
    //takePicture = document.querySelector(".shoot");
    console.log(takePicture);



    //Hide because of new image coming from scan
    if (document.getElementById("imggg") != null) {
      document.getElementById("imggg").style.display = "none";
    }

var showPicture = document.createElement("img");
    Result = document.querySelector("#error_scan");
    var canvas = document.getElementById("barcode_image");
    var ctx = canvas.getContext("2d");
    JOB.Init();

    JOB.SetImageCallback(function(result) {
      console.log("Starting image callback");
      if(result.length > 0){
        var tempArray = [];
        for(var i = 0; i < result.length; i++)
        {
          tempArray.push(result[i].Value);
        }

                  // Scanned ID
        var id = tempArray.join();
        console.log(id);
        if (id == 7316970152117)
        {
          document.getElementById("lambiwc").style.display = "block";
          document.getElementById("lambik").style.display = "none";
          document.getElementById("serlawc").style.display = "none";
          document.getElementById("pirkkawc").style.display = "none";
          document.getElementById("lotuswc").style.display = "none";
          document.getElementById("Lotus-Emilia").style.display = "none";
          nana = "Lambi-wc-paperi-6rl";
          $("#Pname").val(nana);
        }
        else if(id == 6414301011049)
        {
          nana= "Lambi-talouspaperi-3rl";
          document.getElementById("lambik").style.display = "block";
          document.getElementById("lambiwc").style.display = "none";
          document.getElementById("serlawc").style.display = "none";
          document.getElementById("pirkkawc").style.display = "none";
          document.getElementById("lotuswc").style.display = "none";
          document.getElementById("Lotus-Emilia").style.display = "none";
          $("#Pname").val(nana);
        }
        else if(id == 6414301003075)
        {
          nana= "Serla-wc-paperi-12rl";
          document.getElementById("lambik").style.display = "none";
          document.getElementById("lambiwc").style.display = "none";
          document.getElementById("serlawc").style.display = "block";
          document.getElementById("pirkkawc").style.display = "none";
          document.getElementById("lotuswc").style.display = "none";
          document.getElementById("Lotus-Emilia").style.display = "none";
          $("#Pname").val(nana);
        }
        else if(id == 6410405174925)
        {
          nana= "Pirkka-NIKSI-wc-paperi-6rl";
          document.getElementById("lambik").style.display = "none";
          document.getElementById("lambiwc").style.display = "none";
          document.getElementById("serlawc").style.display = "none";
          document.getElementById("pirkkawc").style.display = "block";
          document.getElementById("lotuswc").style.display = "none";
          document.getElementById("Lotus-Emilia").style.display = "none";
          $("#Pname").val(nana);
        }
        else if(id == 6413200020886)
        {
          nana= "lotus-Luonnonystävän-wc-paperi-8rl";
          document.getElementById("lambik").style.display = "none";
          document.getElementById("lambiwc").style.display = "none";
          document.getElementById("serlawc").style.display = "none";
          document.getElementById("pirkkawc").style.display = "none";
          document.getElementById("lotuswc").style.display = "block";
          document.getElementById("Lotus-Emilia").style.display = "none";
          $("#Pname").val(nana);
        }
        else if(id == 6413200340205)
        {
          nana= "Lotus-Emilia-4rl";
          document.getElementById("lambik").style.display = "none";
          document.getElementById("lambiwc").style.display = "none";
          document.getElementById("serlawc").style.display = "none";
          document.getElementById("pirkkawc").style.display = "none";
          document.getElementById("lotuswc").style.display = "none";
          document.getElementById("Lotus-Emilia").style.display = "block";
          $("#Pname").val(nana);
        }
          piece.title = nana;

                  // If the page is main
        /*if($.mobile.path.get() == "" || $.mobile.path.get() == "to_choose") {
          console.log("JUPPOOO!!");
          // If the new ID is not equal to active id
                      if(id != item_id){
                          // Change the value of the search input
                          $("input#search-1").val(id);
console.log("HERE IT IS")
                          console.log(id);
                          // Trigger the app.getSendData function (js/main.js)
                          //app.getSendData(id);
                      }
        }*/

      } else {
        if(result.length === 0) {
          Result.innerHTML="Decoding failed.";
        }
      }
    });


    JOB.PostOrientation = true;
    JOB.OrientationCallback = function(result) {
            console.log("Starting OrientationCallback");
      canvas.width = result.width;
      canvas.height = result.height;
      var data = ctx.getImageData(0,0,canvas.width,canvas.height);
      for(var i = 0; i < data.data.length; i++) {
        data.data[i] = result.data[i];
      }
      ctx.putImageData(data,0,0);
    };


    JOB.SwitchLocalizationFeedback(true);
    JOB.SetLocalizationCallback(function(result) {
      ctx.beginPath();
      ctx.lineWIdth = "2";
      ctx.strokeStyle="red";
      for(var i = 0; i < result.length; i++) {
        ctx.rect(result[i].x,result[i].y,result[i].width,result[i].height);
      }
      ctx.stroke();
    });

//document.getElementById("IDTeam").addEventListener("change", function() {//call function here});
    if(takePicture && showPicture) {
      console.log("TAKEPICTURE");
      takePicture.onchange = function (event) {
    //  takePicture.addEventListener("change", function(event) {
        console.log("onchange");
        var files = event.target.files;
        if (files && files.length > 0) {
          file = files[0];
          try {
            var URL = window.URL || window.webkitURL;
            showPicture.onload = function(event) {
              Result.innerHTML="";
              JOB.DecodeImage(showPicture);
              URL.revokeObjectURL(showPicture.src);
            };
            showPicture.src = URL.createObjectURL(file);
          }
          catch (e) {
            try {
              console.log("FileReader");
              var fileReader = new FileReader();
              fileReader.onload = function (event) {
                showPicture.onload = function(event) {
                  Result.innerHTML="";
                  console.log("filereader");
                  JOB.DecodeImage(showPicture);
                };
                showPicture.src = event.target.result;
              };
              fileReader.readAsDataURL(file);
            }
            catch (e) {
              Result.innerHTML = "Neither createObjectURL or FileReader are supported";
            }
          }
        }
      };
    }

  })
}
//END of scanning code



// option list of stores
  $scope.exhibit;
  $scope.statusMessage;
  $scope.stores = [
   { id: 1, name: 'K-market' },
   { id: 2, name: 'S-market' },
   { id: 3, name: 'K-Citymarket' },
   { id: 4, name: 'Siwa' },
   { id: 5, name: 'Valintatalo' },
   { id: 6, name: 'Alepa' },
   { id: 7, name: 'Prisma' }
 ];

 $scope.itemList = [];

//watcher for change of store
$scope.changedValue = function(item) {
  console.log(item);
  console.log(name);
   $scope.exhibit.store = item.name;
   console.log("Changed!!");

 }
 //watcher for date change
 $scope.changedDate = function(item) {
    var  mydate = new Date(date.value);
    var dass = (mydate.getMonth() + 1) + '/' + mydate.getDate() + '/' +  mydate.getFullYear();
  $scope.exhibit.myDate =  dass;
  }

  //making a new one or editing old?
  $scope.new = $state.params.id ? false : true;

  if(!$scope.new){
    restcli.getExhibit($state.params.id).success(function(data, status){
      //set main object
      console.log("getting exhibit");
      console.log(data);
      $scope.exhibit = data;
      for(var piece in $scope.exhibit.content){
        $scope.exhibit.content[piece].temp_id = $scope.exhibit.content[piece]._id; //give everyone temp ids because unsaved pieces of the content array dont have real onesadd
      }
    });
  }else{
    $scope.exhibit = {title: "",store: "",myDate: "" , content: []}; //create fresh main object
  }

//Calculation
$scope.saveCal = function(){
       _.findIndex($scope.exhibit.content, function(piece) {
      console.log("AHUZIM");
      var Ls = 150;
      var Hs = 60;
      var Ds = 70;
      var Lp;
      var Hp;
      var Dp;
      if (piece.title == "Serla-wc-paperi-12rl") {
        Lp = 42.5;
        Hp = 21.5;
        Dp = 20.2;
      }else if (piece.title == "lotus-Luonnonystävän-wc-paperi-8rl") {
        Lp = 42.0;
        Hp = 11.0;
        Dp = 20.5;
      }else if (piece.title == "Pirkka-NIKSI-wc-paperi-6rl") {
        Lp = 30.0;
        Hp = 20.0;
        Dp = 9.5;
      }else if (piece.title == "Lambi-talouspaperi-3rl") {
        Lp = 34.0;
        Hp = 11.5;
        Dp = 22.0;
      }else if (piece.title == "Lotus-Emilia-4rl") {
        Lp = 41.0;
        Hp = 21.5;
        Dp = 11.2;
      }else if (piece.title == "Lambi-wc-paperi-6rl") {
        Lp = 33.0;
        Hp = 20.2;
        Dp = 11.0;
      }

    var ammount = Math.floor(Ds / Dp);
    var products = piece.Ahuzim * ammount;
         piece.cal  = ((products * Lp * Dp * Hp) / (Ls*Hs*Ds)) * 100;
         piece.cal = Math.round(piece.cal * 100) / 100;
         console.log( piece.cal);
    })
}

  //save and re-init
  $scope.saveExhibit = function(){
  console.log("Yes Start1");
  $scope.statusMessage = "Saving...";
  console.log("Yes mid2");
  $scope.saveCal();
  restcli.setExhibit($scope.exhibit).success(function(data, status){
  console.log("Yes end3");
  $scope.statusMessage = "Save successful";
  $scope.exhibit = data;
    });
  }

  //save new and redirect to edit view
  $scope.newExhibit = function(){
    console.log("Yes Start");
    $scope.statusMessage = "Saving...";
    console.log("Yes mid");
    console.log($scope.exhibit);
          $scope.saveCal();
    restcli.addExhibit($scope.exhibit).success(function(data, status){
      console.log("Yes end");
      $state.go("edit", {id:data._id});
    });
  }

  //a container upload piece id that will be used in the following two functions
  $scope.uploadTarget;

  $scope.upload = function(id) {
      $scope.uploadTarget = id;
      var fd = new FormData();
      var targetIdx = _.findLastIndex($scope.exhibit.content, {temp_id: $scope.uploadTarget});
      var newFile = $scope.exhibit.content[targetIdx].newFile;
      fd.append("userPhoto", newFile);
      restcli.upload(fd).then(uploadHandler, uploadHandler);
  }

  var uploadHandler = function(data, status) {
      if (data["error"]) {
        alert(data["error"]);
      } else {
        var targetIdx = _.findLastIndex($scope.exhibit.content, {temp_id: $scope.uploadTarget});
        $scope.exhibit.content[targetIdx].url = "uploads/"+data[0].filename;
      }
  }

  $scope.addPiece = function(){
    $scope.scanTime++;
    $scope.exhibit.content.push({title: "", shelf: "", empty: "", Ahuzim: "",cal: "", temp_id: Date.now()});

    }



  $scope.deletePiece = function(id){
  if (confirm('Are you sure you want to delete this product?')) {
    var deleteIndex = _.findIndex($scope.exhibit.content, function(piece) { return piece.temp_id == id })
    $scope.exhibit.content.splice(deleteIndex, 1);
  }
  }

  $scope.parseDescription = function(o){
    return o["Category"]+"/"+o["Original filename"];
  }

}])

//PUBLIC VIEW
.controller('ViewCtrl', ['$scope', '$rootScope', '$state', 'restcli', '$sce', '$timeout', function($scope, $rootScope, $state, restcli, $sce, $timeout) {

  $scope.exhibit;
  $scope.child;

  $scope.fileTypes = {
    html : "link",
    php : "link",
    jpg : "pic",
    jpeg : "pic",
    png : "pic",
    gif : "pic",
    mp4 : "vid",
    wav : "noiz",
    mp3 : "noiz"
  }

  $scope.fileExtension = function( url ) {
      return url.split('.').pop().split(/\#|\?/)[0];
  }

  restcli.getExhibit($state.params.id).success(function(data, status){
    $scope.exhibit = data;
    for(var piece in $scope.exhibit.content){

      //create SRC attributes from urls on load
      $scope.exhibit.content[piece].src = $sce.trustAsResourceUrl($scope.exhibit.content[piece].url);

      if($scope.exhibit.content[piece].url){
        $scope.exhibit.content[piece].medium = $scope.fileTypes[$scope.fileExtension($scope.exhibit.content[piece].url)];
      }
      if(typeof $scope.exhibit.content[piece].medium == "undefined"){
        $scope.exhibit.content[piece].medium = "link";
      }

    }
    //spaghetti exception for the child view
    if($state.params.cid){
      $scope.child = _.where($scope.exhibit.content, {_id: $state.params.cid})[0];
    }

    $timeout(function () {
      //defined in youtube.js
    //  loadYoutubePlayers();
    }, 0, false);

  });


}])

//PRINT
.controller('PrintCtrl', ['$scope', '$rootScope', '$state', 'restcli', function($scope, $rootScope, $state, restcli) {
/*
  $rootScope.auth();

  $scope.exhibit;

  restcli.getExhibit($state.params.id).success(function(data, status){
    $scope.exhibit = data; 
    /* global jQuery (comment for c9 IDE) *
    jQuery('#qrcode').qrcode({width: 500, height:500, text: "http://museoapi-vwnb.c9users.io/#/view/"+$state.params.id});
  });
*/

}])

//factory with API helpers
.factory('restcli', ['$http', '$q', function($http, $q){
  return {
    getYoutubeVideos: function(){
        //var queryLink =  "https://json2jsonp.com/?url="+encodeURIComponent("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDgzKrvkzEMLk96SNczfyKKnlp58UO9WKY&channelId=UCYmgafhGsL3zCP6H1eObajg&part=snippet,id&order=date&maxResults=50")+"&callback=JSON_CALLBACK";

        var queryLink =  "https://json2jsonp.com/?url="+encodeURIComponent("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDgzKrvkzEMLk96SNczfyKKnlp58UO9WKY&channelId=UCYmgafhGsL3zCP6H1eObajg&part=snippet,id&order=date&maxResults=50")+"&callback=JSON_CALLBACK";
        return $http.jsonp(queryLink);
      },
      //           var queryLink = "https://json2jsonp.com/?url="+encodeURIComponent("http://resourcespace.tekniikanmuseo.fi/plugins/api_audio_search/index.php/?key=GpDVpyeWgjz_vSOWSmYWQfKWKmR5QKIRvHfvJlfaSI2e0PO40NpqXEbFe2tktiCnTatqpuo5zpNt9xBjYbExULC98NBpWWbSXw-Fkp9TP2UffogX3B018h--LMwbnkgB&format=mp3&link=true")+"&callback=JSON_CALLBACK";
      getAudioResources: function() {
          var queryLink = "https://json2jsonp.com/?url="+encodeURIComponent("http://resourcespace.tekniikanmuseo.fi/plugins/api_audio_search/index.php/?key=GpDVpyeWgjz_vSOWSmYWQfKWKmR5QKIRvHfvJlfaSI2e0PO40NpqXEbFe2tktiCnTatqpuo5zpNt9xBjYbExULC98NBpWWbSXw-Fkp9TP2UffogX3B018h--LMwbnkgB&format=mp3&link=true")+"&callback=JSON_CALLBACK";
          return $http.jsonp(queryLink);
      },
  	  auth: function(username, password) {
  		    return $http.post('/api/authenticate', {username: username, password: password});
  	  },
      getUsers: function() {
  		    return $http.get('/api/users');
  	  },
  	  getExhibits: function(){
  	      return $http.get('/api/exhibits')
  	  },
  	  getExhibit: function(id){
  	      return $http.get('/api/exhibits/'+id)
  	  },
  	  setExhibit: function(data){
  	      return $http.put('/api/exhibits/'+data._id, data)
  	  },
  	  addExhibit: function(data){
  	      return $http.post('/api/exhibits/', data)
  	  },
  	  deleteExhibit: function(id){
  	      return $http.delete('/api/exhibits/'+id);
  	  },
  	  upload: function(data){

            var deferred = $q.defer();
            var getProgressListener = function(deferred) {
                return function(event) {
                    //this can be used to show an upload bar
                    var progpercent = ((100 * (event.loaded / event.total)).toFixed()) + "%";
                };
            };


            $.ajax({
                type: 'POST',
                url: '/api/uploads',
                data: data,
                cache: false,
                // Force this to be read from FormData
                contentType: false,
                processData: false,
                success: function(response, textStatus, jqXHR) {
                    deferred.resolve(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    deferred.reject(errorThrown);
                },
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener(
                            'progress', getProgressListener(deferred), false);
                    } else {
                        console.log('Upload progress is not supported.');
                    }
                    return myXhr;
                },
                beforeSend: function(xhr){
                  xhr.setRequestHeader("Authorization", $http.defaults.headers.common.Authorization);
                }
            });
            return deferred.promise;

  	  }
    }

}])

//model for sending files as FormData
.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
