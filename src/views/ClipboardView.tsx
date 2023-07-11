import React from 'react'

export default function ClipboardView() {
  return (
    <div>
      ClipboardView
      <input type="password" className='bg-slate-200'
        onClick={e => {
          e.currentTarget.select();
          document.execCommand('copy');
        }}
      />
    </div>
  )
}