'use client';
import { IMaskInput } from 'react-imask';
import React, { FC, useEffect, useState } from 'react';
import { RequiredSymbol } from '@/shared/components/shared/required-symbol';
import { Input } from '@/shared/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '@/shared/components/shared/error-text';
import { ClearButton } from '@/shared/components/shared/clear-button';
import Select from 'react-select';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}


const FormInput: FC<Props> = ({ className, name, label, required, ...props }) => {

  const {
    register,
    formState: { errors },
    watch,
    getValues,
    setValue,
    control,
  } = useFormContext();

  const value = watch(name);
  const errorValue = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };


  return (
    <div className={className}>
      {
        label && (
          <p className={'font-medium mb-2'}>
            {label} {required && <RequiredSymbol />}
          </p>
        )
      }

      <div className={'relative'}>
        {
          name === 'phone' ? (
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <IMaskInput
                    id="phone"
                    className="h-12 text-md w-full outline-none border border-gray-200 rounded-md px-4"
                    mask="+{7} (000) 000-00-00"
                    onChange={field.onChange}
                    unmask={true}
                    placeholder="+7 (___) ___-__-__"
                  />
                )}
              />


            ) :

            <Input className={'h-12 text-md'} {...register(name)} {...props} />

        }

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorValue && <ErrorText text={errorValue} />}
    </div>
  );
};

export default FormInput;