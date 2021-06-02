import React from 'react'
import { AppContext } from  './App'


/* GET
 * HOC 高阶组件， 参考create.js的consumer写法
 * 在文件过多时，依次添加|修改consumer会很麻烦，因此推荐HOC 
 */
export const withContext = ( Component ) => {
  return (props) => { console.log('props', props); return(
    <AppContext.Consumer>
      {({state, actions})=>{
        return <Component {...props} data={state} actions={actions} />
      }}
    </AppContext.Consumer>
  )}
}