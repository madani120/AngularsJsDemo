/**
 * Main AngularJS Web Application
 */
var app = angular.module('TennisApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    // Pages
   
    .when("/club", {templateUrl: "partials/club.html", controller: "clubCtrl"})
    .when("/club/cours", {templateUrl: "partials/cours.html" , controller: "coursCtrl"})
    .when("/competitions", {templateUrl: "partials/competitions.html"})
    .when("/competitions/inscription", {templateUrl: "partials/inscri.html" , controller: "InscrCtrl"})
    .when("/competitions/participants/:sex", {templateUrl: "partials/participant.html", controller: "partiCtrl"})
    // else 
    .otherwise({redirectTo :"/"});
}]);

/**
 * Controls the Insrci
 */
app.controller('InscrCtrl', function ( $scope,$http  ) {

  $scope.env = function () {
       
        var date = new Date($scope.Pdate);
        var diff = Date.now() - date.getTime();
        var age = new Date(diff); 

        if( Math.abs(age.getUTCFullYear() - 1970)<15){
        $scope.al="alert alert-danger";
        $scope.al1="alert";
        $scope.alerte="!! Vous dever avoir minimum 15ans !!";
        }
        else{
        $scope.alerte="";
        $scope.al="";
        $scope.al1="";
      }

      }

});
 

/**
 * Controls participant.hmtl
 */
 app.controller('partiCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http ) {
  var sex = $routeParams.sex;
  if(sex=='M'){

  $http.get('donnees/participants.json')    
   .success(function(data){    
     $scope.participants = data;    
   })    
   .error(function(data,status){    
     console.error('erreur de chargement de données', status, data);    
     $scope.participants = { };     
   });  
  $scope.listeTitre="Participants";
  $scope.listeSousTitre="--Hommes";
}else{
  $http.get('donnees/participantes.json')    
   .success(function(data){    
     $scope.participants = data;    
   })    
   .error(function(data,status){    
     console.error('erreur de chargement de données', status, data);    
     $scope.participants = { };     
   });  
  $scope.listeTitre="Participantes";
  $scope.listeSousTitre="--Femmes";
}
  
 
}]);


/**
 * Controls club.html
 */

app.controller('clubCtrl', ['$scope', '$http', function($scope, $http ) {
 
  $http.get('donnees/match.json')    
  .success(function(data){    
    $scope.matchs = data;    
  })    
  .error(function(data,status){    
    console.error('erreur de chargement de données', status, data);    
    $scope.matchs = { };     
  });  
 
}]);



/**
 * Controls cours.html
 */

app.controller('coursCtrl', ['$scope', '$http', function($scope, $http ) {
 
  $http.get('donnees/coursA.json')    
  .success(function(data){    
    $scope.coursA = data;    
  })    
  .error(function(data,status){    
    console.error('erreur de chargement de données', status, data);    
    $scope.matchs = { };     
  });  


  $http.get('donnees/coursE.json')    
  .success(function(data){    
    $scope.coursE = data;    
  })    
  .error(function(data,status){    
    console.error('erreur de chargement de données', status, data);    
    $scope.matchs = { };     
  });  
 
}]);
