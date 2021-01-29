// 当运行测试的时候， 脚手架会自动加载这个文件

import { configure } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
