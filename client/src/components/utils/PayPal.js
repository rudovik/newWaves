import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import CircularProgress from '@material-ui/core/CircularProgress'

const clientId =
  'AY_d6kZY2CCTt5vmp-WeX7nZkipLn7bhXsRAYRrIBMdW7QS-1vMfy_YGasBCSB55zkduSB9d6vQhnFmb'

const addPayPalScript = (setReady) => {
  if (document.getElementById('rudoPayal')) return
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.id = 'rudoPaypal'
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
  script.async = true
  script.onload = () => {
    setReady(true)
  }
  document.body.appendChild(script)
  // console.log(document.getElementById('rudoPaypal'))
}

const PayPal = ({ toPay, onSuccess, onCancel, onError }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript(setReady)
    }
  }, [])
  return (
    <div>
      {window.paypal ? (
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
      ) : null}
      {!ready && !window.paypal ? (
        <CircularProgress style={{ color: '#2196F3' }} thickness={3} />
      ) : null}
    </div>
  )
}

export default PayPal
