import React, { FC } from 'react';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { Input } from '@/shared/components/ui';
import FormInput from '@/shared/components/shared/form/form-input';

interface Props {
  className?: string;
}

const CheckoutPersonalForm:FC<Props> = ({className}) => {
  return (
    <WhiteBlock className={className} title={'2. Персональные данные'}>
      <div className={'grid grid-cols-2 gap-5'}>
        <FormInput name={'firstName'} className={'text-base'} placeholder={'Имя'} />
        <FormInput name={'lastName'} className={'text-base'} placeholder={'Фамилия'} />
        <FormInput name={'email'} className={'text-base'} placeholder={'E-mail'} />
        <FormInput name={'phone'} className={'text-base'} placeholder={'Телефон'} />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutPersonalForm;