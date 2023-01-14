import { remultExpress } from 'remult/remult-express';
import { User } from './shared/user';
import { Todo } from './shared/todo';


export const api = remultExpress({
    entities: [User, Todo]
});