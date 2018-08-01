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
  -->

<template>
  <div class="cc-application-group-summary">
    <cc-toggle v-model="showGroup" class="cc-toggle-text">
      <span>{{ title }}</span>
    </cc-toggle>
    <cc-switch v-model="accepted"  :on-title="$t('general.on')" :off-title="$t('general.off')"/>
  </div>
</template>

<script>
  // Components
  import ccImg from 'components/general/ccImg.vue';
  import ccToggle from 'components/general/ccToggle.vue';
  import ccToggleIcon from 'components/general/ccToggleIcon.vue';
  import ccSwitch from 'components/general/ccSwitch.vue';

  // Public functions
  export default {
    name: 'cc-application',
    components: {
      ccImg,
      ccToggle,
      ccToggleIcon,
      ccSwitch,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showGroup:false,
      };
    },
    computed:{
      accepted: {
        get() {
          return false;
        },
        set($newVal) {
          console.log($newVal);
        },
      },
    }
  };
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/general-variables';

  .cc-application-group-summary {

    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    height: 60px;

    @include default-clearfix();

    .cc-toggle-text {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 13px;
      font-weight: 600;
      margin-left: 10px;

      span {
        margin-left: 5px;
      }
    }

    .cc-toggle-icon {
      cursor: pointer;

      &.cc-off {
        color: $cc-brand-color;
      }

      &.cc-disabled {
        display: none;
      }
    }

    .cc-switch {
      margin: 15px 10px;
      display: inline-block;
      float: right;
    }
  }
</style>
