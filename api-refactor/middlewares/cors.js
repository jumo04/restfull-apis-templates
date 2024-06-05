import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: (origin, callback) =>{
        const ACCEPTED_ORIGINS =
    ['http://localhost:8080', 'http://localhost:1234', 'https://movies.com', 'https://midu.dev' ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
    }else{
     return callback(new Error('Not allowed by CORS'));
     }
    }
})