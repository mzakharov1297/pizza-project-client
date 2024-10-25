import { Resend } from 'resend';
import PayOrder from '@/shared/components/shared/email-templates/pay-order';
import React from 'react';

export const sendEmail = async (template: React.ReactNode) => {
    const  resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const {data, error} = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["zakharovmd1297@gmail.com"],
      subject: "Hello",
      react: template
    })

  if(error) {
    throw error;
  }

  return data
}