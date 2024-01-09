import { ErrorBoundary } from 'react-error-boundary'
import ErrorB from '@components/errorB'

const withErrorInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithError = () => (
    <ErrorBoundary FallbackComponent={ErrorB}>
      <OriginalComponent />
    </ErrorBoundary>
  )

  return ComponentWithError
}
export default withErrorInfo
