import angualr from 'angular'

angualr.module('home', []).controller('homeCtrl', ['$scope', '$http','$filter', function (scope, http,filter) {
    http.get('static/data/phones/phones.json').then(resp => {
        scope.phoneData = resp.data
    }).catch(error => {
        console.log(error)
    })
    scope.search = ''
    scope.field = ''

    scope.accName = function () {
        this.field = 'name'
        this.phoneData = filter('orderBy')(this.phoneData, this.field)
    }
    scope.accAge = function () {
        this.field = '-age'
        this.phoneData = filter('orderBy')(this.phoneData, this.field)
    }
}])