import {  useEffect } from 'react'

function DocumentTitle(title:string) {

  useEffect(() => {
    document.title = title;
    
  }, [title]);
}
export default DocumentTitle