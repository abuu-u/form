import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

export default function Loading({ open }: { open: boolean }) {
  return (
    <Backdrop sx={{ zIndex: 2 }} open={open}>
      <CircularProgress />
    </Backdrop>
  );
}
