var netbnk = angular.module('netbnk', ['ui.router'])

netbnk.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    // route to show our basic form (/form)
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/views/dashboard.html',
            controller: 'dashboardController'
        })
        // nested states
        // each of these sections will have their own view
        // urls will be nested
        .state('metricsConfig', {
            url: '/metricsConfig',
            templateUrl: '/views/metricsConfig.html',
            controller: 'metricsController'
        })

        .state('hueController', {
            url: '/hue',
            templateUrl: 'views/hueConfig.html',
            controller: 'hueController'
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

