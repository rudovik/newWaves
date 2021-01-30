import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import CircularProgress from '@material-ui/core/CircularProgress'

const clientId =
  'AY_d6kZY2CCTt5vmp-WeX7nZkipLn7bhXsRAYRrIBMdW7QS-1vMfy_YGasBCSB55zkduSB9d6vQhnFmb'

const addPayPalScript = (setState) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
  script.async = true
  script.onload = () => {
    setState({ loading: false, ready: true })
  }
  document.body.appendChild(script)
}

const PayPal = ({ toPay, onSuccess, onCancel, onError }) => {
  const [state, setState] = useState({
    loading: false,
    ready: false,
  })
  const { loading } = state
  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript(setState)
      setState((state) => ({ ...state, loading: true }))
    }
  }, [])

  return (
    <div>
      {window.paypal && (
        <PayPalButton
          amount={toPay}
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
          }}
        />
      )}
      {loading && (
        <CircularProgress style={{ color: '#2196F3' }} thickness={3} />
      )}
    </div>
  )
}

export default PayPal
