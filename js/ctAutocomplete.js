var app = angular.module('ctSite', []);

// If you type in an input field or press enter while focused
// the event fires
app.directive('typing', function ($timeout, $window) {
  return function (scope, element, attrs) {
    element.bind("blur keydown", function(event) {
      $timeout.cancel($window.__typingTimer);

      if (event.type === "keydown") {
          // On enter
          if (event.which === 13) {
            scope.$apply(function () {
              scope.$eval(attrs.typing);
            });

            event.preventDefault();
          }

          $window.__typingTimer = $timeout(function() {
            scope.$apply(function () {
              scope.$eval(attrs.typing);
            });

          }, 200);
      }
    });
  };
});

app.controller('ctAutocomplete', function ($scope, $http, $location) {
  var URL = "http://178.62.230.23";

  // For autocompletion suggestions
  $scope.__selected = "";
  $scope.__suggestions = false;
  $scope.__placeholder = "Enter your search term...";

  $scope.__hits = 0;
  $scope.__took = 0;
  $scope.__noResult = false;

  $scope.__newSynonym   = "";
  $scope.__currentTerm  = {};
  $scope.__currentTerms = [];

  var previousTerm = "";

  $scope.APIsuggestions = function(val, added) {
      // If term == previous term, don't update
      if (val && val.length > 1) {
          if (previousTerm !== val) {
              previousTerm = val;

              return $http.post(URL + "/autocomplete", { 'query' : val, 'selectedIds' : [] })
                .then(function(result) {
                    previousTerm = "";

                    $scope.__hits = result.data.hits;
                    $scope.__took = result.data.took;

                    $scope.__noResult = !(!!result.data.hits);
                });
          }
      }
      else {
          $scope.__hits = [];
      }
  };

  $scope.onSelect = function(item, fieldName) {
    if (typeof item !== 'undefined') {
      if (item && !!item.cui && item.cui) {
        $scope.__hits = false;

        // TODO can change this _id to "cui"
        var saveObj = {
          '_id' : item.cui,
          'str' : item.str,
          'terms'    : [item.str],
          'selected' : [item.str]
        }

        // Add autocomplete terms
        $http.post(URL + "/expand", { 'query' : item.cui })
          .success(function(terms) {
              terms = terms.filter(function(e){ return e; });

              saveObj.terms    = terms;
              saveObj.selected = _.clone(terms);

              $scope.emptyForm = false;
          });

        if (!!item.reason) {
          saveObj.suggested = true;
        }

        if (!!$scope.item[fieldName] && $scope.item[fieldName].length > 0) {
            $scope.item[fieldName].push(saveObj);
        }
        else {
            $scope.item[fieldName] = [saveObj];
        }

        $scope.__placeholder = "You can include another term";
        $scope.__selected = "";
      }
    }
  };

  /*
  $scope.startSynonymBrowser = function(term) {
      $scope.__currentTerm  = term;
      $scope.__currentTerms = _.uniq(_.clone(term.terms));
  };
  */
});
