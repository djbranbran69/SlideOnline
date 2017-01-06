angular.module('adminApp').controller('playerCtrl', playerCrtFnt);

eventCrtFnt.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function playerCrtFnt($scope, $log, $window, factory, comm) {

    var socket = comm.io.socketConnection($scope, "Test connection");

    $scope.presBegin = function () {
        comm.io.emitBegin(socket);
    }

    $scope.presEnd = function () {
        comm.io.emitEnd(socket);
    }

    $scope.presPrev = function () {
        comm.io.emitPrev(socket);
    }

    $scope.presNext = function () {
        comm.io.emitNext(socket);
    }

    $scope.presStart = function () {
        comm.io.emitStart(socket, $scope.currentPresenation.id);
    }

    $scope.presPause = function () {
        comm.io.emitEnd(socket);
    }
};
