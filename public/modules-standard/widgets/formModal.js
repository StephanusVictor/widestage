app.service('formModal', ['$uibModal', function($uibModal) {


      var modalDefaults = {
          backdrop: true,
          keyboard: true,
          modalFade: true,
          templateUrl: 'widgets/views/formModal.html'
      };

      var modalOptions = {
          closeButtonText: 'Close',
          actionButtonText: 'OK',
          headerText: 'Proceed?',
          bodyText: 'Perform this action?'
      };

      this.showModal = function (customModalDefaults, customModalOptions) {
          if (!customModalDefaults) customModalDefaults = {};
          customModalDefaults.backdrop = 'static';
          return this.show( customModalDefaults, customModalOptions);
      };

      this.show = function (customModalDefaults, customModalOptions) {
          //Create temp objects to work with since we're in a singleton service

          //Create temp objects to work with since we're in a singleton service

          var tempModalDefaults = {};
          var tempModalOptions = {};

          //Map angular-ui modal custom defaults to modal defaults defined in service
          angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

          //Map modal.html $scope custom properties to defaults defined in service
          angular.extend(tempModalOptions, modalOptions, customModalOptions);

          if (!tempModalDefaults.controller) {
              tempModalDefaults.controller = function ($scope, $uibModalInstance,$rootScope, $i18next) {

                  $scope.modalOptions = tempModalOptions;

                  if ($scope.modalOptions.model)
                      $scope.model = $scope.modalOptions.model;

                  if ($scope.modalOptions.object)
                      {
                            $scope.model = $scope.modalOptions.object.model;
                            $scope.definition = $scope.modalOptions.object.definition;

                            $scope.formLabel = $scope.modalOptions.object.definition.formLabel;
                            $scope.formDescription = $scope.modalOptions.object.definition.formDescription;

                      }

                  $scope.readonly = $scope.modalOptions.readonly;

                  $scope.modalOptions.ok = function (result) {
                        if ($scope.mode == 'new')
                        {
                          $uibModalInstance.close($scope.entity);
                        } else {
                          $uibModalInstance.close($scope.entity);
                        }
                  };


                  $scope.modalOptions.close = function (result) {
                      $uibModalInstance.dismiss('cancel');
                  };




              }
          }
          return $uibModal.open(tempModalDefaults).result;
          }
  }]);
