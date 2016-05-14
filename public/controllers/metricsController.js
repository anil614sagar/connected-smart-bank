netbnk.controller('metricsController', ['$scope', '$stateParams', '$state', 'netbnkApi', function ($scope, $stateParams, $state, netbnkApi) {
    $scope.busyApp = true;
    $scope.metrics = 'coming soon...'
    $scope.bonds = 10
    $scope.stock = 20
    $scope.insurance = 20
    $scope.mutualFunds = 30
    $scope.fd = 20


    $scope.rent = 40
    $scope.shopping = 10
    $scope.travel = 10
    $scope.food = 10
    $scope.emi = 10
    //save metrics
    $scope.save = function () {

        var investmentData = {
            bonds: $scope.bonds,
            stocks: $scope.stock,
            insurance: $scope.insurance,
            mutualFund: $scope.mutualFunds,
            fd: $scope.fd,
            misc: $scope.misc
        };

        var spendsData = {
            rent: $scope.rent,
            shopping: $scope.shopping,
            travel: $scope.travel,
            food: $scope.food,
            emi: $scope.emi,
            misc: $scope.misc
        };

        var body = {
            idealInvestment: investmentData,
            idealSpend: spendsData,
            mobileNumber: '9677034014'
        }

        netbnkApi.sendMetrics(body)
            .then(function (response) {
                alert('submitted successfully');
                console.log(response)
            }, function (err) {
                console.log(err)
            })

    }
}]);