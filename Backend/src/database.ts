import { connect } from 'mongoose';

export async function startConnection(){
    connect('mongodb://localhost/photo-gallery-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });
    console.log('Database is connected');
}