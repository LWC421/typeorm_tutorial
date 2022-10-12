import { CommonEntity } from '../common/entities/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { TagEntity } from 'src/tags/tags.entity';
import { VisitorEntity } from 'src/visitors/visitors.entity';

//데이터 매퍼 패턴 알아보기
@Entity({
  name: 'BLOG',
})
export class BlogEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  //긴 문자열일 경우 text타입으로 저장
  @Column({ type: 'text', nullable: true })
  contents: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    onDelete: 'CASCADE',
  })
  //ManyToOne의 관계에서 Many에 해당하는 곳에 JoinColum을 사용한다
  @JoinColumn({
    name: 'author_id', //author_id가 many에 저장이 된다
    referencedColumnName: 'id', //join되는 테이블의 column명을 적기
  })
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
    cascade: true,
  })
  //ManyToMany관계에서 관계테이블을 만들어주는 역할을 한다
  @JoinTable({
    name: 'BLOG_TAG',
    joinColumn: {
      //자기 테이블에 대한 정보
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      //상대 테이블에 대한 정보
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
    cascade: true,
  })
  visitors: VisitorEntity[];
}
