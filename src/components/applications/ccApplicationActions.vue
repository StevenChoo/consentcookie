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
  <div class="cc-application-actions">
    <button v-theme="{color:'primary',borderColor:'primary'}" v-if="applicationPlugin"
            @click="deleteProfile()"><span v-if="!isDeleting">Verwijder</span><i
      v-if="isDeleting" class="cc-spinner cc-animate-pulse"/></button>
    <button v-theme="{color:'primary',borderColor:'primary'}" v-if="applicationPlugin" @click="downloadProfile()"><span
      v-if="!isDownloading">Download</span><i v-if="isDownloading" class="cc-spinner cc-animate-pulse"/></button>
  </div>
</template>

<script>

  // Libraries
  const utils = require('base/utils.js');

  // Components
  const ccToggleBox = require('components/general/ccToggleBox.vue');

  // Vue module
  module.exports = {
    name: 'cc-application-profile-actions',
    components: {
      ccToggleBox,
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
    data() {
      return {
        applicationPlugin: null,
        isDownloading: false,
        isDeleting: false,
      };
    },
    methods: {
      deleteProfile() {
        const self = this;
        if (self.isDeleting) {
          return;
        }
        self.isDeleting = true;
        this.applicationPlugin.deleteProfile()
          .then(($response) => {
            self.isDeleting = false;
            self.$events.$emit('profile', {
              id: self.application.id,
              state: 'deleted',
            });
          }, ($error) => {
            console.log('Error deleting: ' + $error);
            self.isDeleting = false;
          });
      },
      downloadProfile() {
        const self = this;
        if (self.isDownloading) {
          return;
        }
        self.isDownloading = true;
        this.applicationPlugin.getProfile()
          .then(($profile) => {
            self.isDownloading = false;

            if ($profile) {
              utils.download(JSON.stringify($profile, null, 3), 'application/json', 'iq-profile.json');
            }
          }, ($error) => {
            console.log('Error downloading: ' + $error);
            self.isDownloading = false;
          });
      },
    },
    mounted() {
      const self = this;
      this.$services.applications.getPlugin(this.application)
        .then(($plugin) => {
          if ($plugin && !($plugin instanceof Error)) {
            this.applicationPlugin = $plugin;
          }
        }, ($error) => {
          this.applicationPlugin = null;
        });
    },
  };
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/general-variables';

  .cc-application-actions {
    margin: 0px 0px 10px;

    @include default-clearfix();

    button {
      float: left;
      width: 45%;
      box-sizing: border-box;
      padding: 0px 10px;
      height: 32px;
      line-height: 32px;
      background: none;
      border: 1px solid $cc-brand-color;
      border-radius: 3px;
      color: $cc-brand-color;
      font-size: 13px;
    }

    button:last-child {
      float: right;
    }
  }
</style>
