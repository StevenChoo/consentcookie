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
  <div :class="['cc-toggle-box',{'cc-box-border':border}]">
    <div class="cc-box-header" @click="toggle">
      <slot class="cc-content" name="header"/>
      <font-awesome-icon :icon="icons.faAngleUp" v-if="isOpen" class="cc-toggle-icon"/>
      <font-awesome-icon :icon="icons.faAngleDown" v-if="!isOpen" class="cc-toggle-icon"/>
    </div>
    <div v-show="isOpen" class="cc-box-content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cc-toggle-box',
    props: {
      border: Boolean,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
    },

  };
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/general-variables';

  .cc-toggle-box {

    &.cc-box-border {
      @include default-content-border();
    }

    .cc-box-header {
      display: flex;
      align-items: center;
      cursor: pointer;

      @include default-clearfix();

      *:first-child {
        height: 40px;
        min-height: 40px;
        line-height: 40px;
        flex: 1 0 0;
      }

      > .cc-toggle-icon {
        width: 30px;
        font-size: 16px;
      }
    }
  }
</style>
