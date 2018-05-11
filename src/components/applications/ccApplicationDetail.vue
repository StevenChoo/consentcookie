<!--
  - Copyright 2018 Asknow Solutions B.V.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -
  -->

<template>
  <div class="cc-application-detail">
    <transition>
      <div v-if="showDetails" class="cc-wrapper">
        <div class="cc-divider">
          <div :class="['cc-pointer']">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20"
                 height="10">
              <polyline stroke-linejoin="miter" points="0,10 10,0 20,10" stroke-width="1"/>
            </svg>
          </div>
        </div>
        <div v-if="showInfo" class="cc-application-info">
          <div class="cc-description" v-html="application.description"/>
          <cc-application-profile :application="application" :state="state"/>
          <cc-application-actions :application="application" :state="state"/>
          <div class="cc-more-info">
            <a :href="application.links.site" target="_blank">Meer informatie over {{ application.name }}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  const ccToggleBox = require('components/general/ccToggleBox.vue');

  const ccApplicationProperty = require('./ccApplicationProperty.vue');
  const ccApplicationProfile = require('components/applications/ccApplicationProfile.vue');
  const ccApplicationActions = require('components/applications/ccApplicationActions.vue');

  // Vue module
  module.exports = {
    name: 'cc-application-summary',
    components: {
      ccToggleBox,
      ccApplicationProperty,
      ccApplicationProfile,
      ccApplicationActions,
    },
    props: {
      application: {
        type: Object,
        required: true,
      },
      state: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasProfile() {
        return this.state.hasProfile === true;
      },
      showProfile() {
        return this.state.showProfile === true;
      },
      showInfo() {
        return this.state.showInfo === true;
      },
      showDetails() {
        return this.state.showInfo === true || this.state.showProfile === true;
      },
    },
    data() {
      return {
        appProfileInfo:null,
        appPlugin:null,
      };
    },
  };
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/general-variables';

  .cc-application-detail {

    .cc-wrapper {
      padding: 0px 10px 10px;

      .cc-divider {
        position: relative;
        width: 100%;
        padding: 0px 10px;
        height: 1px;
        background: $cc-border-color;
        margin-bottom: 10px;

        .cc-pointer {
          display: block;
          left: 8px !important;
          position: absolute;
          text-align: center;
          transition: all 0.4s ease;

          svg {
            position: absolute;
            margin-top: -9px;
            margin-left: -10px;
            stroke: $cc-border-color;
            fill: $cc-color-white;
          }
        }
      }

      .cc-description {
        text-align: left;
      }

      .cc-properties {
        padding: 10px;
      }
    }

    .cc-more-info a {
      font-size: 12px;
    }
  }
</style>
