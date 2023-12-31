const jwt = require('jsonwebtoken');

try {
    jwt.verify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0MDMwMzAxLCJleHAiOjE3MDQxMTY3MDF9.UpMZIDXHxejhaHTWfJUcvtKJos-yhCDDGUNBsCwR-eo',
        'lujWN0GlVRvLrYxd6phPIGfkrMYgqVbCMIYNSIBKwH3Y9ASZ1BeKOsOI+FIvwcFU2pnObNgbfS+js7iovCYCQw==',
    );
    console.log('success');
} catch (err) {
    console.log(err);
}
