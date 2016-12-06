(function(angular, localStorage) {

    /******************************************
     * AngularJs Dynamic translate String filter
     * Samuel J. Mancebo
     * https://www.github.com/smancebo/translate.git
     * 2016
     ******************************************/

    angular.module('safe.translate', [])
        .run(runFn)
        .provider('translateService', translateServiceProvider)
        .filter('translate', translate);


    runFn.$inject = ['$rootScope', 'translateService', '$filter'];

    function runFn($rootScope, translateService, $filter) {

        translateService.loadLanguage(localStorage.safeLangConfig).then(function(lang) {
            $rootScope.lang = lang;
        });

        $rootScope.form = {};
        if (localStorage.langObj === undefined || localStorage.langObj === "") localStorage.langObj = '{"description" : "ENGLISH", "langid" : "en"}';

        $rootScope.form.selectedLanguage = JSON.parse(localStorage.langObj);
        translateService.loadAvailableLanguages().then(function(languages) {

            $rootScope.Languages = languages;
            $rootScope.translate = function(text) {
                return $rootScope.lang[text];
            };
            $rootScope.getString = function(str) {
                return $filter('translate')(str);
            };
            $rootScope.changeLanguage = function() {
                var lang = $rootScope.form.selectedLanguage.id;
                localStorage.langObj = JSON.stringify($rootScope.form.selectedLanguage);
                translateService.loadLanguage(lang).then(function() {
                    location = location.pathname;
                });
            };
            $rootScope.reloadLanguage = function(lang) {

                delete localStorage.safeLang;
                delete localStorage.safeLangConfig;
                delete localStorage.langObj;
                $rootScope.form.selectedLanguage.id = lang;
                $rootScope.changeLanguage();
            };
        });
    }


    function translateServiceProvider() {

        var __langPath = 'lang';
        var __defaultLang = 'en';

        this.setLangPath = setLangPath;
        this.setDefaultLanguage = setDefaultLanguage;
        this.getString = getString;
        this.$get = $get;

        function setLangPath(newLangPath) {
            __langPath = newLangPath;
        }

        function setDefaultLanguage(lang) {
            __defaultLang = lang;
        }

        function getString(tagName) {
            if (localStorage.safeLang) {

                var lang = JSON.parse(localStorage.safeLang);
                if (lang === undefined) {
                    translateService.loadLanguage(localStorage.safeLangConfig).then(function(l) {
                        return l[tagName];
                    });
                } else {
                    return lang[tagName] || "TAG NOT FOUND";
                }
            }
        }

        $get.$inject = ['$q'];

        function $get($q) {
            return translateService($q);
        }

        function translateService($q) {

            function loadLanguage(lang) {
                var defered = $q.defer();

                if (lang === undefined) {
                    if (localStorage.safeLangConfig) {
                        lang = localStorage.safeLangConfig;
                    } else {
                        lang = __defaultLang;
                    }
                }

                var request = new XMLHttpRequest();
                request.open('GET', __langPath + '/' + lang + '/lang.json');
                request.onload = function() {
                    try {
                        var langConfig = JSON.parse(request.responseText);
                        localStorage.safeLang = JSON.stringify(langConfig);
                        localStorage.safeLangConfig = lang;
                        defered.resolve(langConfig);
                    } catch (e) {
                        defered.reject(e);
                    }

                    defered.reject(request);

                };
                request.send();

                return defered.promise;
            }

            function loadAvailableLanguages() {
                var defered = $q.defer();

                var request = new XMLHttpRequest();
                request.open('GET', __langPath + '/languages.json');
                request.onload = function() {
                    try {
                        var languages = JSON.parse(request.responseText);
                        defered.resolve(languages);
                    } catch (e) {
                        defered.reject(e);
                    }
                };
                request.send();

                return defered.promise;
            }

            function getString(tagName) {
                if (localStorage.safeLang) {

                    var lang = JSON.parse(localStorage.safeLang);
                    if (lang === undefined) {
                        translateService.loadLanguage(localStorage.safeLangConfig).then(function(l) {
                            return l[tagName];
                        });
                    } else {
                        return lang[tagName] || "TAG NOT FOUND";
                    }
                }
            }

            return {
                loadLanguage: loadLanguage,
                loadAvailableLanguages: loadAvailableLanguages,
                getString: getString
            };
        }
    }

    translate.$inject = ['translateService'];

    function translate(translateService) {

        return function(input) {
            if (localStorage.safeLang) {

                var lang = JSON.parse(localStorage.safeLang);
                if (lang === undefined) {
                    translateService.loadLanguage(localStorage.safeLangConfig).then(function(l) {
                        return l[input];
                    });
                } else {
                    return lang[input] || "TAG NOT FOUND";
                }
            }
        };
    }

})(window.angular, window.localStorage);
