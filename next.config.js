/** @type {import('next').NextConfig} */
require('dotenv').config();

module.exports =
{
    output: 'export',
    env: {
        TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
    }
}