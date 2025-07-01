'use client';

import Link from 'next/link';
import { Stack, Typography, Link as Url } from '@mui/material';

const Profile = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" className="uppercase">
        Profile Page
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis molestias, sint
        libero perspiciatis eligendi laboriosam sequi ea corrupti aut. Sapiente doloremque eum
        magni! Expedita corporis beatae qui recusandae. Exercitationem!
      </Typography>
      <Url component={Link} href="/">
        Home Page
      </Url>
    </Stack>
  );
};

export default Profile;
