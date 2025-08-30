import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import 'pretendard/dist/web/static/pretendard.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSmile,
  faBriefcase,
  faHouse,
  faMapPin,
  faUser,
  faLocationDot,
  faArrowLeft,
  faFilter,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(faSmile, faBriefcase, faHouse, faMapPin, faUser, faLocationDot, faArrowLeft, faFilter, faCheck)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
