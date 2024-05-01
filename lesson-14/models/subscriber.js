// ./models/subscriber.js
"use strict";

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */
const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        phone: Number,
        newSletter: Boolean
    });

// Subscriber 모델 생성 내보내기
module.exports = mongoose.model(
    "Subscriber",
    subscriberSchema
);

