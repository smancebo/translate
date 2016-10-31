(function(angular) {

    angular.module('translateTest', ['safe.translate'])
    .config(configFn);

    configFn.$inject = ['translateServiceProvider'];
    function configFn(translateServiceProvider){
      translateServiceProvider.setLangPath('bower_components/translate/lang');
    }

})(window.angular);
