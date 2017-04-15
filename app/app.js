'use strict';

// Declare app level module which depends on views, and components
angular.module('contactsApp', [
  'ngRoute',
  'firebase',
  'contactsApp.contacts'
])
  .factory('Firebase', function () {
    var config = {
      apiKey: "AIzaSyDHcHKWmrd4RM8huh3W8BW48ibWjkHi2wU",
      authDomain: "contacts-app-86529.firebaseapp.com",
      databaseURL: "https://contacts-app-86529.firebaseio.com",
      projectId: "contacts-app-86529",
      storageBucket: "contacts-app-86529.appspot.com",
      messagingSenderId: "412658091"
    };
    return firebase.initializeApp(config);
  })
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
