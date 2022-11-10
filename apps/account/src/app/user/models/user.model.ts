import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { IUser } from 'libs/interfaces/src';
import { IUser, UserRole } from '@micro-school/interfaces';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
