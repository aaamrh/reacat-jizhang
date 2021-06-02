import { mount } from 'enzyme';
import { items } from '../../containers/home';
import CategorySelect from '../CategorySelect'


export const categories  = [
  {
    "id": "1",
    "name": "旅行",
    "type": "outcome",
  },
  {
    "id": "2",
    "name": "理财",
    "type": "income",
  },
  {
    "id": "3",
    "name": "零食",
    "type": "outcome",
  }
]

let props = {
  categories,
  onSelectCategory: jest.fn(),
}
let props_with_category = {
  categories,
  onSelectCategory: jest.fn(),
  selectedCategory: categories[0]
}

describe('test CategorySelect', ()=>{
  it('categories 选染正确的项目', ()=>{
    const wrapper = mount(<CategorySelect {...props} />)
    expect(wrapper.find('.category-item').length).toEqual( categories.length )
    expect(wrapper.find('.category-item.active').length).toEqual( 0 )
  })

  it('验证选中态', ()=>{
    // GET  验证是否有某个 class , 用hasClass
    const wrapper = mount(<CategorySelect {...props_with_category} />)
    expect( wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
  })

  it('点击项目，切换到active class， 并且触发回调函数', ()=>{
    // GET 第二项用at, 回调函数触发用 toHaveBeenCalledWith
    const wrapper = mount(<CategorySelect {...props_with_category} />)
    wrapper.find('.category-item').at(1).simulate('click')
    expect( wrapper.find('.category-item').at(1).hasClass('active') ).toEqual(true)
    expect ( wrapper.find('.category-item').first().hasClass('active') ).toEqual(false)
    expect( props_with_category.onSelectCategory ).toHaveBeenCalledWith( categories[1] )
  })
})  