angular.module('csp.shared.ctrl', [])

    .controller(
        'namedCtrl',
        [
            '$scope',
            '$modal',
            '$filter',
            'models',
            'ModelService',
            'modelName',
            function ($scope, $modal, $filter, models, Model, modelName) {

                $scope.models = models;

                $scope.title = modelName;

                var showModal = function (model) {
                    var modalInstance = $modal.open({
                        templateUrl: 'shared/partials/named-edit.html',
                        controller: 'namedEditCtrl',
                        resolve: {
                            model: function () {
                                return model;
                            },
                            modelName: function () {
                                return modelName;
                            }
                        },
                        size: 'lg',
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (model) {
                        var addNewModel = model.isNew();

                        model.save().then(function (model) {
                            if (addNewModel) {
                                $scope.models.push(model);
                            }
                        }, function (err) {
                            //TODO: Patient Save Error
                            err;
                        });

                    }, function (err) {
                        //TODO: Modal Result Error
                        err;
                    });

                };

                $scope.add = function () {
                    showModal(new Model());
                };

                $scope.edit = function (model) {
                    showModal(model);
                };

                $scope.headerButtons = [ {label: 'Add', click: $scope.add} ];

                $scope.headings = [ '', 'Name'];


                $scope.fields = [
                    {type: 'editButton', click: $scope.edit},
                    "name"
                ];
            }
        ]
    ).

    controller(
        'namedEditCtrl',
        [
            '$scope',
            '$modalInstance',
            'model',
            'modelName',
            function ($scope, $modalInstance, model, modelName) {

                //header text
                $scope.headerText = model.isNew() ? 'New ' + modelName : 'Edit ' + modelName;

                $scope.model = model;

                $scope.modelName = modelName;

                $scope.save = function () {
                    $modalInstance.close($scope.model);
                };

                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]
    );