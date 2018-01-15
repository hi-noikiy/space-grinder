import { mount } from '@vue/test-utils'
import App from '@/App'
import store from '@/store'

describe('App.vue', () => {
  it('Test initial rendering', () => {
    const wrapper = mount(App, {store})
    const appTemplate = wrapper.html()
    expect(appTemplate).toMatchSnapshot()
  })
})
