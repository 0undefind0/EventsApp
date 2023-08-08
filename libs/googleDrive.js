import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();


const SCOPES = ['https://www.googleapis.com/auth/drive'];

function getOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    return oauth2Client;
}

function getAuthUrl() {
    const oauth2Client = getOAuth2Client();
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return authUrl;
}

module.exports = { getAuthUrl, getOAuth2Client };
