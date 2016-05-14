/**
 * Created by ndavuluru on 15/05/16.
 */

netbnk.controller('hueController', ['$scope', '$stateParams', '$state', 'netbnkApi', function ($scope, $stateParams, $state, netbnkApi) {
    $scope.busyApp = true;
    $scope.phillipsIpAddr = '192.168.1.131';
    $scope.pName = 'Netbnk-home-device';

    var body = {
        ip: $scope.phillipsIpAddr,
        name: $scope.pName
    };

    $scope.send = function () {
        netbnkApi.sendHueDetails(body)
            .then(function (response) {
                alert('submitted successfully');
                console.log(response)
            }, function (err) {
                console.log(err)
            });
    };




}]);
