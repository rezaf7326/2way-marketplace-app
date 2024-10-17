import React, { PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@radix-ui/themes';
import ErrorCallout from '@/app/components/error/ErrorCallout';
import { FetchError } from '@/app/lib/fetch';

export interface CustomFormProps {
  buttonLabel?: string;
  onSubmit?: (data: any) => Promise<void> | void;
  wide?: boolean;
  disabled?: boolean;
}

export default function CustomForm({
  children,
  buttonLabel,
  onSubmit,
  wide,
  disabled,
}: PropsWithChildren<CustomFormProps>) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <div
      className={classNames({
        flex: true,
        'justify-center': true,
        'max-w-4xl': !!wide,
        'max-w-xl': !wide,
        'flex-col': true,
        'mx-auto': true,
      })}
    >
      {hasError && <ErrorCallout message={errorMsg} />}
      <form
        className="space-y-6 p-6 rounded shadow-xl"
        onSubmit={async (data: unknown) => {
          setHasError(false);
          setErrorMsg(undefined);
          setSubmitting(true);
          try {
            if (onSubmit) {
              await onSubmit(data);
            }
          } catch (error: unknown) {
            if (error instanceof FetchError) {
              error.status < 500
                ? setErrorMsg(error.message)
                : setErrorMsg(error.statusText || error.message);
            }
            setHasError(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {children}
        <div className="flex justify-center pt-5 pb-2">
          <Button
            size="3"
            disabled={disabled || submitting}
            loading={submitting}
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
