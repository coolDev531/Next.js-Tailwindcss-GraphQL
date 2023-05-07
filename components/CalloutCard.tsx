'use client';
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Callout } from '@tremor/react';

type Props = {
  message: string;
  warning?: boolean;
  className?: string;
};

function CalloutCard({
  message,
  warning,
  className = 'text-black mt-4',
}: Props) {
  return (
    <Callout
      className={className}
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={warning ? 'rose' : 'teal'}
    />
  );
}

export default CalloutCard;
