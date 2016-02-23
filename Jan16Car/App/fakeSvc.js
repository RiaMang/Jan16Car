angular.module('myApp').factory('fakeSvc', ['$q', function ($q) {
    var service = {};

    service.getYears = function () {
        var deferred = $q.defer();
        deferred.resolve([1990, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2012, 2013]);
        return deferred.promise;
    }

    service.getMakes = function (year) {
        var deferred = $q.defer();
        switch (year) {
            case 1990:
            case 1991:
            case 1992:
                deferred.resolve(['Ford', 'Hyundai', 'Dodge', 'Acura', 'Nissan'])
                break;
            case 1998:
            case 1999:
            case 2000:
                deferred.resolve(['Toyota', 'Honda', 'Ford'])
                break;
            case 2001:
            case 2002:
            case 2003:
            case 2004:
                deferred.resolve(['Toyota', 'Honda', 'Ford', 'Acura'])
                break;
            case 2005:
            case 2006:
            case 2007:
            case 2008:
            case 2009:
            case 2010:
                deferred.resolve(['Toyota', 'Honda', 'Ford', 'Hyundai', 'Dodge'])
                break;
            case 2011:
            case 2012:
            case 2013:
            case 2014:
            case 2015:
                deferred.resolve(['Toyota', 'Honda', 'Ford', 'Hyundai', 'Dodge', 'Acura', 'Nissan'])
                break;
        }
        return deferred.promise;
    };

    service.getModels = function (make) {
        var deferred = $q.defer();
        switch (make) {

            case 'Honda':
                deferred.resolve(['Civic', 'CRV', 'Accord', 'Fit'])
                break;
            case 'Toyota':
                deferred.resolve(['Rav4', 'Camry', 'Corolla'])
                break;
            case 'Ford':
                deferred.resolve(['Focus', 'Fiesta', 'Edge'])
                break;
            case 'Hyundai':
                deferred.resolve(['Sonata', 'I20', 'Santro'])
                break;
            case 'Nissan':
                deferred.resolve(['Maxima', 'Altima', 'Cube'])
                break;
            case 'Dodge':
                deferred.resolve(['Charger', 'Viper', 'Journey', 'Dart'])
                break;
            case 'Acura':
                deferred.resolve(['MDX', 'RDX', 'TLX', 'TL', 'ILX'])
                break;

        }
        return deferred.promise;
    };

    service.getTrims = function (model) {
        var deferred = $q.defer();
        var init = model.substring(0, 1);
        switch (init) {

            case 'M':
                deferred.resolve(['Mtrim1', 'Mtrim2', 'Mtrim3', 'Mtrim4', 'Mtrim5'])
                break;
            case 'R':
                deferred.resolve(['Rtrim1', 'Rtrim2', 'Rtrim3'])
                break;
            case 'T':
                deferred.resolve(['Ttrim1', 'Ttrim2', 'Ttrim3'])
                break;
            case 'I':
                deferred.resolve(['Itrim1', 'Itrim2', 'Itrim3'])
                break;
            case 'D':
                deferred.resolve(['Dtrim1', 'Dtrim2', 'Dtrim3'])
                break;
            case 'V':
                deferred.resolve(['Vtrim1', 'Viper', 'Vtrim2', 'Vtrim3'])
                break;
            case 'J':
                deferred.resolve(['Jtrim1', 'Jtrim2', 'Jtrim3', 'Jtrim4', 'Jtrim5'])
                break;
            case 'C':
                deferred.resolve(['Ctrim1', 'Ctrim2', 'Ctrim3'])
                break;
            case 'A':
                deferred.resolve(['Atrim1', 'Atrim2', 'Atrim3'])
                break;
            case 'S':
                deferred.resolve(['Strim1', 'Strim2', 'Strim3'])
                break;
            case 'F':
                deferred.resolve(['Ftrim1', 'Ftrim2', 'Ftrim3', 'Ftrim4'])
                break;
            case 'E':
                deferred.resolve(['Etrim1', 'Etrim2', 'Etrim3', 'Etrim4', 'Etrim5'])
                break;
        }
        return deferred.promise;
    };

    return service;
}])