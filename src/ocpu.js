'use strict';

angular.module('bbroeksema.ngOcpu.ocpu', [])

.service('$ocpu', function ($http) {

});

//'use strict';
//
//angular.module('ocpu', [])
//.factory('Session', [function (loc, key, txt) {
//
//}])
//
//.service('$ocpu', ['$http', '$location', function ($http, $location) {
//  var r_path,
//      r_cors;
////     var ocpu = {
////       host: 'http://localhost',
////       ocpu: '/ocpu',
////       user: '/user/bertjan',
////       library: '/library/RUMissing/R/',
////
////       url: function () {
////         if ($location.path().indexOf('RUMissing') !== -1) {
////           // The html is served as part of the RUMissing R-plugin
////           throw new Error("No support for running as an R plugin yet");
////           //return location.origin + location.pathname.substring(0, location.pathname.length - 4);
////         } else {
////           // The html is served by an independent web server
////           return ocpu.host + ocpu.ocpu + ocpu.user + ocpu.library;
////         }
////       }
////     };
//
////    function requestJSON(url) {
////      $http.get(ocpu.host + url)
////        .success(function (data) {
////          $rootScope.$broadcast("Data::loaded", data);
////        })
////        .error(function (data) {
////
////        });
////    }
////
////    $http.post(ocpu.url() + 'dataset.get')
////      .success(function(data, status, headers, config) {
////        var jsonurl = data.split('\n')[0] + '/json?auto_unbox=true';
////        requestJSON(jsonurl);
////      })
////      .error(function(data, status, headers, config) {
////        console.warn('Failed to load dataset...');
////      });
////
////    function onHttpSuccess(callback) {
////      return function(data, status, headers, config) {
////      }
////    }
//
//    function r_fun_ajax(fun, settings, handler) {
//      console.log('r_fun_ajax: ' + fun);
//      //validate input
//      if (!fun) throw "r_fun_call called without fun";
//      settings = settings || {};
//      handler = handler || function () {};
//
//
//      //$http.post(ocpu.url() + 'dataset.get')
//
//      //set global settings
//      settings.url = settings.url || (r_path.href + "/" + fun);
//      settings.type = settings.type || "POST";
//      settings.data = settings.data || {};
//      settings.dataType = settings.dataType || "text";
//    }
//
//    function r_fun_call_multipart(fun, args, handler) {
//      throw "Not implemented";
//    }
//
//    function r_fun_call_urlencoded(fun, args, handler) {
//      throw "Not implemented";
//    }
//
//    function r_fun_call_json(fun, args, handler) {
//      return r_fun_ajax(fun, {
//        data: args || {},
//        contentType: 'application/json'
//      }, handler);
//    }
//
//    return {
//      call: function (fun, args, handler) {
//        var hasFiles = false,
//          hasCode = false,
//          args = args || {};
//
//        Object.getOwnPropertyNames(args).forEach(function (argName) {
//          var value = args[argName];
//          hasFiles = hasFiles || (value instanceof File || value instanceof Upload || value instanceof FileList);
//          hasCode = hasCode || (value instanceof Snippet || value instanceof Session);
//        });
//
//        if (hasFiles && hasCode) { throw "fun calls with both files and code are not supported"; }
//
//        if (hasFiles) {
//          return r_fun_call_multipart(fun, args, handler);
//        } else if (hasCode) {
//          return r_fun_call_urlencoded(fun, args, handler);
//        } else {
//          return r_fun_call_json(fun, args, handler);
//        }
//      },
//
//      setUrl: function(newpath) {
//        if(!newpath.match("/R$")){
//          alert("ERROR! Trying to set R url to: " + newpath +". Path to an OpenCPU R package must end with '/R'");
//        } else {
//          r_path = document.createElement('a');
//          r_path.href = newpath;
//          r_path.href = r_path.href; //IE needs this
//
//          if(location.protocol != r_path.protocol || location.host != r_path.host){
//            r_cors = true;
//            if (!('withCredentials' in new XMLHttpRequest())) {
//              alert("This browser does not support CORS. Try using Firefox or Chrome.");
//            }
//          }
//
//          if(location.protocol == "https:" && r_path.protocol != "https:"){
//            alert("Page is hosted on HTTPS but using a (non-SSL) HTTP OpenCPU server. This is insecure and most browsers will not allow this.")
//          }
//
//          if(r_cors){
//            console.log("Setting path to CORS server " + r_path.href);
//          } else {
//            console.log("Setting path to local (non-CORS) server " + r_path.href);
//          }
//
//          //we use trycatch because javascript will throw an error in case CORS is refused.
//          $http.get(r_path.href)
//            .success(function(data) {
//              console.log(data);
//            });
////          $.get(r_path.href, function(resdata){
////            console.log("Path updated. Available objects/functions:\n" + resdata);
////          }).fail(function(xhr, textStatus, errorThrown){
////            alert("Connection to OpenCPU failed:\n" + textStatus + "\n" + xhr.responseText + "\n" + errorThrown);
////          });
//        }
//      }
//    }
//
//  }]);



