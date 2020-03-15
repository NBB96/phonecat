import angular from 'angular'

angular.module('phoneDetail', []).controller('phoneCtrl', ['$scope', '$routeParams', '$http', function (scope, routeParams, http) {
    console.log(routeParams.token, typeof routeParams.token)
    let k = 'static/data/phones/' + routeParams.token + '.json'
    console.log(k)
    http.get(k).then(resp => {
        scope.detail = resp.data

        scope.target=scope.detail.images[0]
        scope.change = function (index) {
            scope.target=scope.detail.images[index]
        }
        console.log(scope.detail)
    }).catch(error => {
        console.log(error)
    })
    // scope.img=''
    // scope.change=function(index){
    //  let src=this.detail.images[index]
    //  console.log(src)
    //  scope.img=src
    // }
}])