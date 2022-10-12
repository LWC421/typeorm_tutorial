import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from 'src/profiles/profiles.entity';
import { BlogEntity } from 'src/blogs/blogs.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'USER',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  username: string;

  //Exclude를 쓰면 추후 return할 때 제외하고 보낸다
  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  //일대일 관계
  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: ProfileEntity;

  //일대다 관계
  @OneToMany(() => BlogEntity, (blog: BlogEntity) => blog.author, {
    cascade: true,
  })
  blogs: BlogEntity[];
}
