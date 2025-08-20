import shortid from 'shortid'
import URL from '../models/urlModel.js'

export const handleGenerateNewShortURL = async (req, res) => {
    let url = req.body.url;

    if (!url) {
        return res.status(400).json({ message: 'Redirect URL is required' })
    }
    const shortId = shortid.generate(8)

        if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }


    await URL.create({
        shortId: shortId,
        redirectURL: url,
        visitHistory: []
    })

    res.redirect('/')
    // return res.render('home', { id: shortId })
}

export const handleGetAnalytics = async(req, res) => {
    const shortId = req.params.shortId

    if (!shortId) {
        return res.status(400).json({ message: "Short URL not found" })
    }

    const result = await URL.findOne({ shortId: shortId })

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })

}