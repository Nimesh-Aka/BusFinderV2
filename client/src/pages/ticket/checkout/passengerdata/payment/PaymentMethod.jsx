import React, { useState } from 'react'
import PaymentCard from '../../../../../components/payment/PaymentCard'

import MasterCardImg from '../../../../../assets/mastercard.png'
import CreditCardImg from '../../../../../assets/creditcard.png'
import { FaPlus } from 'react-icons/fa';

const PaymentMethod = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

  return (
    <div className='w-full space-y-3'>
        <h6 className="text-sm text-neutral-600 font-medium">
            Select Payment Method
        </h6>

        <div className="w-full grid grid-cols-2 gap-10">
            <PaymentCard
                selectedPayment={selectedPaymentMethod}
                value={"mastercard"}
                onChange={handleChange}
                cardholderName={"Ram Bdr. Ghale "}
                cardNumber={"1234"}
                cardImage={MasterCardImg}
            />

            <PaymentCard
                selectedPayment={selectedPaymentMethod}
                value={"creditcard"}                
                onChange={handleChange}
                cardholderName={"Ram Bdr. Ghale"}
                cardNumber={"1234"}
                cardImage={CreditCardImg}
            />
        </div>

        <div className="w-full flex justify-end">
            <div className="w-fit flex flex-item-center justify-center gap-x-2 
            cursor-pointer text-base font-normal text-primary ">
                <FaPlus />
                <p className="capitalize">Add new card</p>
            </div>
        </div>
      
    </div>
  )
}

export default PaymentMethod