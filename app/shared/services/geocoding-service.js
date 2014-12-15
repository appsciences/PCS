'use strict';

angular.module('csp.services.geocoding', [
    'csp.services.parse'
])
    .service('geocode', ['uiGmapGoogleMapApi', '$q', 'parseService', function (uiGmapGoogleMapApi, $q, parse) {
        return function (location) {
            var address = [
                location.address,
                location.city,
                location.state,
                location.zip
            ].join();

            var deferred = $q.defer();

            uiGmapGoogleMapApi.then(function (maps) {
                new maps.Geocoder().geocode({address: address}, function (result, status) {
                    if (status === maps.GeocoderStatus.OK) {
                        var googleLocation = result[0].geometry.location;
                        deferred.resolve(parse.geoPoint(googleLocation.lat(), googleLocation.lng()));
                    } else {
                        deferred.reject();
                    }
                });
            });

            return deferred.promise;
        };
    }]);