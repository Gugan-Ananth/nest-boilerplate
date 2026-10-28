
import { RefreshToken } from "src/modules/auth/entity/refresh_token.entity";
import { BaseEntity } from "src/shared/utils/base.entity";
import { Column, Entity, Index, OneToOne } from "typeorm";

@Entity({name: 'user'})
export class User extends BaseEntity{
    @Column({type: 'citext', unique: true})
    @Index()
    email: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name', nullable: true})
    lastName: string;

    @Column()
    role: string;

    @Column({nullable: true})
    hash: string;

    @Column({ default: 0 })
    tokenVersion: number;

    @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {nullable: true})
    refreshToken: RefreshToken
}