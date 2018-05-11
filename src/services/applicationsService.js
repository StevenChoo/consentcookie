/*
 * Copyright 2018 Asknow Solutions B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Dependencies
const _ = require('underscore');
const jsCookie = require('js-cookie');

// Helpers
const utils = require('base/utils');

const DEFAULT_APPS_ENDPOINT = 'https://www.consentcookie.nl/consentcookie/latest/consentcookie.json';
const DEFAULT_CONFIG_KEY_APPS_ENDPOINT = 'apps.endpoint';

let vue;
let applications;
let activeApplications;

function init(vueServices) {
  vue = vueServices.getVueInstance();
}

function loadApplications() {
  if (!applications) {
    const applicationsUrl = vue.$services.config.get(DEFAULT_CONFIG_KEY_APPS_ENDPOINT, DEFAULT_APPS_ENDPOINT);
    applications = vue.$http.get(applicationsUrl)
      .then($request => ($request.status === 200 ? $request.body : []));
  }
  return applications;
}

function getActive() {
  if (!activeApplications) {
    activeApplications = loadApplications()
      .then(($applications) => {
        const consentConfig = vue.$services.config.get('apps.consent');
        const active = [];
        const map = _.reduce($applications, ($memo, $application) => {
          $memo[$application.id] = $application;
          return $memo;
        }, {});

        _.each(consentConfig, ($consent, $id) => {
          const application = map[$id];

          if (application) {
            active.push(application);
          }
        });
        return active;
      });
  }
  return activeApplications;
}

function isDisabled($application) {
  return vue.$services.consent.get($application.id).flag === -1;
}

function isAccepted($application) {
  const state = vue.$services.consent.get($application.id);
  return state.flag === -1 || state.flag === 1;
}

function setAccepted($application, $isAccepted) {
  if ($isAccepted === true) {
    vue.$services.consent.accept($application.id);
  } else {
    vue.$services.consent.reject($application.id);
    removeApplicationClientData($application);
  }
}

function removeApplicationData($application) {
  removeApplicationClientData($application);
  return removeApplicationProfile($application);
}

function removeApplicationClientData($application) {
  const dataIds = $application.dataIds || [];

  if (_.isEmpty(dataIds)) {
    return;
  }

  const cookies = jsCookie.get();
  _.each(cookies, ($cookieVal, $cookieName) => {
    let isMatch = false;
    _.each(dataIds, ($dataId) => {
      isMatch = (isMatch === true || $cookieName.indexOf($dataId) === 0);
    });

    // Delete if match
    if (isMatch) {
      const domains = utils.getDomainTree();
      _.each(domains, ($domain) => {
        jsCookie.remove($cookieName, { domain: $domain });
      });
    }
  });
}

function hasPlugin($application) {
  return new Promise(($resolve) => {
    getPlugin($application)
      .then(() => $resolve(true), () => $resolve(false));
  });
}

function getPlugin($application) {
  return new Promise(($resolve, $reject) => {
    vue.$services.plugin.getPlugin($application)
      .then(($plugin) => {
        if ($plugin && !($plugin instanceof Error)) {
          return $resolve($plugin);
        }
        return $reject($reject);
      }, ($error) => {
        vue.$services.log.error($error);
        return $reject($error);
      });
  });
}

function getApplicationProfile($application) {
  return new Promise(($resolve, $reject) => {
    getPlugin($application)
      .then($plugin => $resolve($plugin.getProfile($application)), $error => $reject($error));
  });
}

function getApplicationProfileInfo($application) {
  return new Promise(($resolve, $reject) => {
    getPlugin($application)
      .then($plugin => $resolve($plugin.getProfileInfo($application)), $error => $reject($error));
  });
}

function removeApplicationProfile($application) {
  return new Promise(($resolve, $reject) => {
    getPlugin($application)
      .then($plugin => $resolve($plugin.deleteProfile()), $error => $reject($error));
  });
}

function enabledApplication($application) {
  return setAccepted($application, true);
}

function disableApplication($application) {
  return setAccepted($application, false);
}

function downloadApplicationProfile($application) {
  return new Promise(($resolve, $reject) => {
    getApplicationProfile($application)
      .then(($profile) => {
        utils.download(JSON.stringify($profile, null, 3), 'application/json', $application.id + '-profile.json');
        return $resolve(true);
      }, $error => $reject($error));
  });
}

module.exports = {
  init,
  hasPlugin,
  getPlugin,
  getActive,
  getApplicationProfile,
  getApplicationProfileInfo,
  isDisabled,
  isAccepted,
  setAccepted,
  removeApplicationData,
  removeApplicationClientData,
  removeApplicationProfile,
  enabledApplication,
  disableApplication,
  downloadApplicationProfile,
};
