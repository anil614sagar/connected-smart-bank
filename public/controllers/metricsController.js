netbnk.controller('metricsController', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
    $scope.busyApp = true;
    $scope.metrics = 'coming soon...'

    //save metrics
    $scope.save = function () {

        var investmentData = {
            bonds: $scope.bonds,
            stocks: $scope.stocks,
            insurance: $scope.insurance,
            mutualFund: $scope.mutualFund,
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

//TODO add services

    }
}]);