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
  <div class="cc-item-summary">
    <cc-toggle :value="isOpen" @input="onToggle" class="cc-toggle-text">
      <cc-img :img="logo" :size="imgSize" :unit="'px'"/>
      <span slot="name">{{ name }}</span>
    </cc-toggle>
    <slot name="actions"></slot>
  </div>
</template>

<script>

  import _ from 'underscore';

  import ccImg from 'components/general/ccImg';
  import ccToggle from 'components/general/ccToggle';
  import ccToggleIcon from 'components/general/ccToggleIcon';

  export default {
    name: 'cc-item-summary',
    components: {
      ccImg,
      ccToggle,
      ccToggleIcon,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      imgSize: {
        type: Number,
        default: 15,
      },
    },
    data() {
      return {};
    },
    computed: {
      name() {
        return _.isFunction(this.item.name) ? this.item.name() : this.item.name;
      },
    },
    methods: {
      onToggle($value) {
        this.$emit('open', $value);
      },
    },
  };
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/general-variables';

  .cc-application-summary {

    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    height: 60px;

    @include default-clearfix();

    .cc-toggle-text {
      display: flex;
      align-items: center;
      flex: 1 1 0;
      font-size: 13px;
      font-weight: 600;
      margin-left: 10px;

      span {
        margin-left: 5px;
      }
    }
  }
</style>
