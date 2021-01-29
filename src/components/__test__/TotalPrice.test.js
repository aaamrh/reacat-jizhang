import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'

const props = {
  income: 1000,
  outcome: 2000
}

describe('test total price', ()=>{
  it('component should render correct income&outcome number', ()=>{
    const wrapper = shallow(<TotalPrice {...props} />)

    expect(wrapper.find('span:first-child span').text() * 1 ).toEqual(1000)
    expect(wrapper.find('span+span span').text() * 1 ).toEqual(2000)
  })
})