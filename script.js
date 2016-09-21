var app = angular.module('app', []);

app.controller('bookController', function($scope, $http) {
    $scope.information = '';
    $scope.booksInfo = [];

    $scope.bookName = null;
    $scope.bookAuthor = null;
    $scope.bookInfo = null;
    $scope.ranking = null;

    $scope.addBook = function(bookName, bookAuthor, bookInfo, ranking) {
        if($scope.bookName.length > 0 && $scope.bookAuthor.length > 0)
        {
            $scope.booksInfo.push({
                name: bookName,
                author: bookAuthor,
                info: bookInfo,
                rank: ranking
            });
            var data = {
                name: bookName,
                author: bookAuthor,
                info: bookInfo,
                rank: ranking
            };
            $http.post('/api/users/post', JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
            }, function (response) {
                $scope.msg = "Service not Exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers();
            });

            $scope.bookName = '';
            $scope.bookAuthor = '';
            $scope.bookInfo = '';
            $scope.ranking = 0;
            $scope.showPanel = false;
        }
    }

    $scope.isClicked = function(index) {
        var _str = $scope.booksInfo[index];
        var _info = "Nazov: " + _str.name + '\n';
        _info += "Autor: " + _str.author + '\n';
        if(_str.info == undefined) {
            _info += "Popis: Neuvedeny \n";
        }
        else {
            _info += "Popis: " + _str.info + '\n';
        }
        if(_str.rank == undefined) {
            _info += "Hodnotenie: Neuvedene \n";
        }
        else {
            _info += "Hodnotenie: " + _str.rank + '/5 \n';
        }
        alert(_info);
    }
});