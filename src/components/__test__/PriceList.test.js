import { shallow } from 'enzyme'  
import PriceList from '../PriceList'
import { categories, items } from '../../containers/home'

const itemsWithCategory = items.map( item => {
  item.category = categories[ item.cid ]
  return item
} )

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn()
}

let wrapper;
describe('test PriceList component', ()=>{
  beforeEach( ()=>{
    wrapper = shallow(<PriceList {...props} />)
  } ) 
  // wrapper = shallow(<PriceList {...props} />)

  it('match snapshot', ()=>{
    expect(wrapper).toMatchSnapshot()
  })


  it('render correct price items length', ()=>{
    expect(wrapper.find('.list li').length).toEqual(itemsWithCategory.length)
  })

  it('trigger the correct func callbacks', ()=>{
    const firstItem = wrapper.find('.list li').first()

    firstItem.find('button').first().simulate('click')
    expect( props.onModifyItem ).toHaveBeenCalledWith(itemsWithCategory[0] )
    
    firstItem.find('button').last().simulate('click') 
    expect( props.onModifyItem ).toHaveBeenCalledWith(itemsWithCategory[0] )
  })
})


