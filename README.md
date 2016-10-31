# Translate


Translate is an [AngularJS](https://https://github.com/angular/angular.js) filter for easily managing multiple languages string in your app.
string are managed using a simple folder structure where the languages files are placed.

<pre>
lang
  ├ en
  | └ lang.json
  ├ es
  | └ lang.json
  |
  └ languages.json
  
</pre>

## Languages.json
This file contains a JSON Array representing the installed languages of your app, each key in this Array should correspond to a folder inside the main <b>lang</b> folder

```javascript
[
    {"description" : "ESPAÑOL", "id" : "es"},
    {"description" : "ENGLISH", "id" : "en"}
]
```

* `description` Is the name or description of the installed language
* `id` Is the name of the folder containing the <b>lang.json</b> file

## Lang.json
This file contains an JSON object representing the strings  of a language, each property of the JSON file is the name of the string and the value should have the string value

en/lang.json

```javascript
{
  "L_NAME" : "Name",
  "L_LASTNAME" : "Lastname",
  "L_ADDRESS" : "Address",
  "L_AGE" : "Age",
  "L_ADD_PERSON" : "Add Person"
}

```

es/lang.json
```javascript
{
  "L_NAME" : "Nombre",
  "L_LASTNAME" : "Apellido",
  "L_ADDRESS" : "Direccion",
  "L_AGE" : "Edad",
  "L_ADD_PERSON" : "Agregar Persona"
}

```

## Usage


app.js

```javascript
(function(angular) {

    angular.module('translateTest', ['safe.translate'])
    .config(configFn);

    configFn.$inject = ['translateServiceProvider'];
    function configFn(translateServiceProvider){
      translateServiceProvider.setLangPath('bower_components/translate/lang');
    }

})(window.angular);
```

index.html

```html

<!DOCTYPE html>
<html ng-app="translateTest">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>


    <select ng-model="form.selectedLanguage" ng-change="changeLanguage()" ng-options="lang as lang.description for lang in Languages">
      <option value="">{{::('L_CHOOSE' | translate)}}</option>
    </select>

    <p>
      <label>{{::('L_NAME' | translate)}}</label>
      <input type='text' />
    </p>
    <p>
      <label>{{::('L_LASTNAME' | translate)}}</label>
      <input type='text' />
    </p>
    <p>
      <label>{{::('L_ADDRESS' | translate)}}</label>
      <input type='text' />
    </p>
    <p>
      <label>{{::('L_AGE' | translate)}}</label>
      <input type='text' />
    </p>

    <button>
      {{::('L_ADD_PERSON' | translate)}}
    </button>

    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/translate/translate.js"></script>
    <script src="app/app.js"></script>
  </body>
</html>

```

## Translate Objects & Functions

When `Translate` is loaded it register some functions and objects in the AngularJS `$rootScope` 

* `$rootScope.Languages` - _Array_ : This is an array containing the languages in the `languages.json` file
* `$rootScope.getString(str)` - _Function_ : This is for using translate inside _services_ and/or controllers
```javascript
$rootScope.getString('L_NAME');
//this returns value of the 'L_NAME' key for the selected language
```
* `$rootScope.form.selectedLanguages` - _Object_ : This is a object representing the current selected languages (you need to assing this value using a `ngModel`)

* `$rootScope.changeLanguage` - _Function_ : This is a function used for changing the selected language, this is the value inside the $rootScope.form.selectedLanguages.id
* `$rootScope.reloadLanguage(lang)` - _Function_ : This is a function used for changing the selected language, unlike `$rootScope.changeLanguage` this recibe the lang id from params
```javascript
$rootScope.reloadLanguage('es');
//this will change the selected language to 'es'
```

## TranslateServiceProvider

`Translate` exposed a provider used to configure the path to the lang folder in you app.

* `translateServiceProvider.setLangPath(path)` - _Function_ : This function is used to change the default path from the __Lang__ folder (the default path in root of your project)

```javascript
(function(angular) {

    angular.module('translateTest', ['safe.translate'])
    .config(configFn);

    configFn.$inject = ['translateServiceProvider'];
    function configFn(translateServiceProvider){
      translateServiceProvider.setLangPath('bower_components/translate/lang');
    }

})(window.angular);
```



