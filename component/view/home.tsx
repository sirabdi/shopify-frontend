'use client';

import Link from 'next/link';
import { Stack, Typography, Link as Url } from '@mui/material';

const Homepage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" className="uppercase">
        Yes Saving
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis molestias, sint
        libero perspiciatis eligendi laboriosam sequi ea corrupti aut. Sapiente doloremque eum
        magni! Expedita corporis beatae qui recusandae. Exercitationem!
      </Typography>
      <Url component={Link} href="/auth/login">
        Profile Page
      </Url>
    </Stack>
  );
};

export default Homepage;
