import React, { useState,useRef } from 'react'
import LiteQuill from '../editor/LiteQuill'
const Input = ({callback,submitLabel,hasCancelButton =false,initialText ="",handelCancel}) => {
  const divRef = useRef();
  const [body,setBody] = useState(initialText)
  const handleSubmit = () =>{
    const div = divRef.current;
    const text = div.innerText;
    if(!text.trim()) return;
    callback(body);
    setBody('')
  }
  return (
    <div>
      <LiteQuill body={body} setBody={setBody}/>
      <div ref={divRef} dangerouslySetInnerHTML={{
        __html:body
      }} style={{display:'none'}}/>
      <button className="btn btn-dark ms-auto d-block px-4 mt-2" onClick={handleSubmit}>{submitLabel}</button>
      {
        hasCancelButton &&(
          <button type='button' className='btn btn-dark ms-auto d-block px-4 mt-2'
          onClick={handelCancel}>Hủy bỏ</button>
        )
      }
    </div >
  )
}

export default Input