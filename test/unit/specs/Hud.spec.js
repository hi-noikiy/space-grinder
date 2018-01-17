import { shallow } from '@vue/test-utils'
import Hud from '@/components/Hud'
import store from '@/store'
import { createRenderer } from 'vue-server-renderer'

describe('Hud.vue', () => {
  it('Count hud elements', () => {
    const wrapper = shallow(Hud, {store})
    expect(wrapper.findAll('.column')).toHaveLength(8)
  })

  it('matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Hud, {store})

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
