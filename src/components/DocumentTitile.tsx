import {  useEffect } from 'react'

function DocumentTitle(title:string) {

  useEffect(() => {
    document.title = title;
   document.body.style.overflow = ""
  }, [title]);
}
export default DocumentTitle