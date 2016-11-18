(function(angular) {

    angular.module('translateTest', ['safe.translate'])
    .config(configFn);

    configFn.$inject = ['translateServiceProvider'];
    function configFn(translateServiceProvider){
      translateServiceProvider.setLangPath('bower_components/translate/lang');
      translateServiceProvider.setDefaultLanguage('es');
      console.log(translateServiceProvider.getString('L_CHOOSE_LANGUAGE'));
    }

})(window.angular);
