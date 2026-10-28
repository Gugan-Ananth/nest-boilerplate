
import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity } from "src/shared/utils/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity({name: 'refresh_token'})
export class RefreshToken extends BaseEntity {
    @Column()
    @Index()
    tokenHash: string;

    @OneToOne(() => User, (user) => user.refreshToken, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({type: 'timestamptz', name: 'expires_at'})
    expiresAt: Date;
}