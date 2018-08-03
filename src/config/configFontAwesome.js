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

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons/faCloudDownloadAlt';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/**
 *
 * @param vue
 */
function configFontAwesome(vue) {
  // Register component
  vue.component('font-awesome-icon', FontAwesomeIcon);
  vue.mixin({
    data() {
      return {
        icons: {
          faUser,
          faAngleUp,
          faAngleDown,
          faSpinner,
          faToggleOn,
          faQuestion,
          faCloudDownloadAlt,
        },
      };
    },
  });
  debugger;
}

export default configFontAwesome;
