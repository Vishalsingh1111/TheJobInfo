import VisitorCount from "../Modal/VisitorCount.modal.js";

export async function recordVisitor(req, res) {
    try {
        const date = new Date().toISOString().slice(0, 10);
        try {
            await VisitorCount.findOneAndUpdate(
                { date },
                { $inc: { count: 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true },
            );
        } catch (error) {
            if (error.code !== 11000) throw error;
            await VisitorCount.updateOne({ date }, { $inc: { count: 1 } });
        }
        return res.status(200).json({ recorded: true });
    } catch (error) {
        console.error("Could not record visitor:", error);
        return res.status(500).json({ message: "Could not record visitor" });
    }
}

export async function getDailyVisitors(req, res) {
    try {
        const since = new Date();
        since.setUTCDate(since.getUTCDate() - 29);
        const dailyVisitors = await VisitorCount.find({
            date: { $gte: since.toISOString().slice(0, 10) },
        }).sort({ date: -1 }).select("date count -_id").lean();
        return res.status(200).json({ dailyVisitors });
    } catch (error) {
        console.error("Could not fetch daily visitors:", error);
        return res.status(500).json({ message: "Could not fetch daily visitors" });
    }
}
