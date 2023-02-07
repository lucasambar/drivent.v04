import joi from "joi";

const bookingSchema = joi.object({
  roomId: joi.number().required()
});

export default bookingSchema;
