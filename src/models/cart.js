import { model, Schema } from "mongoose";

const sessionsSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    position: {
      type: [
        {
          positionId: {
            type: Schema.Types.ObjectId,
            ref,
          },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

export const SessionsCollection = model("sessions", sessionsSchema);
