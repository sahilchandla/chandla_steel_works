import OrderModel from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
    try {

        // console.log("Create Order API Called");
        // console.log("User :", req.user);
        // console.log("Body :", req.body);

        const {
            customer,
            products,
            totalItems,
            totalAmount,
            paymentMethod
        } = req.body;

        const order = await OrderModel.create({

            userId: req.user._id,

            customer,

            products,

            totalItems,

            totalAmount,

            paymentMethod

        });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

export const getOrders = async (req, res) => {

    try {

        const orders = await OrderModel.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

export const updateOrderStatus = async (req, res) => {

    try {

        const order = await OrderModel.findByIdAndUpdate(

            req.params.id,

            {
                orderStatus: req.body.orderStatus
            },

            {
                new: true
            }

        );

        res.status(200).json({
            success: true,
            message: "Order Status Updated",
            order
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};