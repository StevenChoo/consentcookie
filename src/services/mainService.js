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

/**
 * The main applications service. One to rule them all!
 */
import * as constants from 'base/constants';

let vue;

function init(vueServices) {
  vue = vueServices.getVueInstance();
}

function showConsentWall() {
  // Show consent after 300ms
  setTimeout(() => {
    vue.$router.push({ path: '/consent' });
    vue.$services.view.openContent();
  }, vue.$services.config.get(constants.CONFIG_KEY_GENERAL_CONSENTWALL_TIMEOUT, constants.DEFAULT_CONSENTWALL_TIMEOUT));
}

function acceptConsentWall() {
  vue.$services.consent.save();
  vue.$services.consent.accept(constants.DEFAULT_CONSENTWALL_COOKIE_ID);
  vue.$services.script.enableOptOutScripts();
  vue.$services.view.close();
  vue.$services.view.enableMenu();
}

function isConsentWallEnabled() {
  return vue.$services.config.get(constants.CONFIG_KEY_GENERAL_CONSENTWALL_ENABLED, false);
}

function isConsentWallAccepted() {
  return !(isConsentWallEnabled()) ||
    (vue.$services.consent.getFlag(constants.DEFAULT_CONSENTWALL_COOKIE_ID) === 1);
}

export default {
  init,
  showConsentWall,
  acceptConsentWall,
  isConsentWallAccepted,
  isConsentWallEnabled,
};
