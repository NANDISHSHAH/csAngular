var app = angular.module('myngCsv', []);

app.controller('ngcsvCtrl', [
    '$scope',
    'readFileData',
    function($scope, readFileData) {
      $scope.fileDataObj = {};
      $scope.ct=0;
    $scope.uploadFile = function() {
      if ($scope.fileContent) {
        $scope.fileDataObj = readFileData.processData($scope.fileContent);
      
        $scope.fileData = JSON.stringify($scope.fileDataObj);

        var typed = new Typed('#typed-strings',{
            strings: ["File Uploaded Successfully!","File Uploaded Successfully!"],
            backSpeed: 40,
            typeSpeed: 40
          });

        $scope.regno=[]; 
        for(var key in $scope.fileDataObj){
            $scope.regno.push(key);
          }
      }
    }
    
    $scope.getRegNo = function(a){
      $scope.selected_reg_no=a;

      $scope.tableArray = $scope.fileDataObj[$scope.selected_reg_no];
      $scope.typed_regno = $scope.tableArray[0][0];
      $scope.typed_name=$scope.tableArray[0][1];

      if($scope.ct==0){
      var typed = new Typed('#typed-regno',{
        strings: [a],
        backSpeed: 40,
        typeSpeed: 40
      });
      var typed = new Typed('#typed-name',{
        strings: [$scope.tableArray[0][1]],
        backSpeed: 40,
        typeSpeed: 40
      });
      $scope.ct++;
    }
    }
   
 }]);
 
 app.directive('fileReaderDirective', function() {
    return {
        restrict: "A",
        scope: {
            fileReaderDirective: "=",
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function() {
                            scope.fileReaderDirective = contents;
                        });
                    };
                    r.readAsText(files[0]);
                }
            });
        }
    };
});

app.factory('readFileData', function() {
    return {
        processData: function(csv_data) {
            var record = csv_data.split(/\r\n|\n/);
            var headers = record[0].split(',');
            var lines = [];
            var json = {};
            var obj = {}; 

            for (var i = 0; i < record.length; i++) {
                var data = record[i].split(',');
                if (data.length == headers.length) {
                    var tarr = [];
                    for (var j = 0; j < headers.length; j++) {
                        tarr.push(data[j]);
                    }
                    lines.push(tarr);
                }
            }
            var arr1 = [];
            for(var iter = 1; iter < lines.length; iter++){
              arr1 = lines[iter];
              if(obj[arr1[0]]){
                  obj[arr1[0]].push(arr1);
              }
              else{

                obj[arr1[0]] = [arr1];
              }
            }
            return obj;
        }
    };
});

var elementId = [];

var newArr = arr.filter(el => {
  if (elementId.indexOf(el.id) === -1) {
      elementId.push(el.id);
      return true;
  } else {
      return false;
  }
});




