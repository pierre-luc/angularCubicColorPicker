angular.module('cubicColorPicker', [])
  .directive('cubicColorPicker', function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '=bind',
        onchange: '=onchange'
      },
      controller: function($timeout, $scope){
        $scope.update = function(){
          $timeout(function(){}, 1);
        }
      },
      compile: function compile(tElement, tAttrs, transclude) {
          return {
              pre: function preLink(scope, iElement, iAttrs, controller) {
              },
              post: function postLink(scope, iElement, iAttrs, controller) {
                  for(var k in iElement){
                      if ("object" === typeof iElement[k]){
                        var picker = new CubicColorPicker(iElement[k]);
                        if (typeof scope.model !== "undefined"){
                          angular.element(picker).on('colorHasChanged', function(){
                            scope.model = picker.getColor();
                            scope.update();
                          })
                        }
                        if (typeof scope.onchange === 'function'){
                          angular.element(picker).on('colorHasChanged', function(){
                            scope.onchange(picker.getColor());
                          })
                        }
                      }
                  }
              }
          };
      }
    }
  })
