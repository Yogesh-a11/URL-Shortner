import express from 'express'
import dotenv from 'dotenv'
import { connectToDB } from './db/connectDB.js'
import URL from './models/urlModel.js'
import path from 'path'
import staticRouter from './routes/staticRouter.js'
import urlRoute from './routes/urlRoute.js'
import userRoute from './routes/userRoutes.js'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use('/url', urlRoute)
app.use('/', staticRouter)
app.use('/user', userRoute)

// app.get('/test', async(req, res) => {
//     const allUrls = await URL.find({})

//     return res.render('home', { url: allUrls })
// })

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId  
    const entry = await URL.findOneAndUpdate({
         shortId
    }, { $push: {visitHistory: {timestamp: Date.now()}}}, { new: true })
    // console.log(entry)

     if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL)
})

await connectToDB()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})