import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'USER_PROFILE',
})
export class ProfileEntity extends CommonEntity {
  @Column({ type: 'varchar' })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  site: string;
}
