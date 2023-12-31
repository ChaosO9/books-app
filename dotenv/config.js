import { config } from 'dotenv';

config();

export const SECRET_KEY =
    process.env.SECRET_KEY ||
    'lujWN0GlVRvLrYxd6phPIGfkrMYgqVbCMIYNSIBKwH3Y9ASZ1BeKOsOI+FIvwcFU2pnObNgbfS+js7iovCYCQw==';
