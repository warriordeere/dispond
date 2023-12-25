/** @type {import('next').NextConfig} */
require('dotenv').config();

module.exports =
{
    output: 'export',
    reactStrictMode: false,
    env: {
        TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
    }
}