angular.module('csp.services.doctor').

    service('doctorListService', ['DoctorService', function (Doctor) {

        var query = new Parse.Query(Doctor);
        query.include('specialties');
        query.include('locations');
        return query.find();
    }]);

