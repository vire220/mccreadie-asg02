angular.module('MessageCtrl', ['ngMaterial', 'uiGmapgoogle-maps']).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAUg_E_UWYP6-A44kJZJTT6e3jcbAz1NfY',
        v: '3.24',
        libraries: 'weather,geometry,visualization'
    });
}).controller('MessageController', function($scope, $mdDialog, $mdMedia, Message) {

    $scope.tagline = 'Message controller test';

    $scope.user = window.u;
    Message.get($scope.user.id).success(function(data) {
        $scope.msg = data;
    });
    
    $scope.dateSort = function(m){
        return new Date(m.date);
    };

    $scope.showAdvanced = function(ev, msgId) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;


        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                msgId: msgId,
                id: $scope.user.id
            },
            fullscreen: useFullScreen
        });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });

    };

});

function DialogController($scope, $mdDialog, Message, msgId, id, uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function(maps) {
        Message.getOne(id, msgId).success(function(data) {
            $scope.msg = data[0];
            $scope.contact = data[0].contact;
            $scope.university = data[0].contact.university;

            var myLatLng = {
                lat: data[0].contact.university.latitude,
                lng: data[0].contact.university.longitude
            };
            $scope.map = new maps.Map(document.getElementsByClassName("angular-google-map-container")[0], {
                mapTypeId: maps.MapTypeId.TERRAIN,
                zoom: 15,
                center: myLatLng
            });

            new maps.Marker({
                position: myLatLng,
                map: $scope.map,
                title: data[0].contact.university.name
            });

        });
    });

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}