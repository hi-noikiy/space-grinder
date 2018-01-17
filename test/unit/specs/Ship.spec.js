import { shallow } from '@vue/test-utils'
import Ship from '@/components/Ship'
import store from '@/store'
import { createRenderer } from 'vue-server-renderer'

describe('Ship.vue', () => {
  it('matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Ship, {store})

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
