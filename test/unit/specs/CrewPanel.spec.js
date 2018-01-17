import { shallow } from '@vue/test-utils'
import CrewPanel from '@/components/CrewPanel'
import store from '@/store'
import { createRenderer } from 'vue-server-renderer'

describe('CrewPanel.vue', () => {
  it('matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(CrewPanel, {store})

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
