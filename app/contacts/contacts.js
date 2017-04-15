'use strict';

angular.module('contactsApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])
// Contact Controller
.controller('ContactsCtrl', ['$scope', 'Firebase','$firebaseArray', function($scope, Firebase, $firebaseArray) {
  // init firebase
  var ref = firebase.database().ref();

  // get contacts
  var contacts = $firebaseArray(ref);
  $scope.contacts = contacts
  // console.log($scope.contacts);

  // show add form
  $scope.showAddForm = function () {
    $scope.addFormShow = true;
  };

  // show add form
  $scope.showEditForm = function (contact) {
    $scope.editFormShow = true;
    var id = $scope.id;
    $scope.name = contact.name;
    $scope.company = contact.company;
    $scope.email = contact.email;
    $scope.work_phone = contact.phones[0].work;
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.home_phone = contact.phones[0].home;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;


  };
  // hide form
  $scope.hide = function () {
    $scope.addFormShow = false;
    $scope.contactShow = false;
  };

  $scope.addFormSubmit = function () {
    console.log('adding contact');
    // assign values
    if($scope.name){
      var name = $scope.name;
    } else {
      var name = null;
    }
    if($scope.email){
      var email = $scope.email;
    } else {
      var email = null;
    }
    if($scope.company){
      var company = $scope.company;
    } else {
      var company = null;
    }
    if($scope.mobile_phone){
      var mobile_phone = $scope.mobile_phone;
    } else {
      var mobile_phone = null;
    }
    if($scope.work_phone){
      var work_phone = $scope.work_phone;
    } else {
      var work_phone = null;
    }
    if($scope.home_phone){
      var home_phone = $scope.home_phone;
    } else {
      var home_phone = null;
    }
    if($scope.street_address){
      var street_address = $scope.street_address;
    } else {
      var street_address = null;
    }
    if($scope.city){
      var city = $scope.city;
    } else {
      var city = null;
    }
    if($scope.state){
      var state = $scope.state;
    } else {
      var state = null;
    }
    if($scope.zipcode){
      var zipcode = $scope.zipcode;
    } else {
      var zipcode = null;
    }

    // object
    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [
        {
          mobile: mobile_phone,
          home: home_phone,
          work: work_phone
        }
      ],
      address: [
        {
          street_address: street_address,
          city: city,
          state: state,
          zipcode, zipcode
        }
      ]
    })
      .then(function (snap) {
        var id = snap.val();
        console.log('Added contacts with id: ' + id);
      });
    // clear form
    clearFields();

    // Hide form once submitted
    $scope.addFormShow = false;

    // send message to user
    $scope.msg = 'Contact Added!';
  };

  // edit form
  $scope.editFormSubmit = function () {
    var id = $scope.id;
    var record = $scope.contacts.$getRecord(id);

    record.name = $scope.name;
    record.email = $scope.email;
    record.company = $scope.company;
    record.phones[0].work = $scope.work_phone;
    record.phones[0].mobile = $scope.mobile_phone;
    record.phones[0].home = $scope.home_phone;
    record.address[0].street_address = $scope.street_address;
    record.address[0].city = $scope.city;
    record.address[0].state = $scope.state;
    record.address[0].zipcode = $scope.zipcode;

    $scope.contacts.$save(record).then(function (ref) {
      console.log(ref.key);
    });
    clearFields();

    $scope.editFormShow = false;
  };

  $scope.showContact = function (contact) {
    console.log('Getting Contacts');
    $scope.name = contact.name;
    $scope.company = contact.company;
    $scope.email = contact.email;
    $scope.work_phone = contact.phones[0].work;
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.home_phone = contact.phones[0].home;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;

    $scope.contactShow = true;
    $scope.msg = 'Contact Updated';
  };


  $scope.removeContact = function (contact) {
    console.log('Removing COntact');
    $scope.contacts.$remove(contact);
    $scope.msg = 'Contact Removed';
  }
  function clearFields () {
    console.log('Clearing all data');
    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';

  }
}]);