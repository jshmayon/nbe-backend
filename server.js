require('dotenv').config();
const express = require('express');
const cors = require( 'cors' );

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => console.log( `Server running on port ${ PORT }` ) );

const sendEmail = require( './mailer' );

app.post( '/api/v1/contact', async ( req, res ) =>
{
    try
    {
        await sendEmail( req.body );
        res.status( 200 ).json( { message: 'Email sent successfully' } );
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email', detail: error.message });
    }
} );