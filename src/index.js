import angualr from 'angular'
import 'angular-route'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import './css/style.css'
import './home/home.js'
import './phoneDetail/phoneDetail.js'
import 'angular-animate'



const app = angualr.module('app', ['ngRoute', 'home', 'phoneDetail','ngAnimate'])

app.config(['$routeProvider', function (provider) {
    // 添加路由标记：以/开头，标记名称可以自定义
    provider.when('/', {
        template: require('./home/home.html'),
        controller: 'homeCtrl'
    }).when('/phoneDetail/:token', {
        template: require('./phoneDetail/phoneDetail.html'),
        controller: 'phoneCtrl'
    })
}])
