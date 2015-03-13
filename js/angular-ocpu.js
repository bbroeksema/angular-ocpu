/**
 * angular-ocpu
 * @version v0.1.0 - 2015-03-13
 * @link http://bbroeksema.github.io/angular-ocpu
 * @author Bertjan Broeksema (dev@broeksemaatjes.nl)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, document, undefined) {
'use strict';
// Source: ocpu.js
/*jslint indent: 2 */
/*global angular, File, FileList, location, document, XMLHttpRequest */

// NOTE: Most of the code below is a slightly cleaned up copy of:
//       https://github.com/jeroenooms/opencpu.js/blob/master/opencpu-0.5.js

angular.module('opencpu', [])

  .service('$ocpu', ["$http", "$q", function ($http, $q) {
var d = {
      rPath: document.createElement('a'),
      rCors: false
    }, ocpu = {};
    d.rPath.href = "../R";

    function session(loc, key, data) {
      var dSession = {
        location: loc,
        key: key,
        data: data
      };

      dSession.toString = function () {
        return "Session";
      };

      dSession.getObject = function (name) {
        return $http.get(loc + "R/" + (name || ".val") + "/json");
      };

      return dSession;
    }

    function httpError(deferred) {
      return function (data, status) {
        deferred.reject("OpenCPU error HTTP " + status + "\n" + data);
      };
    }

    function rFunctionCall(fun, args) {
      var url = d.rPath.href + "/" + fun,
        deferred = $q.defer();

      if (!fun) { throw "rFunctionCall called without fun"; }

      $http.post(url, args || {})
        .success(function (data, status, headers, config) {
          /*jslint unparam: true */
          var loc = headers("Location") || deferred.reject("OpenCPU error: Location response header missing."),
            key = headers("X-ocpu-session") || deferred.reject("OpenCPU error: X-ocpu-session response header missing.");

          deferred.resolve(session(loc, key, data));
        })
        .error(httpError(deferred));
      return deferred.promise;
    }

    function rpc(fun, args) {
      var deferred = $q.defer();

      rFunctionCall(fun, args).then(
        function (session) {
          // The http call to: http(s)://server/ocpu/${APP}/R/${function} has
          // succeeded and returned us a session. Next we need to retrieve the
          // object of the session and we're done.
          session.getObject()
            .success(deferred.resolve)
            .error(httpError(deferred));
        },
        function rejected(reason) {
          // The http call to: http(s)://server/ocpu/${APP}/R/${function} has
          // failed for some reason.
          deferred.reject(reason);
        }
      );

      return deferred.promise;
    }

    function seturl(newpath) {
      if (!newpath.match("/R$")) {
        throw "ERROR! Trying to set R url to: " + newpath + ". Path to an OpenCPU R package must end with '/R'";
      }

      d.rPath = document.createElement('a');
      d.rPath.href = newpath;

      if (location.protocol !== d.rPath.protocol || location.host !== d.rPath.host) {
        d.rCors = true;
        if ((new XMLHttpRequest()).withCredentials === undefined) {
          throw "This browser does not support CORS. Try using Firefox or Chrome.";
        }
      }

      if (location.protocol === "https:" && d.rPath.protocol !== "https:") {
        throw "Page is hosted on HTTPS but using a (non-SSL) HTTP OpenCPU server. This is insecure and most browsers will not allow this.";
      }
    }

    //exported functions
    ocpu.call = rFunctionCall;
    ocpu.rpc = rpc;
    ocpu.seturl = seturl;
    return ocpu;
  }]);

})(window, document);
