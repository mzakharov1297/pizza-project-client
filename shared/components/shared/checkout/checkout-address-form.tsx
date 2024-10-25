'use client';

import React, { FC } from 'react';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { FormTextarea } from '@/shared/components/shared/form/form-textarea';
import { AddressInput } from '@/shared/components/shared/address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '@/shared/components/shared/error-text';

interface Props {
  className?: string;
}

const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock className={className} title={'3. Адрес доставки'}>
      <div className={'flex flex-col gap-5'}>
        <Controller
          control={control}
          name={'address'}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />


        <FormTextarea name={'comment'} rows={5} className={'text-base'} placeholder={'Комментарий к заказу'} />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutAddressForm;