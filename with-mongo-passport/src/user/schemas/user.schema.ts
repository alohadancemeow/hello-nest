
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

// Added a toJSON transformation 
// to automatically remove the password field from all API responses.
@Schema({
    toJSON: {
        transform: (doc, ret) => {
            delete (ret as any).password;
            return ret;
        },
    },
})

export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    password: string;

    @Prop()
    tel: string;

    @Prop()
    googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    // Mongoose 9.x+: The next() callback has been removed.
    // The middleware automatically proceeds when the function returns
});