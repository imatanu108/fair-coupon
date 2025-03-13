const users = new Map();

const preventAbuse = (req, res, next) => {
    const userIP = req.ip;
    const now = Date.now();
    const lastClaim = users.get(userIP);

    if (lastClaim && now - lastClaim < 3600000) {
        const remainingTime = Math.ceil((3600000 - (now - lastClaim)) / 60000);
        return res.status(400).json({ message: `Try again in ${remainingTime} minutes.` });
    }

    users.set(userIP, now);
    next();
};

export default preventAbuse;
