import { shallow } from '@vue/test-utils'
import ScannerPanel from '@/components/ScannerPanel'
import store from '@/store'
import { createRenderer } from 'vue-server-renderer'

describe('ScannerPanel.vue', () => {
  it('matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(ScannerPanel, {store})

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
