import { Allow, Entity, Fields, IdEntity } from 'remult';

@Entity('todos', {
    allowApiCrud: Allow.authenticated
})
export class Todo extends IdEntity {
    @Fields.string()
    userId!: string;

    @Fields.string()
    name = '';

    @Fields.boolean()
    completed = false;
}
 