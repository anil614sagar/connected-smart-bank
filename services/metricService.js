/**
 * Created by ndavuluru on 15/05/16.
 */

netbnk.factory('netbnkApi', ['$http', function($http) {
    var runApi = {};
    var baseUrl = 'netbnk/v1';

    runApi.sendMetrics = function () {
        return $http.post(baseUrl + '/metricsConfig',  )
    }
}]);

