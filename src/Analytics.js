const amplitudeApiKey = process.env.AMPLITUDE_API_KEY

export default class Analytics {
  static initialize = () => {
    if (!amplitudeApiKey) return
    if (typeof window !== 'undefined') {
      const amplitude = require('amplitude-js')
      this.Amplitude = amplitude.getInstance()
      this.Amplitude.init(amplitudeApiKey, null, { includeReferrer: true, includeUtm: true })
    }
  }

  static pageview = ({ pathname, props }) => {
    if (this.Amplitude == null) return
    const timestamp = Date.now()
    const eventProps = {
      pathname,
      timestamp,
      ...props
    }
    this.Amplitude.logEventWithTimestamp('PAGE VIEW', eventProps, timestamp)
  }

  static event = ({ eventType, pathname, props }) => {
    if (this.Amplitude == null) return
    const timestamp = Date.now()
    const eventProps = {
      pathname,
      timestamp,
      ...props
    }
    this.Amplitude.logEventWithTimestamp(eventType, eventProps, timestamp)
  }
}
