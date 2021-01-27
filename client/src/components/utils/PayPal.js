import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

const clientId =
  'AY_d6kZY2CCTt5vmp-WeX7nZkipLn7bhXsRAYRrIBMdW7QS-1vMfy_YGasBCSB55zkduSB9d6vQhnFmb'

const addPayPalScript = (setSdkReady) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
  script.async = true
  script.onload = () => {
    setSdkReady(true)
  }
  document.body.appendChild(script)
}

const PayPal = ({ toPay, onSuccess, onCancel, onError }) => {
  const [sdkReady, setSdkReady] = useState(false)
  console.log(window.paypal)

  useEffect(() => {
    !window.paypal && addPayPalScript(setSdkReady)
  }, [])

  return (
    <div>
      {sdkReady && (
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
    </div>
  )
}

export default PayPal
