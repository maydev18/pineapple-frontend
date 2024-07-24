// IconProvider.js
import React from 'react';
import { Icon } from '@iconify/react';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import arrowRightCircle from '@iconify-icons/mdi/arrow-right-circle';

export const ArrowLeftIcon = (props) => (
  <Icon icon={arrowLeftCircle} width="40" height="40" color="black" {...props} />
);

export const ArrowRightIcon = (props) => (
  <Icon icon={arrowRightCircle} width="40" height="40" color="black" {...props} />
);
