(function(){
var app = angular.module('myApp');

app.controller('myCtrl', ['$http','fakeSvc','carSvc','$uibModal',function($http,fakeSvc, carSvc, $uibModal){

    var scope = this;
    scope.years = [];
    scope.makes = [];
    scope.models = [];
    scope.trims = [];
    scope.selected = {
        year: '',
        make: '',
        model: '',
        trim: ''
    }
    scope.cars = [];
    //{ id: 1, model_year: '2002', make: 'Toyota', model_name: 'Prius', model_trim: 'trim1' },
    //{ id: 2, model_year: '2003', make: 'Nissan', model_name: 'Abc', model_trim: 'trim4' },
    //{ id: 3, model_year: '2007', make: 'BMW', model_name: 'Pqr', model_trim: 'trim2' },
    //{ id: 4, model_year: '2001', make: 'Acura', model_name: 'Blah', model_trim: 'trim7' },
    //{ id: 5, model_year: '2000', make: 'Merc', model_name: 'pft', model_trim: 'trim9' }
    //];

    scope.getYears = function () {
        //scope.years = ['1999', '2000', '2001', '2002', '2003'];//http://RiaCar.azurewebsites.net
        carSvc.getYears().then(function (data) {
        //$http.get("http://RiaCar.azurewebsites.net/api/cars/GetYears").then(function (response) {
            scope.years = data;
            scope.makes = [];
            scope.models = [];
            scope.trims = [];
            scope.selected.year = '';
            scope.selected.make = '';
            scope.selected.model = '';
            scope.selected.trim = '';
        });
    }

    scope.getCars = function () {
        carSvc.getCars(scope.selected).then(function (data) {
        //$http.post("http://RiaCar.azurewebsites.net/api/cars/GetCars", scope.selected).then(function (response) {
            scope.cars = data;
        })
    }
    //scope.getnhtsayears = function () {
    //    //return $http.post('/api/cars/GetInfo', { id: id })
    //    $http({ 
    //        url: 'http://www.nhtsa.gov/webapi/api/Recalls/vehicle?format=json',
    //        headers: { 'AccessControlAllowOrigin': 'http://localhost:55279/' }
    //    })
    //        .then(function (response) {
    //        console.log(response.data);
    //    })
    //}
    //scope.getnhtsayears();
    scope.getMakes = function () {
        carSvc.getMakes(scope.selected).then(function (data) {
        //$http.get("http://RiaCar.azurewebsites.net/api/cars/GetMakes", {params: {year: scope.selected.year}}).then(function (response) {

            scope.makes = data;
            scope.models = [];
            scope.trims = [];
            scope.selected.make = '';
            scope.selected.model = '';
            scope.selected.trim = '';
            scope.getCars();
        })
    }

    scope.getModels = function () {
        carSvc.getModels(scope.selected).then(function (data) {
            scope.models = data;
            scope.trims = [];
            scope.selected.model = '';
            scope.selected.trim = '';
            scope.getCars();
        })
    }

    scope.getTrims = function () {
        carSvc.getTrims(scope.selected).then(function (data) {
            scope.trims = data;
            scope.selected.trim = '';
            scope.getCars();
        })
    }

    scope.open = function (id) {
        console.log("Id in open " + id);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'carModal.html',
            controller: 'carModalCtrl as cm',
            size: 'lg',
            resolve: {
                car: function () {
                    console.log("inside resolve");
                    return carSvc.getCar(id);
                }
             }
        });
    };

    scope.getYears();

}]);

app.controller('carModalCtrl', ['$uibModalInstance','car',function ($uibModalInstance, car) {

    var scope = this;

    scope.car = car;
    console.log("in the car controller with : ");
    scope.ok = function () {
        $uibModalInstance.close();
    };

    scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}]);


})();
  



//scope.name = 'Ria';
//scope.names = ['Abby', 'Dan', 'Chris', 'Matt'];
//scope.time = new Date();
//scope.selectedColor = 'red';

//$interval(function () {
//    scope.time = new Date();
//}, 1000);

//scope.click = function () {
//    scope.selectedColor = 'red';
//}