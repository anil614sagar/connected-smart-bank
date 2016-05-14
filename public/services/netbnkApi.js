/**
 * Created by ndavuluru on 15/05/16.
 */

netbnk.factory('netbnkApi', ['$http', function ($http) {
    var runApi = {};
    var baseUrl = 'netbnk/v1';

    runApi.sendMetrics = function (data) {
        return $http.post(baseUrl + '/metrics', {data: data})
    };

    runApi.sendHueDetails = function (details) {
        return $http.post(baseUrl + '/hue', {config: details})
    };

    return runApi;
}]);

