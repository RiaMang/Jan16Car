angular.module('myApp').factory('carSvc', ['$http', function ($http) {

    var service = {};

    service.getYears = function () {
        return $http.get('/api/cars/GetYears').then(function (response) {
            return response.data;
        })
    }

    service.getMakes = function (selected) {
        return $http.get('/api/cars/GetMakes', { params: { year: selected.year }}).then(function (response) {
            return response.data;
        })
    }

    service.getModels = function (selected) {
        return $http.get('/api/cars/GetModels', { params: { year: selected.year, make: selected.make } }).then(function (response) {
            return response.data;
        })
    }

    service.getTrims = function (selected) {
        return $http.get('/api/cars/GetTrims', { params: { year: selected.year, make: selected.make, model: selected.model } })
            .then(function (response) {
            return response.data;
        })
    }

    service.getCars = function (selected) {
        return $http.get('/api/cars/GetCars', { params: { year: selected.year, make: selected.make, model: selected.model } })
            .then(function (response) {
            return response.data;
        })
    }

    service.getCar = function (id) {
        return $http.get('/api/cars/GetInfo', {params: {id: id}}).then(function (response) {
            return response.data;
        })
    }
    return service;
}])