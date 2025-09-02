
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { State } from "../../cities/entities/state.entity"; 

@Entity('city')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 7, nullable: false })
    ibge: string;

    @ManyToOne(() => State, {eager: true, nullable: false})
    state: State;
}