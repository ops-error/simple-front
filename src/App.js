import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [valueInput, setValueInput] = useState('');
  const [resOrderData, setResOrderData] = useState({
    order_uid: '',
    track_number: '',
    entry: '',
    locale: '',
    internal_signature: '',
    customer_id: '',
    delivery_service: '',
    shardkey: '',
    sm_id: '',
    date_created: '',
    oof_shard: ''
  });
  const [resDelData, setResDelData] = useState({
    name: '',
    phone: '',
    zip: '',
    city: '',
    address: '',
    region: '',
    email: ''
  });
  const [resPayData, setResPayData] = useState({
    transaction: '',
    request_id: '',
    currency: '',
    provider: '',
    amount: '',
    payment_dt: '',
    bank: '',
    delivery_cost: '',
    goods_total: '',
    custom_fee: ''
  });
  const [resItmData, setResItmData] = useState([{
    chrt_id: '',
    price: '',
    rid: '',
    name: '',
    sale: '',
    size: '',
    total_price: '',
    nm_id: '',
    brand: '',
    status: ''
  }]);
  
  const sendRequest = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/orders/${valueInput}`)
    .then((res) => {
      setResOrderData({
        order_uid: res.data.order_uid,
        track_number: res.data.track_number,
        entry: res.data.entry,
        locale: res.data.locale,
        internal_signature: res.data.internal_signature,
        customer_id: res.data.customer_id,
        delivery_service: res.data.delivery_service,
        shardkey: res.data.shardkey,
        sm_id: res.data.sm_id,
        date_created: res.data.date_created,
        oof_shard: res.data.oof_shard
      });
      setResDelData({
        name: res.data.delivery.name,
        phone: res.data.delivery.phone,
        zip: res.data.delivery.zip,
        city: res.data.delivery.city,
        address: res.data.delivery.address,
        region: res.data.delivery.region,
        email: res.data.delivery.email,
      });
      setResPayData({
        transaction: res.data.payment.transaction,
        request_id: res.data.payment.request_id,
        currency: res.data.payment.currency,
        provider: res.data.payment.provider,
        amount: res.data.payment.amount,
        payment_dt: res.data.payment.payment_dt,
        bank: res.data.payment.bank,
        delivery_cost: res.data.payment.delivery_cost,
        goods_total: res.data.payment.goods_total,
        custom_fee: res.data.payment.custom_fee,
      })
      setResItmData(
        res.data.items.map(el => ({
          chrt_id: el.chrt_id,
          price: el.price,
          rid: el.rid,
          name: el.name,
          sale: el.sale,
          size: el.size,
          total_price: el.total_price,
          nm_id: el.nm_id,
          brand: el.brand,
          status: el.status,
        }))
      );
    })
    .catch((err) => {
      setResOrderData({
        order_uid: '',
        track_number: '',
        entry: '',
        locale: '',
        internal_signature: '',
        customer_id: '',
        delivery_service: '',
        shardkey: '',
        sm_id: '',
        date_created: '',
        oof_shard: ''
      });
      setResDelData({
        name: '',
        phone: '',
        zip: '',
        city: '',
        address: '',
        region: '',
        email: '',
      });
      setResPayData({
        transaction: '',
        request_id: '',
        currency: '',
        provider: '',
        amount: '',
        payment_dt: '',
        bank: '',
        delivery_cost: '',
        goods_total: '',
        custom_fee: '',
      });
      setResItmData([{
        chrt_id: '',
        price: '',
        rid: '',
        name: '',
        sale: '',
        size: '',
        total_price: '',
        nm_id: '',
        brand: '',
        status: '',
      }]);
    })
  }
  return (
    <div className="App">
      <form onSubmit={sendRequest} className='form'>
        <label>Insert UID:</label>
        <input
          placeholder='uid'
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
      <div className='data'>
        <p>Your Order Data:</p>
        <div className='data__info'>
          <ul className='data_list'>
            <p className='data__title'>Order:</p>
            <li >{`order_uid: ${resOrderData.order_uid}`}</li>
            <li>{`track_number: ${resOrderData.track_number}`}</li>
            <li>{`entry: ${resOrderData.entry}`}</li>
            <li>{`locale: ${resOrderData.locale}`}</li>
            <li>{`internal_signature: ${resOrderData.internal_signature}`}</li>
            <li>{`customer_id: ${resOrderData.customer_id}`}</li>
            <li>{`delivery_service: ${resOrderData.delivery_service}`}</li>
            <li>{`shardkey: ${resOrderData.shardkey}`}</li>
            <li>{`sm_id: ${resOrderData.sm_id}`}</li>
            <li>{`date_created: ${resOrderData.date_created}`}</li>
            <li>{`oof_shard: ${resOrderData.oof_shard}`}</li>
          </ul>
        </div>
        <div className='data__info'>
          <ul className='data_list'>
            <p className='data__title'>Delivery: </p>
            <li>{`name: ${resDelData.name}`}</li>
            <li>{`phone: ${resDelData.phone}`}</li>
            <li>{`zip: ${resDelData.zip}`}</li>
            <li>{`city: ${resDelData.city}`}</li>
            <li>{`address: ${resDelData.address}`}</li>
            <li>{`region: ${resDelData.region}`}</li>
            <li>{`email: ${resDelData.email}`}</li>
          </ul>
        </div>
        <div className='data__info'>
          <ul className='data_list'>
            <p className='data__title'>Payment:</p>
            <li>{`transaction: ${resPayData.transaction}`}</li>
            <li>{`request_id: ${resPayData.request_id}`}</li>
            <li>{`currency: ${resPayData.currency}`}</li>
            <li>{`provider: ${resPayData.provider}`}</li>
            <li>{`amount: ${resPayData.amount}`}</li>
            <li>{`payment_dt: ${resPayData.payment_dt}`}</li>
            <li>{`bank: ${resPayData.bank}`}</li>
            <li>{`delivery_cost: ${resPayData.delivery_cost}`}</li>
            <li>{`goods_total: ${resPayData.goods_total}`}</li>
            <li>{`custom_fee: ${resPayData.custom_fee}`}</li>
          </ul>
        </div>
        {
          resItmData.map(element => (
            <div className='data__info'>
              <ul className='data_list'>
                <p className='data__title'>Item:</p>
                <li>{`chrt_id: ${element.chrt_id}`}</li>
                <li>{`price: ${element.price}`}</li>
                <li>{`rid: ${element.rid}`}</li>
                <li>{`name: ${element.name}`}</li>
                <li>{`sale: ${element.sale}`}</li>
                <li>{`size: ${element.size}`}</li>
                <li>{`total_price: ${element.total_price}`}</li>
                <li>{`nm_id: ${element.nm_id}`}</li>
                <li>{`brand: ${element.brand}`}</li>
                <li>{`status: ${element.status}`}</li>
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
