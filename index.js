'use strict';
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3085;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})