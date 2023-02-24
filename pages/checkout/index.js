import {message, QRCode, Spin, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import axios from "axios";

const {Title, Paragraph, Text} = Typography;

const Checkout = () => {
  const [qrCode, setQrCode] = useState();
  const [appTransId, setAppTransId] = useState();
  const [secondsToGo, setSecondsToGo] = useState(60); // 1m - 15m timeout
  const router = useRouter();

  useEffect(async () => {
    // create ZLP order
    const res = await axios.post('/api/create_order');
    setQrCode(res.data.url);
    setAppTransId(res.data.appTransID);
  }, [])

  useEffect(() => {
    let timer = setInterval(() => {
      if (secondsToGo > 0) {
        setSecondsToGo(secondsToGo - 1);
      }
      if (secondsToGo === 0) {
        clearInterval(timer);
        message.error('Out of time, please try again!').then(r => router.push('/cart'));

      }
    },  1000) // interval check after 1s for test purpose
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    let checkPaymentStatus = setInterval(async () => {
      // interval query order ZLP status
      const res = await axios.post('/api/query_status', {
        appTransId: appTransId
      });
      const returnCode = res.data.return_code;
      if (returnCode === 1) {
        clearInterval(checkPaymentStatus);
        router.push('/status/success');
      }
    }, 1000)
    return () => {
      clearInterval(checkPaymentStatus);
    };
  });

  return (
      <>
        <Head>
          <title>My Shopping Cart | AlterClass</title>
        </Head>
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
          <div className="payment-page">
            <div id="payment-modal">
              <div id="qr-code">
                <QRCode value={qrCode}/>
              </div>
              <br/>
              <Typography>
                <Title type="success" level={4}>Waiting for payment ...</Title>
                <Paragraph>
                  <Spin/> Time to scan QR codes for payment <Text type="danger">{secondsToGo}</Text> seconds
                </Paragraph>
                <br/>
                <Title type="secondary" level={4}>Pay with <img src="/images/logozlp.png"
                                                                id="zlp-logo-image" className="checkout-image"
                                                                alt=""/> by QR code</Title>
                <br/>
                <div id="payment-steps">
                  <Text strong>Payment Guide: </Text>
                  <br/>
                  <br/>
                  <ul>
                    <li>
                      <p>Step 1: Open <Text strong>ZaloPay</Text> app</p>
                    </li>
                    <li>
                      <p>Step 2: Select <Text strong>"Thanh Toán"</Text> <img src="/images/qr-scan-zlp.png"
                                                                              className="checkout-image"
                                                                              alt=""/> and scan QR code</p>
                    </li>
                    <li>
                      <p>Step 3: <Text strong>Confirm payment</Text> on ZaloPay app</p>
                    </li>
                  </ul>
                </div>
              </Typography>
            </div>
          </div>
        </div>
      </>
  );
};

export default Checkout;