const hero = require("../data/hero.js");
const guard = require("../authentication/guard.js");

const { Router } = require("express");
const router = Router();

router.get("/status", function(req, res) {
    res.send(hero.getStatus());
});


router.post("*", function(req, res, next) {
    const info = req.body.info;
    if (!info) {
        return res.status(422).send({ error: "Bad request" });
    }
    next();
})

router.post("/waiting", guard, function(req, res) {
    hero.onWaiting(req.body.info);
    res.send({ success: true });
});

router.post("/starting", guard, function(req, res) {
    hero.onGameStarting(req.body.info);
    res.send({ success: true });
});

router.post("/round", guard, function(req, res) {
    hero.onNewRound(req.body.info);
    res.send({ success: true });
});

router.post("/analysis", guard, function(req, res) {
    hero.onAnalysis(req.body.info);
    res.send({ success: true });
});

router.post("/prediction", guard, function(req, res) {
    hero.onPrediction(req.body.info);
    res.send({ success: true });
});

router.post("/answers", guard, function(req, res) {
    hero.onRoundOver(req.body.info);
    res.send({ success: true });
});

router.post("/ended", guard, function(req, res) {
    hero.onGameFinished(req.body.info);
    res.send({ success: true });
});

router.use("*", function(req, res) {
    res.status(404).send()
});

module.exports = router;
