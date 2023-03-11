import { useEffect } from 'react'

import Intro from '../../components/Intro'
import SignMode from '../../components/SignMode'

const Sign = () => {
  useEffect(() => {
    document.body.classList.add('sign')
    document.body.classList.remove('file')
  }, [])

  return (
    <main id="Sign">
      <Intro
        LargeStandard={(
          <>
            Go green
            {' '}
            <br />
            {' '}
            today.
          </>
        )}
        SubStandard="創建您的第一枚電子簽名"
      />
      <SignMode />
    </main>
  )
}

export default Sign
