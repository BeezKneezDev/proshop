import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB