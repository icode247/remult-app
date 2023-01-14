import { Entity, Fields,IdEntity } from 'remult';
import { Todo } from './todo';

@Entity('user1', {
    allowApiCrud: true
})
export class User extends IdEntity{

    @Fields.string()
    name = '';

    @Fields.string()
    email = '';

    @Fields.string()
    password = '';

    @Fields.object<Todo>((options, remult) => {
        options.serverExpression = async (user) =>
            remult.repo(Todo).find({ where: { userId: user.id } })
    })
    todo!: Todo[];
}
 