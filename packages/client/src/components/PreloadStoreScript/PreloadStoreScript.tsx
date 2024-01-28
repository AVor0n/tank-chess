import { type FC } from 'react'
import { renderObject } from '@utils/renderObject'

export const PreloadStoreScript: FC = preloadedState => (
  <script
    dangerouslySetInnerHTML={{
      __html: `window.__PRELOADED_STATE__ = ${renderObject(preloadedState)}`,
    }}
  />
)
