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

function getPlugin($application) {
  return vue.$services.plugin.getPlugin($application);
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

module.exports = {
  init,
  getPlugin,
  getActive,
};
