import Script from 'next/script'
import React from 'react'

const GameContent2 = () => {
  return (
    <>
        <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
            function MyAlert(saying) {
            window.alert(saying)
            }
        `,
        }}
        />
        <button onClick={()=>('test')}>
          test
        </button>
    </>

  )
}

export default GameContent2