import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user9",
        required: true
    },

    customer: {
        name: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        }
    },

    products: [
        {
            productId: String,
            name: String,
            image: String,
            price: String,
            quantity: Number,
            totalPrice: Number
        }
    ],

    totalItems: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
        default: "Pending"
    }

}, { timestamps: true });

const OrderModel = mongoose.model("orders", orderSchema);

export default OrderModel;