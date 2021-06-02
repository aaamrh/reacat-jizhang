import Enzyme, { render, mount } from 'enzyme'  
import MonthPicker from '../MonthPicker'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { items } from '../../containers/home'


Enzyme.configure({ adapter: new Adapter() });

 
/** 
 * 犹豫涉及了一些只有DOM环境才存在的变量， 比如 event, document添加click事件
 * 因此需要使用mount
 * 
 * shallow:
 * shallow 返回组件的浅渲染，对官方shallow rendering 进行封装。
 * 浅渲染 作用就是：它仅仅会渲染至虚拟dom，不会返回真实的dom节点，对测试性能有极大的提升。
 * shallow只渲染当前组件，只能能对当前组件做断言
 * 
 * mount :
 * mount 方法用于将React组件加载为真实DOM节点。mount会渲染当前组件以及所有子组件
 * 
 * render: 
 * render 采用的是第三方库Cheerio的渲染，渲染结果是普通的html结构，
 * 对于snapshot使用render比较合适。
 * 
*/

let props = {
  year: 2021,
  month: 8,
  onChange: jest.fn()
}


let wrapper;

describe('test monthpicker', ()=>{
  beforeEach(()=>{
    wrapper = mount( <MonthPicker {...props}/> )
  })

  it('match snapshot', ()=>{
    expect(wrapper).toMatchSnapshot()
  }) 

  it('render correct year & month, show correct dropdown states', ()=>{
    expect( wrapper.find('.dropdown-toggle').text() ).toEqual(`${ props.year } 年 ${ props.month } 月`)
  }) 
})