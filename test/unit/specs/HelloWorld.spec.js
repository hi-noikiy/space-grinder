import Vue from 'vue'
import Hud from '@/components/Hud'

describe('Hud.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hud)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#v').textContent)
    .toEqual('2V')
  })
})
